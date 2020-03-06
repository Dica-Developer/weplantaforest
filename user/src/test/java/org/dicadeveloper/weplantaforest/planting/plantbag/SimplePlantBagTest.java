package org.dicadeveloper.weplantaforest.planting.plantbag;

import static org.assertj.core.api.Assertions.assertThat;

import org.dicadeveloper.weplantaforest.planting.plantbag.SimplePlantBag.SimplePlantPageItem;
import org.dicadeveloper.weplantaforest.testsupport.SimplePlantBagBuilder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class SimplePlantBagTest {

    SimplePlantBagBuilder plantBagBuilder = new SimplePlantBagBuilder();

    @Test
    public void testGetPlantItemWithoutAddedPlantItems() {
        SimplePlantBag plantBag = plantBagBuilder.build();
        SimplePlantPageItem plantItemToCheck = new SimplePlantPageItem();

        boolean contains = plantBag.containsPlantItem(plantItemToCheck);
        SimplePlantPageItem plantItem = plantBag.getPlantItem(plantItemToCheck);

        assertThat(contains).isFalse();
        assertThat(plantItem).isNull();
    }

    @Test
    public void testGetPlantItemWithoutInitialisedPlantItemList() {
        SimplePlantBag plantBag = new SimplePlantBag();
        SimplePlantPageItem plantItemToCheck = new SimplePlantPageItem();

        boolean contains = plantBag.containsPlantItem(plantItemToCheck);
        SimplePlantPageItem plantItem = plantBag.getPlantItem(plantItemToCheck);

        assertThat(contains).isFalse();
        assertThat(plantItem).isNull();
    }

    @Test
    public void testGetPlantItemWithoutAskedProjectInPlantItem() {
        SimplePlantBag plantBag = plantBagBuilder.createSimplePlantItemAndAddToSimplePlantBag(1, 100, "wood", "Project").build();

        SimplePlantPageItem plantItemToCheck = new SimplePlantPageItem();
        plantItemToCheck.setTreeType("wood");
        plantItemToCheck.setProjectName("other project");

        boolean contains = plantBag.containsPlantItem(plantItemToCheck);
        SimplePlantPageItem plantItem = plantBag.getPlantItem(plantItemToCheck);

        assertThat(contains).isFalse();
        assertThat(plantItem).isNull();
    }

    @Test
    public void testGetPlantItemWithoutAskedPriceInPlantItem() {
        SimplePlantBag plantBag = plantBagBuilder.createSimplePlantItemAndAddToSimplePlantBag(1, 100, "wood", "Project").build();

        SimplePlantPageItem plantItemToCheck = new SimplePlantPageItem();
        plantItemToCheck.setTreeType("wood");
        plantItemToCheck.setProjectName("Project");
        plantItemToCheck.setTreePrice(200);

        boolean contains = plantBag.containsPlantItem(plantItemToCheck);
        SimplePlantPageItem plantItem = plantBag.getPlantItem(plantItemToCheck);

        assertThat(contains).isFalse();
        assertThat(plantItem).isNull();
    }

}
