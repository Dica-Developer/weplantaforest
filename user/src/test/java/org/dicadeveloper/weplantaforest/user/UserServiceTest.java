package org.dicadeveloper.weplantaforest.user;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.fail;
import static org.junit.Assert.assertThat;
import static org.hamcrest.CoreMatchers.containsString;

import org.dicadeveloper.weplantaforest.common.errorHandling.ErrorCodes;
import org.dicadeveloper.weplantaforest.common.errorHandling.IpatException;
import org.dicadeveloper.weplantaforest.common.support.Language;
import org.dicadeveloper.weplantaforest.encryption.PasswordEncrypter;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest({ "spring.profiles.active=test" })
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
@DirtiesContext(classMode = ClassMode.AFTER_CLASS)
public class UserServiceTest {

    @Autowired
    private UserRepository _userRepository;

    @Autowired
    UserService _userService;
    
    @Autowired
    private PasswordEncrypter _passwordEncrypter;

    @Autowired
    private DbInjecter _dbInjecter;
    
    private static String userName = "User";

    @Test
    public void testARegistrateUserUserNameAlreadyExists() {
        _dbInjecter.injectUser("Adam", "adam@iplantatree.de");

        UserRegistrationData userRegistrationData = new UserRegistrationData();
        userRegistrationData.setUsername("Adam");

        try {
            _userService.registrateUser(userRegistrationData);
        } catch (IpatException e) {
            assertEquals(ErrorCodes.USER_ALREADY_EXISTS, e.getErrorInfos()
                                                          .get(0)
                                                          .getErrorCode());
        }
        assertEquals(1, _userRepository.count());
    }

    @Test
    public void testBARegistrateUserInvalidMail() {
        UserRegistrationData userRegistrationData = new UserRegistrationData();
        userRegistrationData.setUsername(userName);
        userRegistrationData.setMail("invalid-mail");
        ;

        try {
            _userService.registrateUser(userRegistrationData);
        } catch (IpatException e) {
            assertEquals(ErrorCodes.INVALID_MAIL, e.getErrorInfos()
                                                   .get(0)
                                                   .getErrorCode());
        }
        assertEquals(1, _userRepository.count());
    }

    @Test
    public void testCARegistrateUserMailAlreadyExists() {
        UserRegistrationData userRegistrationData = new UserRegistrationData();
        userRegistrationData.setUsername(userName);
        userRegistrationData.setMail("adam@iplantatree.de");
        ;

        try {
            _userService.registrateUser(userRegistrationData);
        } catch (IpatException e) {
            assertEquals(ErrorCodes.MAIL_ALREADY_EXISTS, e.getErrorInfos()
                                                          .get(0)
                                                          .getErrorCode());
        }
        assertEquals(1, _userRepository.count());
    }

    @Test
    public void testDARegistrateUserSuccess() {
        UserRegistrationData userRegistrationData = new UserRegistrationData();
        userRegistrationData.setUsername(userName);
        userRegistrationData.setMail("user@iplantatree.de");
        userRegistrationData.setOrgType(OrganizationType.PRIVATE.toString());
        userRegistrationData.setLanguage(Language.DEUTSCH.toString());
        try {
            _userService.registrateUser(userRegistrationData);
        } catch (IpatException e) {
            String errorCode = e.getErrorInfos()
                                .get(0)
                                .getErrorCode();
            fail("user registration should not fail here\nerrorCode:" + errorCode);
        }
        assertEquals(2, _userRepository.count());
        User registratedUser = _userRepository.findByName(userName);
        assertEquals(false, registratedUser.isEnabled());
    }

    @Test
    public void testEactivateUserInvalidKey() {
        User registratedUser = _userRepository.findByName(userName);
        String activationKey = "invalid_key";
        try {
            _userService.activateUser(2L, activationKey);
        } catch (IpatException e) {
            assertEquals(ErrorCodes.INVALID_ACTIVATION_KEY, e.getErrorInfos()
                                                             .get(0)
                                                             .getErrorCode());
        }
        registratedUser = _userRepository.findByName(userName);
        assertEquals(false, registratedUser.isEnabled());
    }

