package org.dicadeveloper.weplantaforest.support;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.HashMap;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.admin.codes.Cart;
import org.dicadeveloper.weplantaforest.admin.codes.CartRepository;
import org.dicadeveloper.weplantaforest.planting.PlantItem;
import org.dicadeveloper.weplantaforest.planting.PlantPageData;
import org.dicadeveloper.weplantaforest.planting.ProjectData;
import org.dicadeveloper.weplantaforest.testsupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.hibernate.ConnectionReleaseMode;
import org.hibernate.engine.jdbc.spi.JdbcConnectionAccess;
import org.hibernate.engine.transaction.spi.TransactionContext;
import org.hibernate.engine.transaction.spi.TransactionEnvironment;
import org.hibernate.engine.transaction.spi.TransactionImplementor;
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
        PlantPageData plantPageData = initializePlantPageData();
        plantPageData = initializeProjectDataAndAddToPlantPageData(plantPageData, "Project A");

        PlantItem plantItem = createPlantItem(3, 3.0);

        plantPageData.getProjects()
                     .get("Project A")
                     .getPlantItems()
                     .put("wood", plantItem);

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
                       .getBasePricePerPiece().doubleValue()).isEqualTo(3.0);
    }

    @Test
    public void testConvertFromPlantPageDataToCartTwoItems() {
        PlantPageData plantPageData = initializePlantPageData();
        plantPageData = initializeProjectDataAndAddToPlantPageData(plantPageData, "Project A");

        PlantItem plantItem = createPlantItem(3, 3.0);

        plantPageData.getProjects()
                     .get("Project A")
                     .getPlantItems()
                     .put("wood", plantItem);

        PlantItem secondPlantItem = createPlantItem(1, 1.0);
        plantPageData.getProjects()
                     .get("Project A")
                     .getPlantItems()
                     .put("doow", secondPlantItem);

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
        PlantPageData plantPageData = initializePlantPageData();
        plantPageData = initializeProjectDataAndAddToPlantPageData(plantPageData, "Project A");

        PlantItem plantItem = createPlantItem(3, 3.0);

        plantPageData.getProjects()
                     .get("Project A")
                     .getPlantItems()
                     .put("wood", plantItem);

        PlantItem secondPlantItem = createPlantItem(1, 1.0);
        plantPageData.getProjects()
                     .get("Project A")
                     .getPlantItems()
                     .put("doow", secondPlantItem);

        PlantItem thirdPlantItem = createPlantItem(0, 1.0);
        plantPageData.getProjects()
                     .get("Project A")
                     .getPlantItems()
                     .put("wodo", thirdPlantItem);

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
        PlantPageData plantPageData = initializePlantPageData();
        plantPageData = initializeProjectDataAndAddToPlantPageData(plantPageData, "Project A");

        PlantItem plantItem = createPlantItem(3, 3.0);

        plantPageData.getProjects()
                     .get("Project A")
                     .getPlantItems()
                     .put("wood", plantItem);

        _dbInjecter.injectTreeType("wood", "wood", 0.5);

        _dbInjecter.injectUser("Adam");

        _dbInjecter.injectProject("Project A", "Adam", "another project", true, 0, 0);

        _dbInjecter.injectProjectArticle("wood", "Project A", 3.0);

        Cart cart = _plantPageDataCartConverter.convertPlantPageDataToCart(plantPageData);

        _cartRepository.save(cart);
        
        assertThat(_cartRepository.count()).isEqualTo(1);
    }

    private PlantPageData initializePlantPageData() {
        PlantPageData plantPageData = new PlantPageData();
        plantPageData.setProjects(new HashMap<String, ProjectData>());
        return plantPageData;
    }

    private PlantPageData initializeProjectDataAndAddToPlantPageData(PlantPageData plantPageData, String projectName) {
        ProjectData projectData = new ProjectData();
        projectData.setPlantItems(new HashMap<String, PlantItem>());
        plantPageData.getProjects()
                     .put(projectName, projectData);
        return plantPageData;
    }

    private PlantItem createPlantItem(int amount, double price) {
        PlantItem plantItem = new PlantItem();
        plantItem.setAmount(amount);
        plantItem.setTreePrice(price);
        return plantItem;
    }

}
