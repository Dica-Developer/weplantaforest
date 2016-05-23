package org.dicadeveloper.weplantaforest.planting;

import static org.assertj.core.api.Assertions.assertThat;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
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
public class PlantPageDataValidatorTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private DbInjecter _dbInjecter;

    @Autowired
    private PlantPageDataValidator _plantPageDataValidator;

    @Test
    public void testValidatePlantPageDataWithOneArticleToTrue() {
        _dbInjecter.injectTreeType("wood", "this is a wood", 0.5);

        _dbInjecter.injectUser("Adam");

        _dbInjecter.injectProject("Project A", "Adam", "this is a project", true, 0, 0);

        _dbInjecter.injectProjectArticle("wood", "Project A", 10, 1.0, 0.5);

        PlantPageData plantPageData = PlantPageDataCreater.initializePlantPageData();

        plantPageData = PlantPageDataCreater.initializeProjectDataAndAddToPlantPageData(plantPageData, "Project A");

        plantPageData = PlantPageDataCreater.createPlantItemAndAddToPlantPageData(5, 100, "wood", "Project A",
                plantPageData);

        boolean validation = _plantPageDataValidator.isPlantPageDataValid(plantPageData);

        assertThat(validation).isTrue();
    }

    @Test
    public void testValidatePlantPageDataWithTwoArticlesToTrue() {
        _dbInjecter.injectTreeType("wood", "this is a wood", 0.5);
        _dbInjecter.injectTreeType("doow", "this is a wood", 0.5);

        _dbInjecter.injectUser("Adam");

        _dbInjecter.injectProject("Project A", "Adam", "this is a project", true, 0, 0);

        _dbInjecter.injectProjectArticle("wood", "Project A", 10, 1.0, 0.5);
        _dbInjecter.injectProjectArticle("doow", "Project A", 10, 1.0, 0.5);

        PlantPageData plantPageData = PlantPageDataCreater.initializePlantPageData();

        plantPageData = PlantPageDataCreater.initializeProjectDataAndAddToPlantPageData(plantPageData, "Project A");

        plantPageData = PlantPageDataCreater.createPlantItemAndAddToPlantPageData(5, 100, "wood", "Project A",
                plantPageData);
        plantPageData = PlantPageDataCreater.createPlantItemAndAddToPlantPageData(10, 100, "doow", "Project A",
                plantPageData);

        boolean validation = _plantPageDataValidator.isPlantPageDataValid(plantPageData);

        assertThat(validation).isTrue();
    }

    @Test
    public void testValidatePlantPageDataWithOneArticleToFalse() {
        _dbInjecter.injectTreeType("wood", "this is a wood", 0.5);

        _dbInjecter.injectUser("Adam");

        _dbInjecter.injectProject("Project A", "Adam", "this is a project", true, 0, 0);

        _dbInjecter.injectProjectArticle("wood", "Project A", 10, 1.0, 0.5);

        PlantPageData plantPageData = PlantPageDataCreater.initializePlantPageData();

        plantPageData = PlantPageDataCreater.initializeProjectDataAndAddToPlantPageData(plantPageData, "Project A");

        plantPageData = PlantPageDataCreater.createPlantItemAndAddToPlantPageData(11, 100, "wood", "Project A",
                plantPageData);

        boolean validation = _plantPageDataValidator.isPlantPageDataValid(plantPageData);

        assertThat(validation).isFalse();
    }

    @Test
    public void testValidatePlantPageDataWithTwoArticlesToFalse() {
        _dbInjecter.injectTreeType("wood", "this is a wood", 0.5);
        _dbInjecter.injectTreeType("doow", "this is a wood", 0.5);

        _dbInjecter.injectUser("Adam");

        _dbInjecter.injectProject("Project A", "Adam", "this is a project", true, 0, 0);

        _dbInjecter.injectProjectArticle("wood", "Project A", 10, 1.0, 0.5);
        _dbInjecter.injectProjectArticle("doow", "Project A", 10, 1.0, 0.5);

        PlantPageData plantPageData = PlantPageDataCreater.initializePlantPageData();
        plantPageData = PlantPageDataCreater.initializeProjectDataAndAddToPlantPageData(plantPageData, "Project A");
        plantPageData = PlantPageDataCreater.createPlantItemAndAddToPlantPageData(5, 100, "wood", "Project A",
                plantPageData);
        plantPageData = PlantPageDataCreater.createPlantItemAndAddToPlantPageData(11, 100, "wood", "Project A",
                plantPageData);

        boolean validation = _plantPageDataValidator.isPlantPageDataValid(plantPageData);

        assertThat(validation).isFalse();
    }

    @Test
    public void testValidatePlantPageDataWithTwoProjectsAndTwoArticlesToFalse() {
        _dbInjecter.injectTreeType("wood", "this is a wood", 0.5);
        _dbInjecter.injectTreeType("doow", "this is a wood", 0.5);

        _dbInjecter.injectUser("Adam");

        _dbInjecter.injectProject("Project A", "Adam", "this is a project", true, 0, 0);
        _dbInjecter.injectProject("Project B", "Adam", "this is a project", true, 0, 0);

        _dbInjecter.injectProjectArticle("wood", "Project A", 10, 1.0, 0.5);
        _dbInjecter.injectProjectArticle("doow", "Project A", 10, 1.0, 0.5);
        _dbInjecter.injectProjectArticle("wood", "Project B", 10, 1.0, 0.5);
        _dbInjecter.injectProjectArticle("doow", "Project B", 10, 1.0, 0.5);

        PlantPageData plantPageData = PlantPageDataCreater.initializePlantPageData();
        plantPageData = PlantPageDataCreater.initializeProjectDataAndAddToPlantPageData(plantPageData, "Project A");
        plantPageData = PlantPageDataCreater.createPlantItemAndAddToPlantPageData(0, 100, "wood", "Project A",
                plantPageData);
        plantPageData = PlantPageDataCreater.createPlantItemAndAddToPlantPageData(5, 100, "wood", "Project A",
                plantPageData);
        plantPageData = PlantPageDataCreater.createPlantItemAndAddToPlantPageData(6, 100, "wood", "Project A",
                plantPageData);
        plantPageData = PlantPageDataCreater.createPlantItemAndAddToPlantPageData(12, 100, "wood", "Project A",
                plantPageData);

        boolean validation = _plantPageDataValidator.isPlantPageDataValid(plantPageData);

        assertThat(validation).isFalse();
    }

    @Test
    public void testValidatePlantPageDataWithOneArticleAndAlreadyPlantedTreesToTrue() {
        Long timeOfPlanting = System.currentTimeMillis();
        _dbInjecter.injectTreeType("wood", "this is a wood", 0.5);

        _dbInjecter.injectUser("Adam");

        _dbInjecter.injectProject("Project A", "Adam", "this is a project", true, 0, 0);

        _dbInjecter.injectProjectArticle("wood", "Project A", 10, 1.0, 0.5);

        _dbInjecter.injectTreeToProject("wood", "Adam", 6, timeOfPlanting, "Project A");

        PlantPageData plantPageData = PlantPageDataCreater.initializePlantPageData();
        plantPageData = PlantPageDataCreater.initializeProjectDataAndAddToPlantPageData(plantPageData, "Project A");
        plantPageData = PlantPageDataCreater.createPlantItemAndAddToPlantPageData(4, 100, "wood", "Project A",
                plantPageData);

        boolean validation = _plantPageDataValidator.isPlantPageDataValid(plantPageData);

        assertThat(validation).isTrue();
    }

    @Test
    public void testValidatePlantPageDataWithOneArticleAndAlreadyPlantedTreesToFalse() {
        Long timeOfPlanting = System.currentTimeMillis();
        _dbInjecter.injectTreeType("wood", "this is a wood", 0.5);

        _dbInjecter.injectUser("Adam");

        _dbInjecter.injectProject("Project A", "Adam", "this is a project", true, 0, 0);

        _dbInjecter.injectProjectArticle("wood", "Project A", 10, 1.0, 0.5);

        _dbInjecter.injectTreeToProject("wood", "Adam", 7, timeOfPlanting, "Project A");

        PlantPageData plantPageData = PlantPageDataCreater.initializePlantPageData();
        plantPageData = PlantPageDataCreater.initializeProjectDataAndAddToPlantPageData(plantPageData, "Project A");
        plantPageData = PlantPageDataCreater.createPlantItemAndAddToPlantPageData(4, 100, "wood", "Project A",
                plantPageData);

        boolean validation = _plantPageDataValidator.isPlantPageDataValid(plantPageData);

        assertThat(validation).isFalse();
    }

    @Test
    public void testValidatePlantPageDataWithNonExistingProject() {
        PlantPageData plantPageData = PlantPageDataCreater.initializePlantPageData();
        plantPageData = PlantPageDataCreater.initializeProjectDataAndAddToPlantPageData(plantPageData, "Project A");
        plantPageData = PlantPageDataCreater.createPlantItemAndAddToPlantPageData(4, 100, "wood", "Project A",
                plantPageData);

        boolean validation = _plantPageDataValidator.isPlantPageDataValid(plantPageData);

        assertThat(validation).isFalse();
    }

    @Test
    public void testValidatePlantPageDataWithNonActiveProject() {
        _dbInjecter.injectUser("Adam");
        _dbInjecter.injectProject("Project A", "Adam", "this is a project", false, 0, 0);

        PlantPageData plantPageData = PlantPageDataCreater.initializePlantPageData();
        plantPageData = PlantPageDataCreater.initializeProjectDataAndAddToPlantPageData(plantPageData, "Project A");
        plantPageData = PlantPageDataCreater.createPlantItemAndAddToPlantPageData(4, 100, "wood", "Project A",
                plantPageData);

        boolean validation = _plantPageDataValidator.isPlantPageDataValid(plantPageData);

        assertThat(validation).isFalse();
    }

    @Test
    public void testValidatePlantPageDataWithNonExistingArticle() {
        _dbInjecter.injectUser("Adam");
        _dbInjecter.injectProject("Project A", "Adam", "this is a project", true, 0, 0);

        PlantPageData plantPageData = PlantPageDataCreater.initializePlantPageData();
        plantPageData = PlantPageDataCreater.initializeProjectDataAndAddToPlantPageData(plantPageData, "Project A");
        plantPageData = PlantPageDataCreater.createPlantItemAndAddToPlantPageData(4, 100, "wood", "Project A",
                plantPageData);

        boolean validation = _plantPageDataValidator.isPlantPageDataValid(plantPageData);

        assertThat(validation).isFalse();
    }

}
