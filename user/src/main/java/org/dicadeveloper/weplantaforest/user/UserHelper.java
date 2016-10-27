package org.dicadeveloper.weplantaforest.user;

import java.util.UUID;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.common.support.Language;
import org.dicadeveloper.weplantaforest.encryption.PasswordEncrypter;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserHelper {

    protected final Log LOG = LogFactory.getLog(UserHelper.class.getName());

    @Autowired
    private PasswordEncrypter _passWordEncrypter;

    @Autowired
    private UserRepository _userRepository;

    private final static String ANONYMOUS = "Anonymous";

    public User convertUserRegDataToUser(UserRegistrationData userRegistrationData) {
        Long currentTime = System.currentTimeMillis();
        User user = new User();
        user.setName(userRegistrationData.getUsername());
        user.setNewsletter(userRegistrationData.isNewsLetter());
        user.setPassword(_passWordEncrypter.encryptPassword(userRegistrationData.getPassword()));
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

    public String createUserRegistrationMailText(User user, String ipatHost, String mailText) {
        String activationLink = "/userActivation" + "?id=" + user.getId() + "&key=" + user.getActivationKey();
        mailText = mailText.replace("%activationLink%", activationLink);
        mailText = mailText.replace("%userName%", user.getName());
        mailText = mailText.replace("%ipatHost%", ipatHost);

        return mailText;
    }

    public String createForgotPasswordMail(User user, String ipatHost, String mailText) {
        String resetLink = "/password_reset" + "?id=" + user.getId() + "&key=" + user.getActivationKey();
        mailText = mailText.replace("%resetLink%", resetLink);
        mailText = mailText.replace("%userName%", user.getName());
        mailText = mailText.replace("%ipatHost%", ipatHost);
        return mailText;
    }

    public User createAnonymous() {
        User user = null;
        final long currentTimeMillis = System.currentTimeMillis();
        final String randomString = UUID.randomUUID().toString();
        final long anonymousCount = _userRepository.countAnonymUser();

        String userName = ANONYMOUS + (anonymousCount + 1);

        user = new User();
        user.setName(userName);
        user.setEnabled(false);
        user.setBanned(false);
        user.setRegDate(currentTimeMillis);
        user.setLastVisit(currentTimeMillis);
        user.setOrganizationType(OrganizationType.PRIVATE);
        user.addRole(Role.USER);
        user.setActivationKey(randomString);

        boolean userSaved = false;
        int tryCount = 1;
        while (!userSaved && tryCount <= 100) {
            if (_userRepository.findByName(userName) == null) {
                _userRepository.save(user);
                userSaved = true;
                return user;
            } else {
                // if such a user already exists, try again with the same name
                // added by one(100tries)
                userName = ANONYMOUS + (anonymousCount + 1 + tryCount);
                user.setName(userName);
                tryCount++;
            }            
        }
        LOG.error("unable to save anonymous user after 100 tries.");
        return null;
    }
}
