package org.dicadeveloper.weplantaforest.testsupport;

import java.util.ArrayList;
import java.util.HashMap;

import org.dicadeveloper.weplantaforest.planting.plantbag.PlantPageData;
import org.dicadeveloper.weplantaforest.planting.plantbag.SimplePlantPageData;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantPageData.ProjectData;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantPageData.ProjectData.PlantItem;
import org.dicadeveloper.weplantaforest.planting.plantbag.SimplePlantPageData.SimplePlantPageItem;

public class PlantPageDataCreater {

    public static PlantPageData initializePlantPageData() {
        PlantPageData plantPageData = new PlantPageData();
        plantPageData.setProjects(new HashMap<String, ProjectData>());
        return plantPageData;
    }

    public static PlantPageData initializeProjectDataAndAddToPlantPageData(PlantPageData plantPageData,
            String projectName) {
        ProjectData projectData = new ProjectData();
        projectData.setPlantItems(new HashMap<String, PlantItem>());
        plantPageData.getProjects()
                     .put(projectName, projectData);
        return plantPageData;
    }

    public static PlantPageData createPlantItemAndAddToPlantPageData(int amount, long price, String plantItemName,
            String projectName, PlantPageData plantPageData) {
        PlantItem plantItem = new PlantItem();
        plantItem.setAmount(amount);
        plantItem.setTreePrice(price);

        plantPageData.getProjects()
                     .get(projectName)
                     .getPlantItems()
                     .put(plantItemName, plantItem);

        return plantPageData;
    }

    public static SimplePlantPageData initializeSimplePlantPageData() {
        SimplePlantPageData plantPageData = new SimplePlantPageData();
        plantPageData.setPlantItems(new ArrayList<>());
        return plantPageData;
    }

    public static SimplePlantPageData createSimplePlantItemAndAddToSimplePlantPageData(int amount, long price,
            String treeType, String projectName, SimplePlantPageData plantPageData) {
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