    @Test
    public void testFcreatePasswordResetMailUserNotActivated() {
        try {
            _userService.createPasswordResetMail(userName);
        } catch (IpatException e) {
            assertEquals(ErrorCodes.USER_NOT_ACTIVATED, e.getErrorInfos()
                                                         .get(0)
                                                         .getErrorCode());
        }
    }

    @Test
    public void testGactivateUserSuccess() {
        User registratedUser = _userRepository.findByName(userName);
        String activationKey = registratedUser.getActivationKey();
        try {
            _userService.activateUser(2L, activationKey);
        } catch (IpatException e) {
            String errorCode = e.getErrorInfos()
                                .get(0)
                                .getErrorCode();
            fail("user registration should not fail here\nerrorCode:" + errorCode);
        }
        registratedUser = _userRepository.findByName(userName);
        assertEquals(true, registratedUser.isEnabled());
    }

    @Test
    public void testHactivateUserAlreadyActivated() {
        User registratedUser = _userRepository.findByName(userName);
        String activationKey = registratedUser.getActivationKey();
        try {
            _userService.activateUser(2L, activationKey);
        } catch (IpatException e) {
            assertEquals(ErrorCodes.USER_ALREADY_ACTIVATED, e.getErrorInfos()
                                                             .get(0)
                                                             .getErrorCode());
        }
        registratedUser = _userRepository.findByName(userName);
        assertEquals(true, registratedUser.isEnabled());
    }

    @Test
    public void testIcreatePasswordResetMailSuccess() {
        try {
            _userService.createPasswordResetMail(userName);
        } catch (IpatException e) {
            String errorCode = e.getErrorInfos()
                                .get(0)
                                .getErrorCode();
            fail("creating password reset mail should not fail here\nerrorCode:" + errorCode);
        }
    }

    @Test
    public void testJverifyPasswordResetLinkInvalidKey() {
        String activationKey = "invalidKey";
        try {
            _userService.verifiyPasswordResetLink(2L, activationKey);
        } catch (IpatException e) {
            assertEquals(ErrorCodes.INVALID_ACTIVATION_KEY, e.getErrorInfos()
                                                             .get(0)
                                                             .getErrorCode());
        }
    }

    @Test
    public void testKverifyPasswordResetLinkSuccess() {
        User registratedUser = _userRepository.findByName(userName);
        String activationKey = registratedUser.getActivationKey();
        try {
            _userService.verifiyPasswordResetLink(2L, activationKey);
        } catch (IpatException e) {
            String errorCode = e.getErrorInfos()
                                .get(0)
                                .getErrorCode();
            fail("verify password reset link should not fail here\nerrorCode:" + errorCode);
        }
    }

    @Test
    public void testLresetPasswordForUserInvalidKey() {
        String activationKey = "invalidKey";
        try {
            _userService.resetPasswordForUser(2L, activationKey, "newPassword");
        } catch (IpatException e) {
            assertEquals(ErrorCodes.INVALID_ACTIVATION_KEY, e.getErrorInfos()
                                                             .get(0)
                                                             .getErrorCode());
        }
    }

    @Test
    public void testMresetPasswordForUserSuccess() {
        User registratedUser = _userRepository.findByName(userName);
        String activationKey = registratedUser.getActivationKey();
        try {
            _userService.resetPasswordForUser(2L, activationKey, "newPassword");
        } catch (IpatException e) {
            String errorCode = e.getErrorInfos()
                                .get(0)
                                .getErrorCode();
            fail("reset password should not fail here\nerrorCode:" + errorCode);
        }

        registratedUser = _userRepository.findByName(userName);
        assertNotNull(registratedUser.getPassword());
    }

    @Test
    public void testNcreateAnonymousUser() {
        User user = null;
        try {
            user = _userService.createAnonymous();
        } catch (IpatException e) {
            String errorCode = e.getErrorInfos()
                                .get(0)
                                .getErrorCode();
            fail("creating anonymous should not fail here\nerrorCode:" + errorCode);
        }
        assertNotNull(user);
    }

