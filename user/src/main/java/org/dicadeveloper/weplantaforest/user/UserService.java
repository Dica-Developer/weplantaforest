package org.dicadeveloper.weplantaforest.user;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.dicadeveloper.weplantaforest.FileSystemInjector;
import org.dicadeveloper.weplantaforest.common.errorhandling.ErrorCodes;
import org.dicadeveloper.weplantaforest.common.errorhandling.IpatException;
import org.dicadeveloper.weplantaforest.common.errorhandling.IpatPreconditions;
import org.dicadeveloper.weplantaforest.common.image.ImageHelper;
import org.dicadeveloper.weplantaforest.common.mail.MailHelper;
import org.dicadeveloper.weplantaforest.common.support.Language;
import org.dicadeveloper.weplantaforest.common.user.Role;
import org.dicadeveloper.weplantaforest.encryption.PasswordEncrypter;
import org.dicadeveloper.weplantaforest.messages.MessageByLocaleService;
import org.dicadeveloper.weplantaforest.reports.co2.Co2Repository;
import org.dicadeveloper.weplantaforest.reports.rankings.RankingRepository;
import org.dicadeveloper.weplantaforest.reports.rankings.TreeRankedUserData;
import org.dicadeveloper.weplantaforest.support.CommonValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Service
@Slf4j
public class UserService {

    private @NonNull PasswordEncrypter passwordEncrypter;

    private @NonNull UserRepository userRepository;

    private @NonNull Co2Repository co2Repository;

    private @NonNull RankingRepository rankingRepository;

    private @NonNull ImageHelper imageHelper;

    private @NonNull MailHelper mailHelper;

    private @NonNull MessageByLocaleService messageByLocaleService;

    private @NonNull Environment env;

    private static final String ANONYMOUS = "Anonymous";

    private User convertUserRegDataToUser(UserRegistrationData userRegistrationData) {
        Long currentTime = System.currentTimeMillis();
        User user = new User();
        user.setName(userRegistrationData.getUsername());
        user.setNewsletter(userRegistrationData.isNewsLetter());
        user.setPassword(passwordEncrypter.encryptPassword(userRegistrationData.getPassword()));
        user.setMail(userRegistrationData.getMail());
        user.setOrganizationType(OrganizationType.valueOf(userRegistrationData.getOrgType()));
        user.setLang(Language.valueOf(userRegistrationData.getLanguage()));
        user.setEnabled(false);
        user.setBanned(false);
        user.setRegDate(currentTime);
        user.setLastVisit(currentTime);
        user.addRole(Role.USER);

        user.setActivationKey(UUID.randomUUID().toString());
        return user;
    }

    private String createUserRegistrationMailText(User user, String ipatHost, String mailText) {
        String activationLink = "/userActivation" + "?id=" + user.getId() + "&key=" + user.getActivationKey();
        mailText = mailText.replace("%activationLink%", activationLink);
        mailText = mailText.replace("%userName%", user.getName());
        mailText = mailText.replace("%ipatHost%", ipatHost);

        return mailText;
    }

    private String createForgotPasswordMail(User user, String ipatHost, String mailText) {
        String resetLink = "/password_reset" + "?id=" + user.getId() + "&key=" + user.getActivationKey();
        System.out.println("resetlink: " + resetLink);
        mailText = mailText.replace("%resetLink%", resetLink);
        mailText = mailText.replace("%userName%", user.getName());
        mailText = mailText.replace("%ipatHost%", ipatHost);
        return mailText;
    }

    public User createAnonymous() throws IpatException {
        User user = null;
        final long currentTimeMillis = System.currentTimeMillis();
        final String randomString = UUID.randomUUID().toString();

        String userName = createAnonymousUserName();

        user = new User();
        user.setName(userName);
        user.setEnabled(false);
        user.setBanned(false);
        user.setRegDate(currentTimeMillis);
        user.setLastVisit(currentTimeMillis);
        user.setOrganizationType(OrganizationType.PRIVATE);
        user.addRole(Role.USER);
        user.setActivationKey(randomString);
        user.setLang(Language.DEUTSCH);
        userRepository.save(user);
        return user;
    }

