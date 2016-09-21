package org.dicadeveloper.weplantaforest.user;

import org.dicadeveloper.weplantaforest.encryption.PasswordEncrypter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserRegstrationHelper {

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
        // user.setLang(LanguageUtil.getCurrentLanguage());
        user.setEnabled(false);
        user.setBanned(false);
        user.setRegDate(currentTime);
        user.setLastVisit(currentTime);
        user.addRole(Role.USER);

        user.setActivationKey(randomString(12, 18));
        return user;
    }
    
    public String createMailText(User user, String ipatHost){
        String activationLink = "/user/activation" + "?id=" + user.getId() + "&key=" + user.getActivationKey();
        String mailText = "Hallo %userName%,\n\nUm Deine Anmeldung fertigzustellen und I Plant A Tree zu nutzen, musst du untenstehenden Link klicken:\n%ipatHost%%activationLink%\n\nDein I Plant A Tree Team";
        mailText = mailText.replace("%activationLink%", activationLink);
        mailText = mailText.replace("%userName%", user.getName());
        mailText = mailText.replace("%ipatHost%", ipatHost);
        
        return mailText;
    }

    private final static String randomString(final int lo, final int hi) {
        final int length = random(lo, hi);
        final char[] cs = new char[length];
        for (int i = 0; i < cs.length; i++) {
            cs[i] = randomChar();
        }
        return String.valueOf(cs);
    }

    private final static char randomChar() {
        return (char) random('a', 'z');
    }

    private final static int random(final int lo, final int hi) {
        return lo + random(hi - lo);
    }

    private final static int random(final int i) {
        return (int) (Math.random() * i);
    }
}
