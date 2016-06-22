package org.dicadeveloper.weplantaforest.testsupport;

import java.util.ArrayList;
import java.util.HashMap;

import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBag;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBag.ProjectData;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBag.ProjectData.PlantItem;
import org.dicadeveloper.weplantaforest.planting.plantbag.SimplePlantBag;
import org.dicadeveloper.weplantaforest.planting.plantbag.SimplePlantBag.SimplePlantPageItem;

public class PlantPageDataCreater {

    public static PlantBag initializePlantPageData() {
        PlantBag plantPageData = new PlantBag();
        plantPageData.setProjects(new HashMap<String, ProjectData>());
        return plantPageData;
    }

    public static PlantBag initializeProjectDataAndAddToPlantPageData(PlantBag plantPageData,
            String projectName) {
        ProjectData projectData = new ProjectData();
        projectData.setPlantItems(new HashMap<String, PlantItem>());
        plantPageData.getProjects()
                     .put(projectName, projectData);
        return plantPageData;
    }

    public static PlantBag createPlantItemAndAddToPlantPageData(int amount, long price, String plantItemName,
            String projectName, PlantBag plantPageData) {
        PlantItem plantItem = new PlantItem();
        plantItem.setAmount(amount);
        plantItem.setTreePrice(price);

        plantPageData.getProjects()
                     .get(projectName)
                     .getPlantItems()
                     .put(plantItemName, plantItem);

        return plantPageData;
    }

    public static SimplePlantBag initializeSimplePlantPageData() {
        SimplePlantBag plantPageData = new SimplePlantBag();
        plantPageData.setPlantItems(new ArrayList<>());
        return plantPageData;
    }

    public static SimplePlantBag createSimplePlantItemAndAddToSimplePlantPageData(int amount, long price,
            String treeType, String projectName, SimplePlantBag plantPageData) {
        SimplePlantPageItem plantItem = new SimplePlantPageItem();
        plantItem.setAmount(amount);
        plantItem.setTreePrice(price);
        plantItem.setProjectName(projectName);
        plantItem.setTreeType(treeType);

        plantPageData.getPlantItems()
                     .add(plantItem);

        return plantPageData;
    }

}
