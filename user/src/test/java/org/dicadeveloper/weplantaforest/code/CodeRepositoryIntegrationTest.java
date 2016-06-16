package org.dicadeveloper.weplantaforest.code;

import static org.assertj.core.api.Assertions.assertThat;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.dev.inject.DatabasePopulator;
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
public class CodeRepositoryIntegrationTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    public DatabasePopulator _databasePopulator;

    @Autowired
    public DbInjecter _dbInjecter;

    @Autowired
    private CodeRepository _codeRepository;

    @Test
    public void testSaveCodeAndFindByCodeString() {
        String codeString = "a-b-c";

        Code code = new Code();
        code.setAmount(1.0f);
        code.setCode(codeString);
        code.setNumber(1);
        code.setMonth(1);
        code.setYear(2016);
        code.setEvaluated(true);

        _codeRepository.save(code);

        assertThat(_codeRepository.count()).isEqualTo(1);

        Code savedCode = _codeRepository.findByCode(codeString);

        assertThat(savedCode.getAmount()).isEqualTo(1.0f);
        assertThat(savedCode.getNumber()).isEqualTo(1);
        assertThat(savedCode.getMonth()).isEqualTo(1);
        assertThat(savedCode.getYear()).isEqualTo(2016);
        assertThat(savedCode.isEvaluated()).isTrue();
        assertThat(savedCode.getCode()).isEqualTo(codeString);

    }
}
