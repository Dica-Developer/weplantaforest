package org.dicadeveloper.weplantaforest.support;

import static org.assertj.core.api.Assertions.assertThat;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.admin.codes.Cart;
import org.dicadeveloper.weplantaforest.admin.codes.CartRepository;
import org.dicadeveloper.weplantaforest.planting.PlantPageData;
import org.dicadeveloper.weplantaforest.testsupport.CleanDbRule;
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
public class PlantPageDataCartConverterTest {

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
        PlantPageData plantPageData = PlantPageDataCreater.initializePlantPageData();
        plantPageData = PlantPageDataCreater.initializeProjectDataAndAddToPlantPageData(plantPageData, "Project A");
        plantPageData = PlantPageDataCreater.createPlantItemAndAddToPlantPageData(3, 300, "wood", "Project A",
                plantPageData);

        _dbInjecter.injectTreeType("wood", "wood", 0.5);

        _dbInjecter.injectUser("Adam");

        _dbInjecter.injectProject("Project A", "Adam", "another project", true, 0, 0);

        _dbInjecter.injectProjectArticle("wood", "Project A", 3.0);

        Cart cart = _plantPageDataCartConverter.convertPlantPageDataToCart(plantPageData);

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
        PlantPageData plantPageData = PlantPageDataCreater.initializePlantPageData();
        plantPageData = PlantPageDataCreater.initializeProjectDataAndAddToPlantPageData(plantPageData, "Project A");
        plantPageData = PlantPageDataCreater.createPlantItemAndAddToPlantPageData(3, 300, "wood", "Project A",
                plantPageData);
        plantPageData = PlantPageDataCreater.createPlantItemAndAddToPlantPageData(1, 100, "doow", "Project A",
                plantPageData);

        _dbInjecter.injectTreeType("wood", "wood", 0.5);
        _dbInjecter.injectTreeType("doow", "doow", 0.5);

        _dbInjecter.injectUser("Adam");

        _dbInjecter.injectProject("Project A", "Adam", "another project", true, 0, 0);

        _dbInjecter.injectProjectArticle("wood", "Project A", 3.0);
        _dbInjecter.injectProjectArticle("doow", "Project A", 1.0);

        Cart cart = _plantPageDataCartConverter.convertPlantPageDataToCart(plantPageData);

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
    public void testConvertFromPlantPageDataToCartThreeItemsOneWithZeroAmount() {
        PlantPageData plantPageData = PlantPageDataCreater.initializePlantPageData();
        plantPageData = PlantPageDataCreater.initializeProjectDataAndAddToPlantPageData(plantPageData, "Project A");
        plantPageData = PlantPageDataCreater.createPlantItemAndAddToPlantPageData(3, 300, "wood", "Project A",
                plantPageData);
        plantPageData = PlantPageDataCreater.createPlantItemAndAddToPlantPageData(1, 100, "doow", "Project A",
                plantPageData);
        plantPageData = PlantPageDataCreater.createPlantItemAndAddToPlantPageData(0, 100, "wodo", "Project A",
                plantPageData);

        _dbInjecter.injectTreeType("wood", "wood", 0.5);
        _dbInjecter.injectTreeType("doow", "doow", 0.5);
        _dbInjecter.injectTreeType("wodo", "doow", 0.5);

        _dbInjecter.injectUser("Adam");

        _dbInjecter.injectProject("Project A", "Adam", "another project", true, 0, 0);

        _dbInjecter.injectProjectArticle("wood", "Project A", 3.0);
        _dbInjecter.injectProjectArticle("doow", "Project A", 1.0);
        _dbInjecter.injectProjectArticle("wodo", "Project A", 1.0);

        Cart cart = _plantPageDataCartConverter.convertPlantPageDataToCart(plantPageData);

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
        assertThat(cart.getCartItems()
                       .size()).isEqualTo(2);
    }

    @Test
    public void testSavetoDBAfterConversion() {
        PlantPageData plantPageData = PlantPageDataCreater.initializePlantPageData();
        plantPageData = PlantPageDataCreater.initializeProjectDataAndAddToPlantPageData(plantPageData, "Project A");
        plantPageData = PlantPageDataCreater.createPlantItemAndAddToPlantPageData(3, 300, "wood", "Project A",
                plantPageData);

        _dbInjecter.injectTreeType("wood", "wood", 0.5);

        _dbInjecter.injectUser("Adam");

        _dbInjecter.injectProject("Project A", "Adam", "another project", true, 0, 0);

        _dbInjecter.injectProjectArticle("wood", "Project A", 3.0);

        Cart cart = _plantPageDataCartConverter.convertPlantPageDataToCart(plantPageData);

        _cartRepository.save(cart);

        assertThat(_cartRepository.count()).isEqualTo(1);
    }

}
