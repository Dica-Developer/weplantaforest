package org.dicadeveloper.weplantaforest.gift;

import static org.assertj.core.api.Assertions.assertThat;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.code.Code;
import org.dicadeveloper.weplantaforest.code.CodeGenerator;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.dev.inject.DatabasePopulator;
import org.dicadeveloper.weplantaforest.gift.Gift.Status;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
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
public class GiftRepositoryIntegrationTest {
    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    public DatabasePopulator _databasePopulator;

    @Autowired
    public DbInjecter _dbInjecter;

    @Autowired
    private GiftRepository _giftRepository;

    @Autowired
    private UserRepository _userRepository;

    @Autowired
    private CodeGenerator _codeGenerator;

    @Test
    public void testSaveAndLoadGift() {
        _dbInjecter.injectUser("Consignore");
        _dbInjecter.injectUser("Recipient");

        Gift gift = new Gift();
        gift.setConsignor(_userRepository.findByName("Consignore"));
        gift.setRecipient(_userRepository.findByName("Recipient"));

        _giftRepository.save(gift);

        Code code = _codeGenerator.generate(gift);
        gift.setCode(code);

        gift.setStatus(Status.NEW);

        _giftRepository.save(gift);

        Gift savedGift = _giftRepository.findOne(1L);

        assertThat(savedGift).isNotNull();
        assertThat(savedGift.getConsignor()
                            .getName()).isEqualTo("Consignore");
        assertThat(savedGift.getRecipient()
                            .getName()).isEqualTo("Recipient");
        assertThat(savedGift.getStatus()).isEqualTo(Status.NEW);
        assertThat(savedGift.getCode()
                            .getCode()).isEqualTo(code.getCode());

    }
}
