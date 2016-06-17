package org.dicadeveloper.weplantaforest.gift;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.dev.inject.DatabasePopulator;
import org.dicadeveloper.weplantaforest.gift.Gift.Status;
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

    @Test
    public void testSaveAndLoadGift() {
        _dbInjecter.injectUser("Consignore");
        _dbInjecter.injectUser("Recipient");

        String codeString = _dbInjecter.injectGiftWithCode("Consignore", "Recipient", Status.NEW);

        Gift savedGift = _giftRepository.findOne(1L);

        assertThat(savedGift).isNotNull();
        assertThat(savedGift.getConsignor()
                            .getName()).isEqualTo("Consignore");
        assertThat(savedGift.getRecipient()
                            .getName()).isEqualTo("Recipient");
        assertThat(savedGift.getStatus()).isEqualTo(Status.NEW);
        assertThat(savedGift.getCode()
                            .getCode()).isEqualTo(codeString);

    }

    @Test
    public void testFindGiftsByConsignor() {
        _dbInjecter.injectUser("Consignore");
        _dbInjecter.injectUser("otherUser");

        String code1 = _dbInjecter.injectGiftWithCode("Consignore", Status.NEW);
        String code2 = _dbInjecter.injectGiftWithCode("Consignore", "otherUser", Status.REDEEMED);
        String code3 = _dbInjecter.injectGiftWithCode("Consignore", Status.UNREDEEMED);

        _dbInjecter.injectGiftWithCode("otherUser", Status.UNREDEEMED);

        List<Gift> gifts = _giftRepository.findGiftsByConsignor(1L);

        assertThat(gifts.size()).isEqualTo(3);
        assertThat(gifts.get(0)
                        .getRecipient()).isNull();
        assertThat(gifts.get(1)
                        .getRecipient()
                        .getName()).isEqualTo("otherUser");
        assertThat(gifts.get(2)
                        .getRecipient()).isNull();

        assertThat(gifts.get(0)
                        .getCode()
                        .getCode()).isEqualTo(code1);
        assertThat(gifts.get(1)
                        .getCode()
                        .getCode()).isEqualTo(code2);
        assertThat(gifts.get(2)
                        .getCode()
                        .getCode()).isEqualTo(code3);
    }

    @Test
    public void testFindGiftsByRecipient() {
        _dbInjecter.injectUser("Consignore");
        _dbInjecter.injectUser("otherUser");

        String code1 = _dbInjecter.injectGiftWithCode("Consignore", "otherUser", Status.REDEEMED);

        _dbInjecter.injectGiftWithCode("Consignore", Status.NEW);
        _dbInjecter.injectGiftWithCode("Consignore", Status.UNREDEEMED);
        _dbInjecter.injectGiftWithCode("otherUser", Status.UNREDEEMED);

        List<Gift> gifts = _giftRepository.findGiftsByRecipient(2L);

        assertThat(gifts.size()).isEqualTo(1);
        assertThat(gifts.get(0)
                        .getRecipient()
                        .getName()).isEqualTo("otherUser");
        assertThat(gifts.get(0)
                        .getCode()
                        .getCode()).isEqualTo(code1);
    }
}