    @Test
    public void testOAtestEditUserEditNameAlreadyExists() {
        try {
            _userService.editUser(userName, "NAME", "Adam");
        } catch (IpatException e) {
            assertEquals(ErrorCodes.USER_ALREADY_EXISTS, e.getErrorInfos()
                                                          .get(0)
                                                          .getErrorCode());
        }
    }

    @Test
    public void testOBtestEditUserEditNameSuccess() {
        try {
            _userService.editUser(userName, "NAME", "Edited_User");
        } catch (IpatException e) {
            String errorCode = e.getErrorInfos()
                                .get(0)
                                .getErrorCode();
            fail("edit username should not fail here\nerrorCode:" + errorCode);
        }
        userName = "Edited_User";
    }

    @Test
    public void testOCeditUserEditAboutMe() {
        try {
            _userService.editUser(userName, "ABOUTME", "aboutme");
        } catch (IpatException e) {
            String errorCode = e.getErrorInfos()
                                .get(0)
                                .getErrorCode();
            fail("edit aboutme should not fail here\nerrorCode:" + errorCode);
        }
        User editedUser = _userRepository.findById(2L).orElse(null);
        assertNotNull(editedUser);
        assertEquals("aboutme", editedUser.getAboutMe());
    }

    @Test
    public void testODeditUserEditLocation() {
        try {
            _userService.editUser(userName, "LOCATION", "location");
        } catch (IpatException e) {
            String errorCode = e.getErrorInfos()
                                .get(0)
                                .getErrorCode();
            fail("edit location should not fail here\nerrorCode:" + errorCode);
        }
        User editedUser = _userRepository.findById(2L).orElse(null);
        assertNotNull(editedUser);
        assertEquals("location", editedUser.getLocation());
    }

    @Test
    public void testOEeditUserEditOrganisation() {
        try {
            _userService.editUser(userName, "ORGANISATION", "organisation");
        } catch (IpatException e) {
            String errorCode = e.getErrorInfos()
                                .get(0)
                                .getErrorCode();
            fail("edit organisation should not fail here\nerrorCode:" + errorCode);
        }
        User editedUser = _userRepository.findById(2L).orElse(null);
        assertNotNull(editedUser);
        assertEquals("organisation", editedUser.getOrganisation());
    }

    @Test
    public void testOFeditUserEditHomepage() {
        try {
            _userService.editUser(userName, "HOMEPAGE", "homepage");
        } catch (IpatException e) {
            String errorCode = e.getErrorInfos()
                                .get(0)
                                .getErrorCode();
            fail("edit homepage should not fail here\nerrorCode:" + errorCode);
        }
        User editedUser = _userRepository.findById(2L).orElse(null);
        assertNotNull(editedUser);
        assertEquals("homepage", editedUser.getHomepage());
    }

    @Test
    public void testOGeditUserEditMailInvalidMail() {
        try {
            _userService.editUser(userName, "MAIL", "invalid_mail");
        } catch (IpatException e) {
            assertEquals(ErrorCodes.INVALID_MAIL, e.getErrorInfos()
                                                   .get(0)
                                                   .getErrorCode());
        }
    }

    @Test
    public void testOHeditUserEditMailAlreadyExists() {
        try {
            _userService.editUser(userName, "MAIL", "adam@iplantatree.de");
        } catch (IpatException e) {
            assertEquals(ErrorCodes.MAIL_ALREADY_EXISTS, e.getErrorInfos()
                                                          .get(0)
                                                          .getErrorCode());
        }
    }
    
    @Test
    public void testOIeditUserEditMailSuccess() {
        try {
            _userService.editUser(userName, "MAIL", "edited_user@iplantatree.de");
        } catch (IpatException e) {
            String errorCode = e.getErrorInfos()
                                .get(0)
                                .getErrorCode();
            fail("edit mail should not fail here\nerrorCode:" + errorCode);
        }
        User editedUser = _userRepository.findById(2L).orElse(null);
        assertNotNull(editedUser);
        assertEquals("edited_user@iplantatree.de", editedUser.getMail());
    }
    
