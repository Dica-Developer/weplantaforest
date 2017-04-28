package org.dicadeveloper.weplantaforest.planting.plantbag;

import static org.assertj.core.api.Assertions.assertThat;

import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
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
    private PlantBagValidator _plantPageDataValidator;

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

            entitiesInjected = true;
        }
    }

    @After
    public void clear() {
        _treeRepository.deleteAll();
    }

    @Test
    public void testValidatePlantPageDataWithOneArticleToTrue() {
        PlantBag plantBag = plantBagBuilder.initializeProjectDataAndAddToPlantBag("Project A")
                                           .createPlantItemAndAddToPlantBag(5, 100, "wood", "Project A")
                                           .build();

        boolean validation = _plantPageDataValidator.isPlantPageDataValid(plantBag);

        assertThat(validation).isTrue();
    }

//    @Test
//    public void testValidatePlantPageDataWithOneArticleToTruee() {
//        PlantBag plantBag = plantBagBuilder.initializeProjectDataAndAddToPlantBag("Project A")
//                                           .createPlantItemAndAddToPlantBag(5, 100, "wood", "Project A")
//                                           .build();
//        List<IpatErrorInfo> errorInfos = _plantPageDataValidator.validatePlantBag(plantBag);
//
//        assertEquals(0, errorInfos.size());
//    }

    @Test
    public void testValidatePlantPageDataWithTwoArticlesToTrue() {
        PlantBag plantBag = plantBagBuilder.initializeProjectDataAndAddToPlantBag("Project A")
                                           .createPlantItemAndAddToPlantBag(5, 100, "wood", "Project A")
                                           .createPlantItemAndAddToPlantBag(10, 100, "doow", "Project A")
                                           .build();
        boolean validation = _plantPageDataValidator.isPlantPageDataValid(plantBag);

        assertThat(validation).isTrue();
    }

//    @Test
//    public void testValidatePlantPageDataWithTwoArticlesToTruee() {
//        PlantBag plantBag = plantBagBuilder.initializeProjectDataAndAddToPlantBag("Project A")
//                                           .createPlantItemAndAddToPlantBag(5, 100, "wood", "Project A")
//                                           .createPlantItemAndAddToPlantBag(10, 100, "doow", "Project A")
//                                           .build();
//
//        List<IpatErrorInfo> errorInfos = _plantPageDataValidator.validatePlantBag(plantBag);
//        assertEquals(0, errorInfos.size());
//    }

    @Test
    public void plantBag() {
        PlantBag plantBag = plantBagBuilder.initializeProjectDataAndAddToPlantBag("Project A")
                                           .createPlantItemAndAddToPlantBag(11, 100, "wood", "Project A")
                                           .build();
        boolean validation = _plantPageDataValidator.isPlantPageDataValid(plantBag);
        assertThat(validation).isFalse();
    }

//    @Test
//    public void testValidatePlantPageDataWithOneArticleToooManyTrees() {
//        String project = "Project A";
//        String treeType = "wood";
//        Integer wantedToPlant = 11;
//        Integer treesRemaining = 10;
//        PlantBag plantBag = plantBagBuilder.initializeProjectDataAndAddToPlantBag(project)
//                                           .createPlantItemAndAddToPlantBag(wantedToPlant, 100, treeType, project)
//                                           .build();
//
//        List<IpatErrorInfo> errorInfos = _plantPageDataValidator.validatePlantBag(plantBag);
//        assertEquals(1, errorInfos.size());
//
//        IpatErrorInfo error = errorInfos.get(0);
//        assertEquals(ErrorCodes.NOT_ENOUGH_TREES, error.getErrorCode());
//        assertEquals(project, error.getErrorParams()[0]);
//        assertEquals(treeType, error.getErrorParams()[1]);
//        assertEquals(wantedToPlant.toString(), error.getErrorParams()[2]);
//        assertEquals(treesRemaining.toString(), error.getErrorParams()[3]);
//    }

    @Test
    public void testValidatePlantPageDataWithTwoArticlesToFalse() {
        PlantBag plantBag = plantBagBuilder.initializeProjectDataAndAddToPlantBag("Project A")
                                           .createPlantItemAndAddToPlantBag(5, 100, "wood", "Project A")
                                           .createPlantItemAndAddToPlantBag(11, 100, "wood", "Project A")
                                           .build();
        boolean validation = _plantPageDataValidator.isPlantPageDataValid(plantBag);
        assertThat(validation).isFalse();
    }

