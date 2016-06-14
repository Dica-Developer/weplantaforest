package org.dicadeveloper.weplantaforest.support;

import static org.assertj.core.api.Assertions.assertThat;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.cart.CartRepository;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.planting.SimplePlantPageData;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.dicadeveloper.weplantaforest.testsupport.PlantPageDataCreater;
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
public class SimplePlantPageDataToCartConverterTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    public DbInjecter _dbInjecter;

    @Autowired
    public PlantPageDataToCartConverter _plantPageDataCartConverter;

    @Autowired
    public CartRepository _cartRepository;

    @Test
    public void testConvertFromPlantPageDataToCartOneItem() {
        SimplePlantPageData plantPageData = PlantPageDataCreater.initializeSimplePlantPageData();
        plantPageData = PlantPageDataCreater.createSimplePlantItemAndAddToSimplePlantPageData(3, 300, "wood",
                "Project A", plantPageData);

        _dbInjecter.injectTreeType("wood", "wood", 0.5);

        _dbInjecter.injectUser("Adam");

        _dbInjecter.injectProject("Project A", "Adam", "another project", true, 0, 0);

        _dbInjecter.injectProjectArticle("wood", "Project A", 3.0);

        Cart cart = _plantPageDataCartConverter.convertSimplePlantPageDataToCart(plantPageData);

        assertThat(cart.getTotalPrice()
                       .doubleValue()).isEqualTo(9.0);
        assertThat(cart.getCartItems()
                       .get(0)
                       .getPlantArticleId()).isEqualTo(1L);
        assertThat(cart.getCartItems()
                       .get(0)
                       .getAmount()).isEqualTo(3);
        assertThat(cart.getCartItems()
                       .get(0)
                       .getBasePricePerPiece()
                       .doubleValue()).isEqualTo(3.0);
    }

    @Test
    public void testConvertFromPlantPageDataToCartTwoItems() {
        SimplePlantPageData plantPageData = PlantPageDataCreater.initializeSimplePlantPageData();
        plantPageData = PlantPageDataCreater.createSimplePlantItemAndAddToSimplePlantPageData(3, 300, "wood",
                "Project A", plantPageData);
        plantPageData = PlantPageDataCreater.createSimplePlantItemAndAddToSimplePlantPageData(1, 100, "doow",
                "Project A", plantPageData);

        _dbInjecter.injectTreeType("wood", "wood", 0.5);
        _dbInjecter.injectTreeType("doow", "doow", 0.5);

        _dbInjecter.injectUser("Adam");

        _dbInjecter.injectProject("Project A", "Adam", "another project", true, 0, 0);

        _dbInjecter.injectProjectArticle("wood", "Project A", 3.0);
        _dbInjecter.injectProjectArticle("doow", "Project A", 1.0);

        Cart cart = _plantPageDataCartConverter.convertSimplePlantPageDataToCart(plantPageData);

        assertThat(cart.getTotalPrice()
                       .doubleValue()).isEqualTo(10.0);
        assertThat(cart.getCartItems()
                       .get(0)
                       .getAmount()).isIn(1, 3);
        assertThat(cart.getCartItems()
                       .get(0)
                       .getBasePricePerPiece()
                       .doubleValue()).isIn(1.0, 3.0);
        assertThat(cart.getCartItems()
                       .get(0)
                       .getPlantArticleId()).isIn(1L, 2L);
        assertThat(cart.getCartItems()
                       .get(1)
                       .getAmount()).isIn(1, 3);
        assertThat(cart.getCartItems()
                       .get(1)
                       .getBasePricePerPiece()
                       .doubleValue()).isIn(1.0, 3.0);
        assertThat(cart.getCartItems()
                       .get(1)
                       .getPlantArticleId()).isIn(1L, 2L);
    }

    @Test
    public void testConvertFromPlantPageDataToCartThreeItems() {
        SimplePlantPageData plantPageData = PlantPageDataCreater.initializeSimplePlantPageData();
        plantPageData = PlantPageDataCreater.createSimplePlantItemAndAddToSimplePlantPageData(3, 300, "wood",
                "Project A", plantPageData);
        plantPageData = PlantPageDataCreater.createSimplePlantItemAndAddToSimplePlantPageData(1, 100, "doow",
                "Project A", plantPageData);
        plantPageData = PlantPageDataCreater.createSimplePlantItemAndAddToSimplePlantPageData(2, 100, "wodo",
                "Project A", plantPageData);

        _dbInjecter.injectTreeType("wood", "wood", 0.5);
        _dbInjecter.injectTreeType("doow", "doow", 0.5);
        _dbInjecter.injectTreeType("wodo", "doow", 0.5);

        _dbInjecter.injectUser("Adam");

        _dbInjecter.injectProject("Project A", "Adam", "another project", true, 0, 0);

        _dbInjecter.injectProjectArticle("wood", "Project A", 3.0);
        _dbInjecter.injectProjectArticle("doow", "Project A", 1.0);
        _dbInjecter.injectProjectArticle("wodo", "Project A", 1.0);

        Cart cart = _plantPageDataCartConverter.convertSimplePlantPageDataToCart(plantPageData);

        assertThat(cart.getTotalPrice()
                       .doubleValue()).isEqualTo(12.0);
        assertThat(cart.getCartItems()
                       .get(0)
                       .getAmount()).isEqualTo(3);
        assertThat(cart.getCartItems()
                       .get(0)
                       .getBasePricePerPiece()
                       .doubleValue()).isEqualTo(3.0);
        assertThat(cart.getCartItems()
                       .get(0)
                       .getPlantArticleId()).isEqualTo(1L);
        assertThat(cart.getCartItems()
                       .get(1)
                       .getAmount()).isEqualTo(1);
        assertThat(cart.getCartItems()
                       .get(1)
                       .getBasePricePerPiece()
                       .doubleValue()).isEqualTo(1.0);
        assertThat(cart.getCartItems()
                       .get(1)
                       .getPlantArticleId()).isEqualTo(2L);
        assertThat(cart.getCartItems()
                       .get(2)
                       .getAmount()).isEqualTo(2);
        assertThat(cart.getCartItems()
                       .get(2)
                       .getBasePricePerPiece()
                       .doubleValue()).isEqualTo(1.0);
        assertThat(cart.getCartItems()
                       .get(2)
                       .getPlantArticleId()).isEqualTo(3L);
        assertThat(cart.getCartItems()
                       .size()).isEqualTo(3);
    }

    @Test
    public void testSavetoDBAfterConversion() {
        SimplePlantPageData plantPageData = PlantPageDataCreater.initializeSimplePlantPageData();
        plantPageData = PlantPageDataCreater.createSimplePlantItemAndAddToSimplePlantPageData(3, 300, "wood",
                "Project A", plantPageData);

        _dbInjecter.injectTreeType("wood", "wood", 0.5);

        _dbInjecter.injectUser("Adam");

        _dbInjecter.injectProject("Project A", "Adam", "another project", true, 0, 0);

        _dbInjecter.injectProjectArticle("wood", "Project A", 3.0);

        Cart cart = _plantPageDataCartConverter.convertSimplePlantPageDataToCart(plantPageData);

        _cartRepository.save(cart);

        assertThat(_cartRepository.count()).isEqualTo(1);
    }

}
