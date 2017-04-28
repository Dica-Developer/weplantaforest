package org.dicadeveloper.weplantaforest.planting.plantbag;

import static org.assertj.core.api.Assertions.assertThat;

import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.dicadeveloper.weplantaforest.testsupport.SimplePlantBagBuilder;
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
public class SimplePlantBagValidatorTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private DbInjecter _dbInjecter;

    @Autowired
    private SimplePlantBagValidator _simplePlantPageDataValidator;

    @Autowired
    private TreeRepository _treeRepository;

    static long timeOfPlanting;
    static boolean entitiesInjected = false;

    SimplePlantBagBuilder plantBagBuilder = new SimplePlantBagBuilder();

    @Before
    public void setup() {
        if (!entitiesInjected) {
            timeOfPlanting = System.currentTimeMillis();

            _dbInjecter.injectUser("Adam");

            _dbInjecter.injectTreeType("wood", "this is a wood", 0.5);
            _dbInjecter.injectTreeType("doow", "this is a wood", 0.5);

            _dbInjecter.injectProject("Project A", "Adam", "this is a project", true, 0, 0);
            _dbInjecter.injectProject("Project B", "Adam", "this is a project", true, 0, 0);

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
        SimplePlantBag plantBag = plantBagBuilder.createSimplePlantItemAndAddToSimplePlantBag(5, 100, "wood", "Project A")
                                                 .build();

        boolean validation = _simplePlantPageDataValidator.isPlantPageDataValid(plantBag);

        assertThat(validation).isTrue();
    }

    @Test
    public void testValidatePlantPageDataWithTwoArticlesToTrue() {
        SimplePlantBag plantBag = plantBagBuilder.createSimplePlantItemAndAddToSimplePlantBag(5, 100, "wood", "Project A")
                                                 .createSimplePlantItemAndAddToSimplePlantBag(10, 100, "doow", "Project A")
                                                 .build();

        boolean validation = _simplePlantPageDataValidator.isPlantPageDataValid(plantBag);

        assertThat(validation).isTrue();
    }

    @Test
    public void testValidatePlantPageDataWithOneArticleToFalse() {
        SimplePlantBag plantBag = plantBagBuilder.createSimplePlantItemAndAddToSimplePlantBag(11, 100, "wood", "Project A")
                                                 .build();

        boolean validation = _simplePlantPageDataValidator.isPlantPageDataValid(plantBag);

        assertThat(validation).isFalse();
    }

    @Test
    public void testValidatePlantPageDataWithTwoArticlesToFalse() {
        SimplePlantBag plantBag = plantBagBuilder.createSimplePlantItemAndAddToSimplePlantBag(5, 100, "wood", "Project A")
                                                 .createSimplePlantItemAndAddToSimplePlantBag(11, 100, "wood", "Project A")
                                                 .build();

        boolean validation = _simplePlantPageDataValidator.isPlantPageDataValid(plantBag);

        assertThat(validation).isFalse();
    }

    @Test
    public void testValidatePlantPageDataWithTwoProjectsAndTwoArticlesToFalse() {
        SimplePlantBag plantBag = plantBagBuilder.createSimplePlantItemAndAddToSimplePlantBag(5, 100, "wood", "Project A")
                                                 .createSimplePlantItemAndAddToSimplePlantBag(6, 100, "wood", "Project A")
                                                 .createSimplePlantItemAndAddToSimplePlantBag(12, 100, "wood", "Project A")
                                                 .build();

        boolean validation = _simplePlantPageDataValidator.isPlantPageDataValid(plantBag);

        assertThat(validation).isFalse();
    }

    @Test
    public void testValidatePlantPageDataWithOneArticleAndAlreadyPlantedTreesToTrue() {
        _dbInjecter.injectTreeToProject("wood", "Adam", 6, timeOfPlanting, "Project A");

        SimplePlantBag plantBag = plantBagBuilder.createSimplePlantItemAndAddToSimplePlantBag(4, 100, "wood", "Project A")
                                                 .build();

        boolean validation = _simplePlantPageDataValidator.isPlantPageDataValid(plantBag);

        assertThat(validation).isTrue();
    }

    @Test
    public void testValidatePlantPageDataWithOneArticleAndAlreadyPlantedTreesToFalse() {
        _dbInjecter.injectTreeToProject("wood", "Adam", 7, timeOfPlanting, "Project A");

        SimplePlantBag plantPageData = plantBagBuilder.createSimplePlantItemAndAddToSimplePlantBag(4, 100, "wood", "Project A").build();

        boolean validation = _simplePlantPageDataValidator.isPlantPageDataValid(plantPageData);

        assertThat(validation).isFalse();
    }

    @Test
    public void testValidatePlantPageDataWithNonExistingProject() {
        SimplePlantBag plantPageData = plantBagBuilder.createSimplePlantItemAndAddToSimplePlantBag(4, 100, "wood", "Project D").build();

        boolean validation = _simplePlantPageDataValidator.isPlantPageDataValid(plantPageData);

        assertThat(validation).isFalse();
    }

    @Test
    public void testValidatePlantPageDataWithNonActiveProject() {
        _dbInjecter.injectProject("Project E", "Adam", "this is a project", false, 0, 0);

        SimplePlantBag plantPageData = plantBagBuilder.createSimplePlantItemAndAddToSimplePlantBag(4, 100, "wood", "Project E").build();

        boolean validation = _simplePlantPageDataValidator.isPlantPageDataValid(plantPageData);

        assertThat(validation).isFalse();
    }

    @Test
    public void testValidatePlantPageDataWithNonExistingArticle() {
        _dbInjecter.injectProject("Project F", "Adam", "this is a project", true, 0, 0);

        SimplePlantBag plantPageData = plantBagBuilder.createSimplePlantItemAndAddToSimplePlantBag(4, 100, "wood", "Project F").build();

        boolean validation = _simplePlantPageDataValidator.isPlantPageDataValid(plantPageData);

        assertThat(validation).isFalse();
    }

}
