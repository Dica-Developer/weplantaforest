package org.dicadeveloper.weplantaforest.testsupport;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.admin.codes.CartRepository;
import org.dicadeveloper.weplantaforest.planting.PlantPageController;
import org.dicadeveloper.weplantaforest.planting.PlantPageDataHelper;
import org.dicadeveloper.weplantaforest.planting.SimplePlantPageController;
import org.dicadeveloper.weplantaforest.planting.SimplePlantPageDataHelper;
import org.dicadeveloper.weplantaforest.reports.co2.Co2Controller;
import org.dicadeveloper.weplantaforest.reports.projects.ProjectReportController;
import org.dicadeveloper.weplantaforest.reports.rankings.RankingController;
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
    CartRepository cartRepository;
    
    @Test(expected = IllegalArgumentException.class)
    public void testFailedContructorForRankingController() {
        new RankingController(null);
    }
    
    @Test(expected = IllegalArgumentException.class)
    public void testFailedContructorForProjectReportController() {
        new ProjectReportController(null);
    }
    
    @Test(expected = IllegalArgumentException.class)
    public void testFailedContructorForCo2Controller() {
        new Co2Controller(null);
    }
    
    @Test(expected = IllegalArgumentException.class)
    public void testFailedContructorForPlantPageControllerFourNulls() {        
        new PlantPageController(null, null, null, null);
    }
    
    @Test(expected = IllegalArgumentException.class)
    public void testFailedContructorForPlantPageControllerThreeNulls() {        
        new PlantPageController(plantPageDataHelper, null, null, null);
    }
    
    @Test(expected = IllegalArgumentException.class)
    public void testFailedContructorForPlantPageControllerTwoNulls() {        
        new PlantPageController(plantPageDataHelper, plantPageDataToCartConverter, null, null);
    }
    
    @Test(expected = IllegalArgumentException.class)
    public void testFailedContructorForPlantPageControllerOneNulls() {        
        new PlantPageController(plantPageDataHelper, plantPageDataToCartConverter, cartRepository, null);
    }
    
    @Test(expected = IllegalArgumentException.class)
    public void testFailedContructorForSimplePlantPageControllerFourNulls() {        
        new SimplePlantPageController(null, null, null, null);
    }
    
    @Test(expected = IllegalArgumentException.class)
    public void testFailedContructorForSimplePlantPageControllerThreeNulls() {        
        new SimplePlantPageController(simplePlantPageDataHelper, null, null, null);
    }
    
    @Test(expected = IllegalArgumentException.class)
    public void testFailedContructorForSimplePlantPageControllerTwoNulls() {        
        new SimplePlantPageController(simplePlantPageDataHelper, plantPageDataToCartConverter, null, null);
    }
    
    @Test(expected = IllegalArgumentException.class)
    public void testFailedContructorForSimplePlantPageControllerOneNulls() {        
        new SimplePlantPageController(simplePlantPageDataHelper, plantPageDataToCartConverter, cartRepository, null);
    }

}
