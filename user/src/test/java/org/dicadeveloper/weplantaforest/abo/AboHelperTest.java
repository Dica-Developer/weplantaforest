package org.dicadeveloper.weplantaforest.abo;

import static org.assertj.core.api.Assertions.assertThat;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.abo.Abo.Period;
import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBag;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.dicadeveloper.weplantaforest.testsupport.PlantPageDataCreater;
import org.dicadeveloper.weplantaforest.user.User;
import org.dicadeveloper.weplantaforest.user.UserRepository;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class AboHelperTest {
    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private DbInjecter _dbInjecter;

    @Autowired
    private AboHelper _aboHelper;
    
    @Autowired
    private UserRepository _userRepository;

    @Test
    @Transactional
    public void testCreateAboFromAboRequest() {  
        
        _dbInjecter.injectTreeType("wood", "this is wood", 0.5);

        _dbInjecter.injectUser("Adam");

        _dbInjecter.injectProject("Project A", "Adam", "desc", true, 1.0f, 1.0f);
        _dbInjecter.injectProjectArticle("wood", "Project A", 10, 3.0, 0.5);

        AboRequestData aboRequest = new AboRequestData();
        aboRequest.amount = 1;
        aboRequest.period = "WEEKLY";

        PlantBag plantBag = PlantPageDataCreater.initializePlantPageData();
        plantBag = PlantPageDataCreater.initializeProjectDataAndAddToPlantPageData(plantBag, "Project A");
        plantBag = PlantPageDataCreater.createPlantItemAndAddToPlantPageData(3, 300, "wood", "Project A", plantBag);
       
        aboRequest.plantBag = plantBag;

        User buyer = _userRepository.findByName("Adam");
        
        Abo abo = _aboHelper.createAboFromAboRequest(aboRequest, buyer);

        assertThat(abo.getUser()
                      .getName()).isEqualTo("Adam");
        assertThat(abo.getAmount()).isEqualTo(1);
        assertThat(abo.getPeriod()).isEqualTo(Period.WEEKLY);
        assertThat(abo.getCarts()
                      .size()).isEqualTo(1);

        Cart cartFromAbo = abo.getCurrentCart();

        assertThat(cartFromAbo.getBuyer()
                              .getName()).isEqualTo("Adam");
        assertThat(cartFromAbo.getCartItems()
                              .size()).isEqualTo(1);
        assertThat(cartFromAbo.getCartItems()
                              .get(0)
                              .getAmount()).isEqualTo(3);
        assertThat(cartFromAbo.getCartItems()
                              .get(0)
                              .getBasePricePerPiece()
                              .doubleValue()).isEqualTo(3.0);
        assertThat(cartFromAbo.getCartItems()
                              .get(0)
                              .getTotalPrice()
                              .doubleValue()).isEqualTo(9.0);
        assertThat(cartFromAbo.getCartItems()
                              .get(0)
                              .getTree()
                              .getTreeType()
                              .getName()).isEqualTo("wood");
        assertThat(cartFromAbo.getCartItems()
                              .get(0)
                              .getProjectArticleId()).isEqualTo(1);
    }

}