    private String createAnonymousUserName() throws IpatException {
        long anonymousCount = userRepository.countAnonymUser();
        String userName = ANONYMOUS + (anonymousCount + 1);

        boolean userSaved = false;
        int tryCount = 1;
        while (!userSaved && tryCount <= 100) {
            if (userRepository.userExists(userName) == 0) {
                return userName;
            } else {
                // if such a user already exists, try again with the same name
                // added by one(100tries)
                userName = ANONYMOUS + (anonymousCount + 1 + tryCount);
                tryCount++;
            }
        }
        LOG.error("unable to save anonymous user after 100 tries.");
        throw new IpatException(ErrorCodes.NO_ANONYMOUS_CREATED);
    }

    public UserReportData getUserDetails(String userName, boolean isEditAllowed) {
        UserReportData userReportData = userRepository.getUserDetails(userName);
        if (null != userReportData) {
            userReportData.setCo2Data(co2Repository.getAllTreesAndCo2SavingForUserName(System.currentTimeMillis(), userReportData.getUserName()));
            userReportData.setRank(calcUserRank(userReportData.getUserName(), userReportData.getCo2Data().getTreesCount()));
            userReportData.setEditAllowed(isEditAllowed);
        }

        return userReportData;
    }

    public void editUser(String userName, String toEdit, String newEntry) throws IpatException {
        User user = getUser(userName);
        switch (toEdit) {
            case "NAME":
                IpatPreconditions.checkArgument((userRepository.userExists(newEntry) == 0), ErrorCodes.USER_ALREADY_EXISTS);
                user.setName(newEntry);
                break;
            case "ABOUTME":
                user.setAboutMe(newEntry);
                break;
            case "LOCATION":
                user.setLocation(newEntry);
                break;
            case "ORGANISATION":
                user.setOrganisation(newEntry);
                break;
            case "HOMEPAGE":
                user.setHomepage(newEntry);
                break;
            case "MAIL":
                IpatPreconditions.checkArgument(CommonValidator.isValidEmailAddress(newEntry), ErrorCodes.INVALID_MAIL);
                IpatPreconditions.checkArgument((userRepository.userWithMailExists(newEntry) == 0), ErrorCodes.MAIL_ALREADY_EXISTS);
                user.setMail(newEntry);
                break;
            case "NEWSLETTER":
                user.setNewsletter(newEntry.equals("JA") ? true : false);
                break;
            case "ORGANIZATION_TYPE":
                user.setOrganizationType(OrganizationType.valueOf(newEntry));
                break;
            case "LANGUAGE":
                user.setLang(Language.valueOf(newEntry));
                break;
            case "PASSWORD":
                user.setPassword(passwordEncrypter.encryptPassword(newEntry));
                break;
            default:
                break;
        }
        userRepository.save(user);
    }

    public String uploadUserImage(String userName, MultipartFile file) throws IpatException {
        IpatPreconditions.checkArgument("image/png".equalsIgnoreCase(file.getContentType()) || "image/jpeg".equalsIgnoreCase(file.getContentType()), ErrorCodes.WRONG_IMAGE_TYPE);
        IpatPreconditions.checkArgument(!file.isEmpty(), ErrorCodes.EMPTY_FILE);
        User user = getUser(userName);

        String imageFolder = FileSystemInjector.getUserFolder();
        String imageName = user.getName() + file.getOriginalFilename().substring(file.getOriginalFilename().indexOf("."));

        try {
            imageHelper.storeImage(file, imageFolder, imageName, true);
            user.setImageName(imageName);
            userRepository.save(user);
            return imageName;
        } catch (IOException e) {
            throw new IpatException(ErrorCodes.SERVER_ERROR);
        }

    }