    @Test
    public void testOJeditUserEditNewsletter() {
        try {
            _userService.editUser(userName, "NEWSLETTER", "JA");
        } catch (IpatException e) {
            String errorCode = e.getErrorInfos()
                                .get(0)
                                .getErrorCode();
            fail("edit newsletter should not fail here\nerrorCode:" + errorCode);
        }
        User editedUser = _userRepository.findById(2L).orElse(null);
        assertNotNull(editedUser);
        assertEquals(true, editedUser.isNewsletter());
    }
    
    @Test
    public void testOKeditUserEditOrganizationType() {
        try {
            _userService.editUser(userName, "ORGANIZATION_TYPE", OrganizationType.COMMERCIAL.toString());
        } catch (IpatException e) {
            String errorCode = e.getErrorInfos()
                                .get(0)
                                .getErrorCode();
            fail("edit organiization type should not fail here\nerrorCode:" + errorCode);
        }
        User editedUser = _userRepository.findById(2L).orElse(null);
        assertNotNull(editedUser);
        assertEquals(OrganizationType.COMMERCIAL, editedUser.getOrganizationType());
    }
    
    @Test
    public void testOLeditUserEditLanguage() {
        try {
            _userService.editUser(userName, "LANGUAGE", Language.ENGLISH.toString());
        } catch (IpatException e) {
            String errorCode = e.getErrorInfos()
                                .get(0)
                                .getErrorCode();
            fail("edit language should not fail here\nerrorCode:" + errorCode);
        }
        User editedUser = _userRepository.findById(2L).orElse(null);
        assertNotNull(editedUser);
        assertEquals(Language.ENGLISH, editedUser.getLang());
    }
    
    @Test
    public void testOMeditPassword() {
        try {
            _userService.editUser(userName, "PASSWORD", "new_password");
        } catch (IpatException e) {
            String errorCode = e.getErrorInfos()
                                .get(0)
                                .getErrorCode();
            fail("edit language should not fail here\nerrorCode:" + errorCode);
        }
        User editedUser = _userRepository.findById(2L).orElse(null);
        assertNotNull(editedUser);
        assertEquals(_passwordEncrypter.encryptPassword("new_password"), editedUser.getPassword());
    }
    
    @Test
    public void testPgetUserDetails(){
        _dbInjecter.injectTreeType("wood", "desc", 0.5);
        _dbInjecter.injectProject("Project", "Adam", "very n1 project", true, 0, 0);
        _dbInjecter.injectProjectArticle("wood", "Project", 3.0);
        
        _dbInjecter.injectTreeToProject("wood", userName, 1, 900000L, "Project");
        _dbInjecter.injectTreeToProject("wood", "Adam", 2, 900000L, "Project");
        
        UserReportData userData = _userService.getUserDetails(userName, true);
        assertEquals(userName, userData.getUserName());
        assertEquals(2, userData.getRank());
        assertEquals(1L, userData.getCo2Data().getTreesCount().longValue());
        assertEquals("aboutme", userData.getAboutMe());
        assertEquals("location", userData.getLocation());
        assertEquals("organisation", userData.getOrganisation());
        assertEquals("homepage", userData.getHomepage());
        assertEquals("edited_user@iplantatree.de", userData.getMail());
        assertEquals("JA", userData.getNewsletter());
        assertEquals(OrganizationType.COMMERCIAL.getDescription(), userData.getOrganizationType());
        assertEquals(Language.ENGLISH, userData.getLang());
        
    }
    
    @Test
    public void testQAnonymizeUser() {
        _dbInjecter.injectUser("UserToAnonymize", "userToAnonymize@iplantatree.de");
        
        User user = null;
        try {
            user = _userService.anonymizeUser("Adam");
        } catch (IpatException e) {
            
        }
        
        assertThat(user.getName(), containsString("Anonymous"));
        assertEquals(user.getMail(), "");
    }

}
