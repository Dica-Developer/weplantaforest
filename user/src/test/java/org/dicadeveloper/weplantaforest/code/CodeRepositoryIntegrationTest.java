package org.dicadeveloper.weplantaforest.code;

import static org.assertj.core.api.Assertions.assertThat;

import org.dicadeveloper.weplantaforest.common.testsupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class CodeRepositoryIntegrationTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    public DbInjecter _dbInjecter;

    @Autowired
    private CodeRepository _codeRepository;

    @Test
    public void testSaveCodeAndFindByCodeString() {
        String codeString = "a-b-c";

        Code code = new Code();
        code.setCode(codeString);
        code.setNumber(1);
        code.setMonth(1);
        code.setYear(2016);
        code.setEvaluated(true);

        _codeRepository.save(code);

        assertThat(_codeRepository.count()).isEqualTo(1);

        Code savedCode = _codeRepository.findByCode(codeString);
        assertThat(savedCode.getNumber()).isEqualTo(1);
        assertThat(savedCode.getMonth()).isEqualTo(1);
        assertThat(savedCode.getYear()).isEqualTo(2016);
        assertThat(savedCode.isEvaluated()).isTrue();
        assertThat(savedCode.getCode()).isEqualTo(codeString);

    }
}
