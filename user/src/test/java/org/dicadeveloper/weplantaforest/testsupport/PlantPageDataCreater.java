package org.dicadeveloper.weplantaforest.testsupport;

import java.util.HashMap;

import org.dicadeveloper.weplantaforest.planting.PlantItem;
import org.dicadeveloper.weplantaforest.planting.PlantPageData;
import org.dicadeveloper.weplantaforest.planting.ProjectData;

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

    public static PlantPageData createPlantItemAndAddToPlantPageData(int amount, double price, String plantItemName,
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

}
