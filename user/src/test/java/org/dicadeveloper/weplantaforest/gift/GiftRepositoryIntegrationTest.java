package org.dicadeveloper.weplantaforest.gift;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.dev.inject.DatabasePopulator;
import org.dicadeveloper.weplantaforest.gift.Gift.Status;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.junit.Before;
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
@DirtiesContext(classMode = ClassMode.AFTER_CLASS)
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

    static boolean entitiesInjected = false;

    static String codeString1;
    static String codeString2;
    static String codeString3;

    @Before
    public void setup() {
        if (!entitiesInjected) {
            entitiesInjected = true;

            _dbInjecter.injectUser("Consignore");
            _dbInjecter.injectUser("Recipient");
            _dbInjecter.injectUser("otherUser");

            codeString1 = _dbInjecter.injectGiftWithCode("Consignore", Status.NEW).getCode();
            codeString2 = _dbInjecter.injectGiftWithCode("Consignore", Status.UNREDEEMED).getCode();
            codeString3 = _dbInjecter.injectGiftWithCode("Consignore", "Recipient", Status.REDEEMED);
            _dbInjecter.injectGiftWithCode("otherUser", Status.UNREDEEMED);

        }
    }

    @Test
    public void testFindGiftByCode() {
        Gift savedGift = _giftRepository.findGiftByCode(codeString1);

        assertThat(savedGift).isNotNull();
        assertThat(savedGift.getConsignor().getName()).isEqualTo("Consignore");
        assertThat(savedGift.getRecipient()).isNull();
        assertThat(savedGift.getStatus()).isEqualTo(Status.NEW);
        assertThat(savedGift.getCode().getCode()).isEqualTo(codeString1);

    }

    @Test
    public void testFindGiftsByConsignor() {
        List<Gift> gifts = _giftRepository.findGiftsByConsignor("Consignore");

        assertThat(gifts.size()).isEqualTo(3);
        assertThat(gifts.get(0).getRecipient()).isNull();
        assertThat(gifts.get(1).getRecipient()).isNull();
        assertThat(gifts.get(2).getRecipient().getName()).isEqualTo("Recipient");

        assertThat(gifts.get(0).getCode().getCode()).isEqualTo(codeString1);
        assertThat(gifts.get(1).getCode().getCode()).isEqualTo(codeString2);
        assertThat(gifts.get(2).getCode().getCode()).isEqualTo(codeString3);
    }

    @Test
    public void testFindGiftsByRecipient() {
        List<Gift> gifts = _giftRepository.findGiftsByRecipient("Recipient");

        assertThat(gifts.size()).isEqualTo(1);
        assertThat(gifts.get(0).getRecipient().getName()).isEqualTo("Recipient");
        assertThat(gifts.get(0).getCode().getCode()).isEqualTo(codeString3);
    }
}
