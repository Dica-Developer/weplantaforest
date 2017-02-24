package org.dicadeveloper.weplantaforest.encrypter;

import static org.assertj.core.api.Assertions.assertThat;

import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.encryption.PasswordEncrypter;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@SpringBootTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class PasswordEncrypterTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private PasswordEncrypter _passwordEncrypter;

    @Test
    public void testEncryptPassword() {
        String password = "password";

        String encryptedPassword = _passwordEncrypter.encryptPassword(password);
        assertThat(encryptedPassword).isEqualTo("W6ph5Mm5Pz8GgiULbPgzG37mj9g=");
    }
}
