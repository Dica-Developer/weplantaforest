package org.dicadeveloper.weplantaforest.planting.plantbag;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

import java.util.List;

import org.dicadeveloper.weplantaforest.common.errorhandling.ErrorCodes;
import org.dicadeveloper.weplantaforest.common.errorhandling.IpatErrorInfo;
import org.dicadeveloper.weplantaforest.common.errorhandling.IpatException;
import org.dicadeveloper.weplantaforest.common.testsupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.dicadeveloper.weplantaforest.testsupport.PlantBagBuilder;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_CLASS)
public class PlantBagValidatorTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private DbInjecter _dbInjecter;

    @Autowired
    private PlantBagValidator _plantBagValidator;

    @Autowired
    private TreeRepository _treeRepository;

    static long timeOfPlanting;
    static boolean entitiesInjected = false;

    private PlantBagBuilder plantBagBuilder = new PlantBagBuilder();

    @Before
    public void setup() {
        if (!entitiesInjected) {
            timeOfPlanting = System.currentTimeMillis();

            _dbInjecter.injectUser("Adam");

            _dbInjecter.injectTreeType("wood", "this is a wood", 0.5);
            _dbInjecter.injectTreeType("doow", "this is a wood", 0.5);

            _dbInjecter.injectProject("Project A", "Adam", "this is a project", true, 0, 0);
            _dbInjecter.injectProject("Project B", "Adam", "this is a project", true, 0, 0);
            _dbInjecter.injectProject("Project C", "Adam", "this is a project", false, 0, 0);
            _dbInjecter.injectProject("Project D", "Adam", "this is a project", true, 0, 0);

            _dbInjecter.injectProjectArticle("wood", "Project A", 10, 1.0, 0.5);
            _dbInjecter.injectProjectArticle("doow", "Project A", 10, 1.0, 0.5);
            _dbInjecter.injectProjectArticle("wood", "Project B", 10, 1.0, 0.5);
            _dbInjecter.injectProjectArticle("doow", "Project B", 10, 1.0, 0.5);
            _dbInjecter.injectProjectArticle("wood", "Project C", 1, 1.0, 0.5);

            entitiesInjected = true;
        }
    }

    @After
    public void clear() {
        _treeRepository.deleteAll();
    }

    @Test
    public void testValidatePlantPageDataWithOneArticleToTrue() {
        PlantBag plantBag = plantBagBuilder.initializeProjectDataAndAddToPlantBag("Project A").createPlantItemAndAddToPlantBag(5, 100, "wood", "Project A").build();
        try {
            _plantBagValidator.validatePlantBag(plantBag);
        } catch (IpatException e) {
            String errorCode = e.getErrorInfos().get(0).getErrorCode();
            fail("plantBag should be valid\nerrorCode:" + errorCode);
        }
    }

    @Test
    public void testValidatePlantPageDataWithTwoArticlesToTrue() {
        PlantBag plantBag = plantBagBuilder.initializeProjectDataAndAddToPlantBag("Project A").createPlantItemAndAddToPlantBag(5, 100, "wood", "Project A")
                .createPlantItemAndAddToPlantBag(10, 100, "doow", "Project A").build();

        try {
            _plantBagValidator.validatePlantBag(plantBag);
        } catch (IpatException e) {
            String errorCode = e.getErrorInfos().get(0).getErrorCode();
            fail("plantBag should be valid\nerrorCode:" + errorCode);
        }
    }

    @Test
    public void testValidatePlantPageDataWithOneArticleToooManyTrees() {
        String project = "Project A";
        String treeType = "wood";
        Integer wantedToPlant = 11;
        Integer treesRemaining = 10;
        PlantBag plantBag = plantBagBuilder.initializeProjectDataAndAddToPlantBag(project).createPlantItemAndAddToPlantBag(wantedToPlant, 100, treeType, project).build();
        try {
            _plantBagValidator.validatePlantBag(plantBag);
        } catch (IpatException e) {
            List<IpatErrorInfo> errorInfos = e.getErrorInfos();
            assertEquals(1, errorInfos.size());

            IpatErrorInfo error = errorInfos.get(0);
            assertEquals(ErrorCodes.NOT_ENOUGH_TREES, error.getErrorCode());
            assertEquals(project, error.getErrorParams()[0]);
            assertEquals(treeType, error.getErrorParams()[1]);
            assertEquals(wantedToPlant.toString(), error.getErrorParams()[2]);
            assertEquals(treesRemaining.toString(), error.getErrorParams()[3]);
        }
    }

    @Test
    public void testValidatePlantPageDataWithTwoArticlesTooManyArticles() {
        String project = "Project A";
        String treeType = "wood";
        Integer wantedToPlant = 11;
        Integer treesRemaining = 10;
        PlantBag plantBag = plantBagBuilder.initializeProjectDataAndAddToPlantBag(project).createPlantItemAndAddToPlantBag(5, 100, "doow", project)
                .createPlantItemAndAddToPlantBag(wantedToPlant, 100, treeType, project).build();

        try {
            _plantBagValidator.validatePlantBag(plantBag);
        } catch (IpatException e) {
            List<IpatErrorInfo> errorInfos = e.getErrorInfos();
            assertEquals(1, errorInfos.size());

            IpatErrorInfo error = errorInfos.get(0);
            assertEquals(ErrorCodes.NOT_ENOUGH_TREES, error.getErrorCode());
            assertEquals(project, error.getErrorParams()[0]);
            assertEquals(treeType, error.getErrorParams()[1]);
            assertEquals(wantedToPlant.toString(), error.getErrorParams()[2]);
            assertEquals(treesRemaining.toString(), error.getErrorParams()[3]);
        }
    }

    @Test
    public void testValidatePlantPageDataWithTwoProjectsAndTwoArticlesToFalse() {
        Integer wantedToPlantB = 12;
        Integer wantedToPlantA = 15;
        Integer treesRemaining = 10;
        PlantBag plantBag = plantBagBuilder.initializeProjectDataAndAddToPlantBag("Project A").initializeProjectDataAndAddToPlantBag("Project B")
                .createPlantItemAndAddToPlantBag(15, 100, "wood", "Project A").createPlantItemAndAddToPlantBag(5, 100, "doow", "Project B").createPlantItemAndAddToPlantBag(6, 100, "wood", "Project B")
                .createPlantItemAndAddToPlantBag(wantedToPlantB, 100, "doow", "Project B").build();

        try {
            _plantBagValidator.validatePlantBag(plantBag);
        } catch (IpatException e) {
            List<IpatErrorInfo> errorInfos = e.getErrorInfos();
            assertEquals(2, errorInfos.size());

            IpatErrorInfo error = errorInfos.get(0);
            assertEquals(ErrorCodes.NOT_ENOUGH_TREES, error.getErrorCode());
            assertEquals("Project A", error.getErrorParams()[0]);
            assertEquals("wood", error.getErrorParams()[1]);
            assertEquals(wantedToPlantA.toString(), error.getErrorParams()[2]);
            assertEquals(treesRemaining.toString(), error.getErrorParams()[3]);

            error = errorInfos.get(1);
            assertEquals(ErrorCodes.NOT_ENOUGH_TREES, error.getErrorCode());
            assertEquals("Project B", error.getErrorParams()[0]);
            assertEquals("doow", error.getErrorParams()[1]);
            assertEquals(wantedToPlantB.toString(), error.getErrorParams()[2]);
            assertEquals(treesRemaining.toString(), error.getErrorParams()[3]);
        }

    }

    @Test
    public void testValidatePlantPageDataWithOneArticleAndAlreadyPlantedTreesToTrue() {
        _dbInjecter.injectTreeToProject("wood", "Adam", 6, timeOfPlanting, "Project A");

        PlantBag plantBag = plantBagBuilder.initializeProjectDataAndAddToPlantBag("Project A").createPlantItemAndAddToPlantBag(4, 100, "wood", "Project A").build();

        try {
            _plantBagValidator.validatePlantBag(plantBag);
        } catch (IpatException e) {
            String errorCode = e.getErrorInfos().get(0).getErrorCode();
            fail("plantBag should be valid\nerrorCode:" + errorCode);
        }
    }

    @Test
    public void testValidatePlantPageDataWithOneArticleAndAlreadyPlantedTreesToFalse() {
        _dbInjecter.injectTreeToProject("wood", "Adam", 7, timeOfPlanting, "Project A");

        Integer wantedToPlant = 4;
        Integer treesRemaining = 3;

        PlantBag plantBag = plantBagBuilder.initializeProjectDataAndAddToPlantBag("Project A").createPlantItemAndAddToPlantBag(wantedToPlant, 100, "wood", "Project A").build();

        try {
            _plantBagValidator.validatePlantBag(plantBag);
        } catch (IpatException e) {
            List<IpatErrorInfo> errorInfos = e.getErrorInfos();
            assertEquals(1, errorInfos.size());

            IpatErrorInfo error = errorInfos.get(0);
            assertEquals(ErrorCodes.NOT_ENOUGH_TREES, error.getErrorCode());
            assertEquals("Project A", error.getErrorParams()[0]);
            assertEquals("wood", error.getErrorParams()[1]);
            assertEquals(wantedToPlant.toString(), error.getErrorParams()[2]);
            assertEquals(treesRemaining.toString(), error.getErrorParams()[3]);
        }

    }

    @Test
    public void testValidatePlantPageDataWithNonExistingProject() {
        PlantBag plantBag = plantBagBuilder.initializeProjectDataAndAddToPlantBag("Project NonExisting").createPlantItemAndAddToPlantBag(4, 100, "wood", "Project NonExisting").build();

        try {
            _plantBagValidator.validatePlantBag(plantBag);
        } catch (IpatException e) {
            List<IpatErrorInfo> errorInfos = e.getErrorInfos();
            assertEquals(1, errorInfos.size());

            IpatErrorInfo error = errorInfos.get(0);
            assertEquals(ErrorCodes.PROJECT_DOES_NOT_EXISTS, error.getErrorCode());
            assertEquals("Project NonExisting", error.getErrorParams()[0]);
        }
    }

    @Test
    public void testValidatePlantPageDataWithNonActiveProject() {
        PlantBag plantBag = plantBagBuilder.initializeProjectDataAndAddToPlantBag("Project C").createPlantItemAndAddToPlantBag(4, 100, "wood", "Project C").build();

        try {
            _plantBagValidator.validatePlantBag(plantBag);
        } catch (IpatException e) {
            List<IpatErrorInfo> errorInfos = e.getErrorInfos();
            assertEquals(1, errorInfos.size());

            IpatErrorInfo error = errorInfos.get(0);
            assertEquals(ErrorCodes.PROJECT_NOT_ACTIVE, error.getErrorCode());
            assertEquals("Project C", error.getErrorParams()[0]);
        }

    }

    @Test
    public void testValidatePlantPageDataWithNonExistingArticle() {
        PlantBag plantBag = plantBagBuilder.initializeProjectDataAndAddToPlantBag("Project D").createPlantItemAndAddToPlantBag(4, 100, "wood", "Project D").build();

        try {
            _plantBagValidator.validatePlantBag(plantBag);
        } catch (IpatException e) {
            List<IpatErrorInfo> errorInfos = e.getErrorInfos();
            assertEquals(1, errorInfos.size());

            IpatErrorInfo error = errorInfos.get(0);
            assertEquals(ErrorCodes.ARTICLE_DOES_NOT_EXISTS, error.getErrorCode());
            assertEquals("Project D", error.getErrorParams()[0]);
            assertEquals("wood", error.getErrorParams()[1]);
        }

    }

}
