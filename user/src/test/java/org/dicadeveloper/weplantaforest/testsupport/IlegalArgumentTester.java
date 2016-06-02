package org.dicadeveloper.weplantaforest.testsupport;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.admin.codes.CartRepository;
import org.dicadeveloper.weplantaforest.image.ImageController;
import org.dicadeveloper.weplantaforest.image.ImageHelper;
import org.dicadeveloper.weplantaforest.planting.PlantPageController;
import org.dicadeveloper.weplantaforest.planting.PlantPageDataHelper;
import org.dicadeveloper.weplantaforest.planting.PlantPageDataValidator;
import org.dicadeveloper.weplantaforest.planting.SimplePlantPageController;
import org.dicadeveloper.weplantaforest.planting.SimplePlantPageDataHelper;
import org.dicadeveloper.weplantaforest.planting.SimplePlantPageDataValidator;
import org.dicadeveloper.weplantaforest.reports.co2.Co2Controller;
import org.dicadeveloper.weplantaforest.reports.projects.ProjectReportController;
import org.dicadeveloper.weplantaforest.reports.projects.ProjectReportRepository;
import org.dicadeveloper.weplantaforest.reports.rankings.RankingController;
import org.dicadeveloper.weplantaforest.reports.rankings.TreeRankedUserData;
import org.dicadeveloper.weplantaforest.support.CartToTreeListConverter;
import org.dicadeveloper.weplantaforest.support.PlantPageDataToCartConverter;
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
public class IlegalArgumentTester {

    @Autowired
    PlantPageDataHelper plantPageDataHelper;

    @Autowired
    SimplePlantPageDataHelper simplePlantPageDataHelper;

    @Autowired
    PlantPageDataToCartConverter plantPageDataToCartConverter;

    @Autowired
    ProjectReportRepository projectReportRepository;

    @Autowired
    CartRepository cartRepository;

    @Autowired
    PlantPageDataValidator plantPageDataValidator;

    @Autowired
    CartToTreeListConverter cartToTreeListConverter;

    @Autowired
    SimplePlantPageDataValidator simplePlantPageDataValidator;

    @Autowired
    ImageHelper imageHelper;

    @Test(expected = IllegalArgumentException.class)
    public void testFailedContructorForRankingController() {
        new RankingController(null);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testFailedContructorForProjectReportController() {
        new ProjectReportController(null, null);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testFailedContructorForProjectReportControllerOneNull() {
        new ProjectReportController(projectReportRepository, null);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testFailedContructorForCo2Controller() {
        new Co2Controller(null);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testFailedContructorForPlantPageControllerAllNulls() {
        new PlantPageController(null, null, null, null, null, null);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testFailedContructorForPlantPageControllerFiveNulls() {
        new PlantPageController(plantPageDataHelper, null, null, null, null, null);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testFailedContructorForPlantPageControllerFourNulls() {
        new PlantPageController(plantPageDataHelper, plantPageDataToCartConverter, null, null, null, null);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testFailedContructorForPlantPageControllerThreeNulls() {
        new PlantPageController(plantPageDataHelper, plantPageDataToCartConverter, cartRepository, null, null, null);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testFailedContructorForPlantPageControllerTwoNulls() {
        new PlantPageController(plantPageDataHelper, plantPageDataToCartConverter, cartRepository, plantPageDataValidator, null, null);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testFailedContructorForPlantPageControllerOneNull() {
        new PlantPageController(plantPageDataHelper, plantPageDataToCartConverter, cartRepository, plantPageDataValidator, cartToTreeListConverter, null);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testFailedContructorForSimplePlantPageControllerOnlyNulls() {
        new SimplePlantPageController(null, null, null, null, null, null);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testFailedContructorForSimplePlantPageControllerFiveNulls() {
        new SimplePlantPageController(simplePlantPageDataHelper, null, null, null, null, null);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testFailedContructorForSimplePlantPageControllerFourNulls() {
        new SimplePlantPageController(simplePlantPageDataHelper, plantPageDataToCartConverter, null, null, null, null);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testFailedContructorForSimplePlantPageControllerThreeNulls() {
        new SimplePlantPageController(simplePlantPageDataHelper, plantPageDataToCartConverter, cartRepository, null, null, null);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testFailedContructorForSimplePlantPageControllerTwoNulls() {
        new SimplePlantPageController(simplePlantPageDataHelper, plantPageDataToCartConverter, cartRepository, simplePlantPageDataValidator, null, null);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testFailedContructorForSimplePlantPageControllerOneNull() {
        new SimplePlantPageController(simplePlantPageDataHelper, plantPageDataToCartConverter, cartRepository, simplePlantPageDataValidator, cartToTreeListConverter, null);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testFailedContructorForTreeRankedUserDataTwoNulls() {
        new TreeRankedUserData(null, null);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testFailedContructorForTreeRankedUserDataOneNull() {
        new TreeRankedUserData("name", null);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testFailedAllArgsContructorForTreeRankedUserDataTwoNulls() {
        new TreeRankedUserData("name", null, null);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testFailedAllArgsContructorForTreeRankedUserDataThreeNulls() {
        new TreeRankedUserData(null, null, null);
    }
    
    @Test(expected = IllegalArgumentException.class)
    public void testFailedImageController() {
        new ImageController(null);
    }

}
