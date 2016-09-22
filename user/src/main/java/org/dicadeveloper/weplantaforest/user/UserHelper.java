package org.dicadeveloper.weplantaforest.user;

import java.util.UUID;

import org.dicadeveloper.weplantaforest.common.support.Language;
import org.dicadeveloper.weplantaforest.encryption.PasswordEncrypter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserHelper {

    @Autowired
    private PasswordEncrypter _passWordEncrypter;
    
    

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
    
    public String createUserRegistrationMailText(User user, String ipatHost, String mailText){
        String activationLink = "/userActivation" + "?id=" + user.getId() + "&key=" + user.getActivationKey();
        mailText = mailText.replace("%activationLink%", activationLink);
        mailText = mailText.replace("%userName%", user.getName());
        mailText = mailText.replace("%ipatHost%", ipatHost);
        
        return mailText;
    }
    
    public String createForgotPasswordMail(User user, String ipatHost, String mailText){
        String resetLink = "/password_reset" + "?id=" + user.getId() + "&key=" + user.getActivationKey();
        mailText = mailText.replace("%resetLink%", resetLink);
        mailText = mailText.replace("%userName%", user.getName());
        mailText = mailText.replace("%ipatHost%", ipatHost);
        return mailText;
    }
}
