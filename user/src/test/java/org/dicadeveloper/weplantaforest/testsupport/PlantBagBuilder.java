package org.dicadeveloper.weplantaforest.testsupport;

import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBag;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBag.ProjectData;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBag.ProjectData.PlantItem;

public class PlantBagBuilder {

    private PlantBag plantBag = new PlantBag();

    public PlantBagBuilder initializeProjectDataAndAddToPlantBag(String projectName) {
        ProjectData projectData = new ProjectData();
        plantBag.getProjects().put(projectName, projectData);
        return this;
    }

    public PlantBagBuilder createPlantItemAndAddToPlantBag(int amount, long price, String plantItemName, String projectName) {
        PlantItem plantItem = new PlantItem();
        plantItem.setAmount(amount);
        plantItem.setTreePrice(price);

        plantBag.getProjects().get(projectName).getPlantItems().put(plantItemName, plantItem);

        return this;
    }

    public PlantBag build() {
        PlantBag plantBag = this.plantBag;
        this.plantBag = new PlantBag();
        return plantBag;
    }

}
