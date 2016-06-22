package org.dicadeveloper.weplantaforest.planting.plantbag;

import static org.assertj.core.api.Assertions.assertThat;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.planting.plantbag.SimplePlantBag.SimplePlantPageItem;
import org.dicadeveloper.weplantaforest.testsupport.PlantPageDataCreater;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = WeplantaforestApplication.class)
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class SimplePlantBagTest {

    @Test
    public void testGetPlantItemWithoutAddedPlantItems() {
        SimplePlantBag plantPageData = PlantPageDataCreater.initializeSimplePlantPageData();
        SimplePlantPageItem plantItemToCheck = new SimplePlantPageItem();

        boolean contains = plantPageData.containsPlantItem(plantItemToCheck);
        SimplePlantPageItem plantItem = plantPageData.getPlantItem(plantItemToCheck);

        assertThat(contains).isFalse();
        assertThat(plantItem).isNull();
    }

    @Test
    public void testGetPlantItemWithoutInitialisedPlantItemList() {
        SimplePlantBag plantPageData = new SimplePlantBag();
        SimplePlantPageItem plantItemToCheck = new SimplePlantPageItem();

        boolean contains = plantPageData.containsPlantItem(plantItemToCheck);
        SimplePlantPageItem plantItem = plantPageData.getPlantItem(plantItemToCheck);

        assertThat(contains).isFalse();
        assertThat(plantItem).isNull();
    }

    @Test
    public void testGetPlantItemWithoutAskedProjectInPlantItem() {
        SimplePlantBag plantPageData = PlantPageDataCreater.initializeSimplePlantPageData();
        plantPageData = PlantPageDataCreater.createSimplePlantItemAndAddToSimplePlantPageData(1, 100, "wood", "Project",
                plantPageData);

        SimplePlantPageItem plantItemToCheck = new SimplePlantPageItem();
        plantItemToCheck.setTreeType("wood");
        plantItemToCheck.setProjectName("other project");

        boolean contains = plantPageData.containsPlantItem(plantItemToCheck);
        SimplePlantPageItem plantItem = plantPageData.getPlantItem(plantItemToCheck);

        assertThat(contains).isFalse();
        assertThat(plantItem).isNull();
    }

    @Test
    public void testGetPlantItemWithoutAskedPriceInPlantItem() {
        SimplePlantBag plantPageData = PlantPageDataCreater.initializeSimplePlantPageData();
        plantPageData = PlantPageDataCreater.createSimplePlantItemAndAddToSimplePlantPageData(1, 100, "wood", "Project",
                plantPageData);

        SimplePlantPageItem plantItemToCheck = new SimplePlantPageItem();
        plantItemToCheck.setTreeType("wood");
        plantItemToCheck.setProjectName("Project");
        plantItemToCheck.setTreePrice(200);

        boolean contains = plantPageData.containsPlantItem(plantItemToCheck);
        SimplePlantPageItem plantItem = plantPageData.getPlantItem(plantItemToCheck);

        assertThat(contains).isFalse();
        assertThat(plantItem).isNull();
    }

}
