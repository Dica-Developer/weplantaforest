package org.dicadeveloper.weplantaforest.encrypter;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.abo.Param;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.encryption.ParamEncrypter;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.dicadeveloper.weplantaforest.user.User;
import org.dicadeveloper.weplantaforest.user.UserRepository;
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
public class ParamEncrypterTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    public DbInjecter _dbInjecter;

    @Autowired
    private UserRepository _userRepository;

    @Test
    public void testEncryptAndDecryptParams() {
        _dbInjecter.injectUser("Adam");

        Map<String, String> params = new HashMap<String, String>();
        params.put("name1", "value1");
        params.put("name2", "value2");

        User user = _userRepository.findByName("Adam");
        user.setMail("adam@adam.de");
        
        ParamEncrypter paramEncrypter = ParamEncrypter.getInstance();
        paramEncrypter.init(user);

        List<Param> encryptedParams = paramEncrypter.encryptParams(params);

        Map<String, String> decryptedParamMap = paramEncrypter.decryptParams(encryptedParams);

        assertThat(decryptedParamMap.containsKey("name1")).isTrue();
        assertThat(decryptedParamMap.containsKey("name2")).isTrue();
        
        assertThat(decryptedParamMap.get("name1")).isEqualTo("value1");
        assertThat(decryptedParamMap.get("name2")).isEqualTo("value2");
        
    }

}
