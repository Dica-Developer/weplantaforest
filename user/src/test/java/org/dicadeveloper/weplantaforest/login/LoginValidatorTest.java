package org.dicadeveloper.weplantaforest.login;

import static org.assertj.core.api.Assertions.assertThat;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.encryption.PasswordEncrypter;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = WeplantaforestApplication.class)
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class LoginValidatorTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private DbInjecter _dbInjecter;

    @Autowired
    private PasswordEncrypter _passwordEncrypter;

    @Autowired
    private LoginValidator _loginValidator;

    @Test
    public void testValidateLoginToTrue() {
        _dbInjecter.injectUser("Adam");
        String encryptedPassword = _passwordEncrypter.encryptPassword("Adam");

        assertThat(_loginValidator.validateLogin("Adam", encryptedPassword)).isTrue();
    }

    @Test
    public void testValidateLoginToFalseCauseOfNonExistingUser() {
        String encryptedPassword = _passwordEncrypter.encryptPassword("Adam");

        assertThat(_loginValidator.validateLogin("Adam", encryptedPassword)).isFalse();
    }

    @Test
    public void testValidateLoginToFalseCauseOfWrongPassword() {
        _dbInjecter.injectUser("Adam");

        assertThat(_loginValidator.validateLogin("Adam", "wrongPassword")).isFalse();
    }
}
