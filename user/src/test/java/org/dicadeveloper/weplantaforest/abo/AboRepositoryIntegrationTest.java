package org.dicadeveloper.weplantaforest.abo;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.abo.Abo.Period;
import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.cart.CartRepository;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBag;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.dicadeveloper.weplantaforest.testsupport.PlantPageDataCreater;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
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
public class AboRepositoryIntegrationTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    public DbInjecter _dbInjecter;

    @Autowired
    public AboRepository _aboRepository;

    @Autowired
    public AboHelper _aboHelper;

    @Autowired
    public CartRepository _cartRepository;
    
    @Autowired
    public TreeRepository _treeRepository;
    
    @Autowired
    private UserRepository _userRepository;

    @Test
    public void testFindAbosByUserId() {
        long createdOn = System.currentTimeMillis();
        _dbInjecter.injectUser("Adam");
        _dbInjecter.injectAbo("Adam", true, 1, Period.WEEKLY, createdOn);

        List<Abo> savedAbos = _aboRepository.findAbosByUserId(1L);

        assertThat(savedAbos.get(0)
                            .getAmount()).isEqualTo(1);
        assertThat(savedAbos.get(0)
                            .isActive()).isEqualTo(true);
        assertThat(savedAbos.get(0)
                            .getPeriod()).isEqualTo(Period.WEEKLY);
        assertThat(savedAbos.get(0)
                            .getTimeStamp()).isEqualTo(createdOn);
        assertThat(savedAbos.get(0)
                            .getUser()
                            .getName()).isEqualTo("Adam");
    }

    @Test
    public void testFindActiveAbos() {
        long createdOn = System.currentTimeMillis();
        _dbInjecter.injectUser("Adam");
        _dbInjecter.injectAbo("Adam", true, 1, Period.WEEKLY, createdOn);
        _dbInjecter.injectAbo("Adam", true, 1, Period.WEEKLY, createdOn);
        _dbInjecter.injectAbo("Adam", false, 1, Period.WEEKLY, createdOn);

        List<Abo> activeAbos = _aboRepository.findAllActiveAbos();

        assertThat(activeAbos.size()).isEqualTo(2);
    }

    @Test
    @Transactional
    public void testSaveAboCreatedFromAboHelper() {
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

        _aboRepository.save(abo);

        assertThat(_aboRepository.count()).isEqualTo(1);
        assertThat(_cartRepository.count()).isEqualTo(1);
        assertThat(_treeRepository.count()).isEqualTo(1);

        Abo savedAbo = _aboRepository.findOne(1L);
        assertThat(savedAbo.getCurrentCart()).isNotNull();

        Cart savedCart = _cartRepository.findOne(1L);
        assertThat(savedCart.getAbo()).isNotNull();
    }

}