    public void registrateUser(UserRegistrationData userRegistrationData) throws IpatException {
        String userName = userRegistrationData.getUsername();
        String mail = userRegistrationData.getMail();
        IpatPreconditions.checkArgument((userRepository.userExists(userName) == 0), ErrorCodes.USER_ALREADY_EXISTS);
        IpatPreconditions.checkArgument(CommonValidator.isValidEmailAddress(mail), ErrorCodes.INVALID_MAIL);
        IpatPreconditions.checkArgument((userRepository.userWithMailExists(mail) == 0), ErrorCodes.MAIL_ALREADY_EXISTS);
        User user = convertUserRegDataToUser(userRegistrationData);
        userRepository.save(user);

        String mailSubject = messageByLocaleService.getMessage("mail.registration.subject", user.getLang().getLocale());

        String mailTemplateText = messageByLocaleService.getMessage("mail.registration.text", user.getLang().getLocale());
        String mailText = createUserRegistrationMailText(user, env.getProperty("ipat.host"), mailTemplateText);

        new Thread(new Runnable() {
            @Override
            public void run() {
                mailHelper.sendAMessage(mailSubject, mailText, user.getMail());
            }
        }).start();
    }

    public void activateUser(long userId, String key) throws IpatException {
        User user = getUser(userId);
        IpatPreconditions.checkArgument(!user.isEnabled(), ErrorCodes.USER_ALREADY_ACTIVATED);
        IpatPreconditions.checkArgument(key.equals(user.getActivationKey()), ErrorCodes.INVALID_ACTIVATION_KEY);
        user.setEnabled(true);
        userRepository.save(user);
    }

    public void createPasswordResetMail(String userName) throws IpatException {
        User user = getUser(userName);
        IpatPreconditions.checkArgument(user.isEnabled(), ErrorCodes.USER_NOT_ACTIVATED);

        user.setActivationKey(UUID.randomUUID().toString());
        userRepository.save(user);

        String mailSubject = messageByLocaleService.getMessage("mail.forgot.password.subject", user.getLang().getLocale());

        String mailTemplateText = messageByLocaleService.getMessage("mail.forgot.password.text", user.getLang().getLocale());
        String mailText = createForgotPasswordMail(user, env.getProperty("ipat.host"), mailTemplateText);

        new Thread(new Runnable() {
            @Override
            public void run() {
                mailHelper.sendAMessage(mailSubject, mailText, user.getMail());
            }
        }).start();
    }

    public String verifiyPasswordResetLink(long userId, String key) throws IpatException {
        User user = getUser(userId);
        IpatPreconditions.checkArgument(key.equals(user.getActivationKey()), ErrorCodes.INVALID_ACTIVATION_KEY);
        return user.getName();
    }

    public String resetPasswordForUser(long userId, String key, String password) throws IpatException {
        User user = getUser(userId);
        IpatPreconditions.checkArgument(key.equals(user.getActivationKey()), ErrorCodes.INVALID_ACTIVATION_KEY);
        user.setPassword(passwordEncrypter.encryptPassword(password));
        userRepository.save(user);
        return user.getName();
    }

    private User getUser(long userId) throws IpatException {
        User user = userRepository.findById(userId).orElse(null);
        IpatPreconditions.checkNotNull(user, ErrorCodes.USER_NOT_FOUND);
        return user;
    }

    private User getUser(String userNameOrEmail) throws IpatException {
        User user = null;
        user = userRepository.findByEmail(userNameOrEmail);
        if (null == user) {
            user = userRepository.findByName(userNameOrEmail);
        }
        IpatPreconditions.checkNotNull(user, ErrorCodes.USER_NOT_FOUND);
        return user;
    }

    private long calcUserRank(String userName, long treeCountOfUser) {
        List<TreeRankedUserData> userList = rankingRepository.getBestUserList(System.currentTimeMillis());
        long rank = 1;
        for (TreeRankedUserData user : userList) {
            if (treeCountOfUser < user.getAmount()) {
                rank++;
            }
            if (user.getName().equals(userName)) {
                break;
            }
        }
        return rank;
    }

    public User anonymizeUser(String userName) throws IpatException {
        User user = userRepository.findByName(userName);
        user.setName(createAnonymousUserName());
        user.setAboutMe("");
        user.setEnabled(false);
        user.setHomepage("");
        user.setImageName("");
        user.setLocation("");
        user.setMail("");
        user.setNewsletter(false);
        user.setOrganisation("");
        user.setOrganizationType(OrganizationType.PRIVATE);
        user.setTeam(null);
        Set<Role> roles = new HashSet<Role>();
        roles.add(Role.USER);
        user.setRoles(roles);
        userRepository.save(user);

        return user;
    }
}
