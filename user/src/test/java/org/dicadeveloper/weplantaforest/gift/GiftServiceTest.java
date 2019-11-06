package org.dicadeveloper.weplantaforest.gift;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

import javax.transaction.Transactional;

import org.dicadeveloper.weplantaforest.cart.CartRepository;
import org.dicadeveloper.weplantaforest.code.Code;
import org.dicadeveloper.weplantaforest.code.CodeRepository;
import org.dicadeveloper.weplantaforest.common.errorHandling.IpatException;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.gift.Gift.Status;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBag;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.dicadeveloper.weplantaforest.testsupport.PlantBagBuilder;
import org.dicadeveloper.weplantaforest.trees.Tree;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.dicadeveloper.weplantaforest.user.User;
import org.junit.FixMethodOrder;
import org.junit.Rule;
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
public class GiftServiceTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private DbInjecter _dbInjecter;

    @Autowired
    private GiftService _giftService;

    @Autowired
    private GiftRepository _giftRepository;

    @Autowired
    private CodeRepository _codeRepository;

    @Autowired
    private CartRepository _cartRepository;

    @Autowired
    private TreeRepository _treeRepository;

    PlantBagBuilder plantBagBuilder = new PlantBagBuilder();

    @Test
    public void testACreateGift() {
        User consignor = _dbInjecter.injectUser("Adam");
        _dbInjecter.injectTreeType("wood", "this is a wood", 0.5);
        _dbInjecter.injectProject("Project A", "Adam", "this is a project", true, 0, 0);
        _dbInjecter.injectProjectArticle("wood", "Project A", 10, 1.0, 0.5);
        PlantBag plantBag = plantBagBuilder.initializeProjectDataAndAddToPlantBag("Project A")
                                           .createPlantItemAndAddToPlantBag(5, 5, "wood", "Project A")
                                           .build();
        try {
            _giftService.generateGift(consignor, plantBag);
        } catch (IpatException e) {
            fail("No Exception expected, when generating a gift");
        }
        assertEquals(1, _giftRepository.count());
        assertEquals(1, _codeRepository.count());
        assertEquals(1, _cartRepository.count());
    }

    @Test
    @Transactional
    public void testBRedeemGiftCode() {
        User recipient = _dbInjecter.injectUser("Recipient");
        Code code = _codeRepository.findById(1L).orElse(null);
        Tree tree = _treeRepository.findById(1L).orElse(null);
        assertEquals(5, tree.getAmount());
        assertEquals("Adam", tree.getOwner()
                                 .getName());
        Gift gift = _giftRepository.findById(1L).orElse(null);
        gift.setStatus(Status.UNREDEEMED);
        _giftRepository.save(gift);
        try {
            _giftService.redeemGiftCode(recipient, code.getCode());
        } catch (IpatException e) {
            fail(String.format("No Exception expected, when redeeming a gift code.\nerrorCode: %s", e.getErrorInfos()
                                                                                                     .get(0)
                                                                                                     .getErrorCode()));
        }

        gift = _giftRepository.findById(1L).orElse(null);
        assertEquals(Status.REDEEMED, gift.getStatus());
        tree = _treeRepository.findById(1L).orElse(null);
        assertEquals(5, tree.getAmount());
        assertEquals("Recipient", tree.getOwner()
                                      .getName());
    }

}