//    @Test
//    public void testValidatePlantPageDataWithTwoArticlesTooManyArticles() {
//        String project = "Project A";
//        String treeType = "wood";
//        Integer wantedToPlant = 11;
//        Integer treesRemaining = 10;
//        PlantBag plantBag = plantBagBuilder.initializeProjectDataAndAddToPlantBag(project)
//                                           .createPlantItemAndAddToPlantBag(5, 100, "doow", project)
//                                           .createPlantItemAndAddToPlantBag(wantedToPlant, 100, treeType, project)
//                                           .build();
//
//        List<IpatErrorInfo> errorInfos = _plantPageDataValidator.validatePlantBag(plantBag);
//        assertEquals(1, errorInfos.size());
//
//        IpatErrorInfo error = errorInfos.get(0);
//        assertEquals(ErrorCodes.NOT_ENOUGH_TREES, error.getErrorCode());
//        assertEquals(project, error.getErrorParams()[0]);
//        assertEquals(treeType, error.getErrorParams()[1]);
//        assertEquals(wantedToPlant.toString(), error.getErrorParams()[2]);
//        assertEquals(treesRemaining.toString(), error.getErrorParams()[3]);
//    }

    @Test
    public void testValidatePlantPageDataWithTwoProjectsAndTwoArticlesToFalse() {
        PlantBag plantBag = plantBagBuilder.initializeProjectDataAndAddToPlantBag("Project A")
                                           .createPlantItemAndAddToPlantBag(0, 100, "wood", "Project A")
                                           .createPlantItemAndAddToPlantBag(5, 100, "wood", "Project A")
                                           .createPlantItemAndAddToPlantBag(6, 100, "wood", "Project A")
                                           .createPlantItemAndAddToPlantBag(12, 100, "wood", "Project A")
                                           .build();

        boolean validation = _plantPageDataValidator.isPlantPageDataValid(plantBag);

        assertThat(validation).isFalse();
    }

    @Test
    public void testValidatePlantPageDataWithOneArticleAndAlreadyPlantedTreesToTrue() {
        _dbInjecter.injectTreeToProject("wood", "Adam", 6, timeOfPlanting, "Project A");

        PlantBag plantBag = plantBagBuilder.initializeProjectDataAndAddToPlantBag("Project A")
                                           .createPlantItemAndAddToPlantBag(4, 100, "wood", "Project A")
                                           .build();

        boolean validation = _plantPageDataValidator.isPlantPageDataValid(plantBag);

        assertThat(validation).isTrue();
    }

    @Test
    public void testValidatePlantPageDataWithOneArticleAndAlreadyPlantedTreesToFalse() {
        _dbInjecter.injectTreeToProject("wood", "Adam", 7, timeOfPlanting, "Project A");

        PlantBag plantBag = plantBagBuilder.initializeProjectDataAndAddToPlantBag("Project A")
                                           .createPlantItemAndAddToPlantBag(4, 100, "wood", "Project A")
                                           .build();

        boolean validation = _plantPageDataValidator.isPlantPageDataValid(plantBag);

        assertThat(validation).isFalse();
    }

    @Test
    public void testValidatePlantPageDataWithNonExistingProject() {
        PlantBag plantBag = plantBagBuilder.initializeProjectDataAndAddToPlantBag("Project NonExisting")
                                           .createPlantItemAndAddToPlantBag(4, 100, "wood", "Project NonExisting")
                                           .build();

        boolean validation = _plantPageDataValidator.isPlantPageDataValid(plantBag);

        assertThat(validation).isFalse();
    }

    @Test
    public void testValidatePlantPageDataWithNonActiveProject() {
        PlantBag plantPageData = plantBagBuilder.initializeProjectDataAndAddToPlantBag("Project C")
                                                .createPlantItemAndAddToPlantBag(4, 100, "wood", "Project C")
                                                .build();

        boolean validation = _plantPageDataValidator.isPlantPageDataValid(plantPageData);

        assertThat(validation).isFalse();
    }

    @Test
    public void testValidatePlantPageDataWithNonExistingArticle() {
        PlantBag plantPageData = plantBagBuilder.initializeProjectDataAndAddToPlantBag("Project D")
                                                .createPlantItemAndAddToPlantBag(4, 100, "wood", "Project D")
                                                .build();

        boolean validation = _plantPageDataValidator.isPlantPageDataValid(plantPageData);

        assertThat(validation).isFalse();
    }

}
