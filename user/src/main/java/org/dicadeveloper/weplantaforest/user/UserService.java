package org.dicadeveloper.weplantaforest.user;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.FileSystemInjector;
import org.dicadeveloper.weplantaforest.common.errorHandling.ErrorCodes;
import org.dicadeveloper.weplantaforest.common.errorHandling.IpatException;
import org.dicadeveloper.weplantaforest.common.errorHandling.IpatPreconditions;
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

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class UserService {

    protected final Log LOG = LogFactory.getLog(UserService.class.getName());

    private @NonNull PasswordEncrypter _passwordEncrypter;

    private @NonNull UserRepository _userRepository;

    private @NonNull Co2Repository _co2Repository;

    private @NonNull RankingRepository _rankingRepository;

    private @NonNull ImageHelper _imageHelper;

    private @NonNull MailHelper _mailHelper;

    private @NonNull MessageByLocaleService _messageByLocaleService;

    private @NonNull Environment _env;

    private final static String ANONYMOUS = "Anonymous";

    private User convertUserRegDataToUser(UserRegistrationData userRegistrationData) {
        Long currentTime = System.currentTimeMillis();
        User user = new User();
        user.setName(userRegistrationData.getUsername());
        user.setNewsletter(userRegistrationData.isNewsLetter());
        user.setPassword(_passwordEncrypter.encryptPassword(userRegistrationData.getPassword()));
        user.setMail(userRegistrationData.getMail());
        user.setOrganizationType(OrganizationType.valueOf(userRegistrationData.getOrgType()));
        user.setLang(Language.valueOf(userRegistrationData.getLanguage()));
        user.setEnabled(false);
        user.setBanned(false);
        user.setRegDate(currentTime);
        user.setLastVisit(currentTime);
        user.addRole(Role.USER);

        user.setActivationKey(UUID.randomUUID()
                                  .toString());
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
        mailText = mailText.replace("%resetLink%", resetLink);
        mailText = mailText.replace("%userName%", user.getName());
        mailText = mailText.replace("%ipatHost%", ipatHost);
        return mailText;
    }

    public User createAnonymous() throws IpatException {
        User user = null;
        final long currentTimeMillis = System.currentTimeMillis();
        final String randomString = UUID.randomUUID()
                                        .toString();

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
        _userRepository.save(user);
        return user;
    }
    
    private String createAnonymousUserName() throws IpatException{
        long anonymousCount = _userRepository.countAnonymUser();
        String userName = ANONYMOUS + (anonymousCount + 1);
        
        boolean userSaved = false;
        int tryCount = 1;
        while (!userSaved && tryCount <= 100) {
            if (_userRepository.userExists(userName) == 0) {
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
        UserReportData userReportData = _userRepository.getUserDetails(userName);
        
        userReportData.setCo2Data(_co2Repository.getAllTreesAndCo2SavingForUserName(System.currentTimeMillis(), userName));
        userReportData.setRank(calcUserRank(userReportData.getUserName(), userReportData.getCo2Data()
                                                                                        .getTreesCount()));
        userReportData.setEditAllowed(isEditAllowed);
        return userReportData;
    }

    public void editUser(String userName, String toEdit, String newEntry) throws IpatException {
        User user = getUser(userName);
        switch (toEdit) {
        case "NAME":
            IpatPreconditions.checkArgument((_userRepository.userExists(newEntry) == 0), ErrorCodes.USER_ALREADY_EXISTS);
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
            IpatPreconditions.checkArgument((_userRepository.userWithMailExists(newEntry) == 0), ErrorCodes.MAIL_ALREADY_EXISTS);
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
            user.setPassword(_passwordEncrypter.encryptPassword(newEntry));
            break;
        default:
            break;
        }
        _userRepository.save(user);
    }

    public String uploadUserImage(String userName, MultipartFile file) throws IpatException {
        IpatPreconditions.checkArgument(!file.isEmpty(), ErrorCodes.EMPTY_FILE);
        User user = getUser(userName);

        String imageFolder = FileSystemInjector.getUserFolder();
        String imageName = user.getName() + file.getOriginalFilename()
                                                .substring(file.getOriginalFilename()
                                                               .indexOf("."));

        try {
            _imageHelper.storeImage(file, imageFolder, imageName, true);
            user.setImageName(imageName);
            _userRepository.save(user);
            return imageName;
        } catch (IOException e) {
            throw new IpatException(ErrorCodes.SERVER_ERROR);
        }

    }

    public void registrateUser(UserRegistrationData userRegistrationData) throws IpatException {
        String userName = userRegistrationData.getUsername();
        String mail = userRegistrationData.getMail();
        IpatPreconditions.checkArgument((_userRepository.userExists(userName) == 0), ErrorCodes.USER_ALREADY_EXISTS);
        IpatPreconditions.checkArgument(CommonValidator.isValidEmailAddress(mail), ErrorCodes.INVALID_MAIL);
        IpatPreconditions.checkArgument((_userRepository.userWithMailExists(mail) == 0), ErrorCodes.MAIL_ALREADY_EXISTS);
        User user = convertUserRegDataToUser(userRegistrationData);
        _userRepository.save(user);

        String mailSubject = _messageByLocaleService.getMessage("mail.registration.subject", user.getLang()
                                                                                                 .getLocale());

        String mailTemplateText = _messageByLocaleService.getMessage("mail.registration.text", user.getLang()
                                                                                                   .getLocale());
        String mailText = createUserRegistrationMailText(user, _env.getProperty("ipat.host"), mailTemplateText);

        new Thread(new Runnable() {
            public void run() {
                _mailHelper.sendAMessage(mailSubject, mailText, user.getMail());
            }
        }).start();
    }

    public void activateUser(long userId, String key) throws IpatException {
        User user = getUser(userId);
        IpatPreconditions.checkArgument(!user.isEnabled(), ErrorCodes.USER_ALREADY_ACTIVATED);
        IpatPreconditions.checkArgument(key.equals(user.getActivationKey()), ErrorCodes.INVALID_ACTIVATION_KEY);
        user.setEnabled(true);
        _userRepository.save(user);
    }

    public void createPasswordResetMail(String userName) throws IpatException {
        User user = getUser(userName);
        IpatPreconditions.checkArgument(user.isEnabled(), ErrorCodes.USER_NOT_ACTIVATED);

        user.setActivationKey(UUID.randomUUID()
                                  .toString());
        _userRepository.save(user);

        String mailSubject = _messageByLocaleService.getMessage("mail.forgot.password.subject", user.getLang()
                                                                                                    .getLocale());

        String mailTemplateText = _messageByLocaleService.getMessage("mail.forgot.password.text", user.getLang()
                                                                                                      .getLocale());
        String mailText = createForgotPasswordMail(user, _env.getProperty("ipat.host"), mailTemplateText);

        new Thread(new Runnable() {
            public void run() {
                _mailHelper.sendAMessage(mailSubject, mailText, user.getMail());
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
        user.setPassword(_passwordEncrypter.encryptPassword(password));
        _userRepository.save(user);
        return user.getName();
    }
    
    private User getUser(long userId) throws IpatException{
        User user = _userRepository.findOne(userId);
        IpatPreconditions.checkNotNull(user, ErrorCodes.USER_NOT_FOUND);
        return user;
    }
    
    private User getUser(String userName) throws IpatException{
        User user = _userRepository.findByName(userName);
        IpatPreconditions.checkNotNull(user, ErrorCodes.USER_NOT_FOUND);
        return user;
    }

    private long calcUserRank(String userName, long treeCountOfUser) {
        List<TreeRankedUserData> userList = _rankingRepository.getBestUserList(System.currentTimeMillis());
        long rank = 1;
        for (TreeRankedUserData user : userList) {
            if (treeCountOfUser < user.getAmount()) {
                rank++;
            }
            if (user.getName()
                    .equals(userName)) {
                break;
            }
        }
        return rank;
    }
    
    public User anonymizeUser(String userName) throws IpatException {
        User user = _userRepository.findByName(userName);
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
        _userRepository.save(user);        
        
        return user;
    }
}
