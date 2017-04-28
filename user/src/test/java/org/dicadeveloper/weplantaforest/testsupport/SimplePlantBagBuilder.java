package org.dicadeveloper.weplantaforest.testsupport;

import org.dicadeveloper.weplantaforest.planting.plantbag.SimplePlantBag;
import org.dicadeveloper.weplantaforest.planting.plantbag.SimplePlantBag.SimplePlantPageItem;

public class SimplePlantBagBuilder {

    private SimplePlantBag simplePlantBag = new SimplePlantBag();

    public SimplePlantBagBuilder createSimplePlantItemAndAddToSimplePlantBag(int amount, long price, String treeType, String projectName) {
        SimplePlantPageItem plantItem = new SimplePlantPageItem();
        plantItem.setAmount(amount);
        plantItem.setTreePrice(price);
        plantItem.setProjectName(projectName);
        plantItem.setTreeType(treeType);

        simplePlantBag.getPlantItems().add(plantItem);

        return this;
    }
    
    public SimplePlantBag build(){
        SimplePlantBag simplePlantBag = this.simplePlantBag;
        this.simplePlantBag = new SimplePlantBag();
        return simplePlantBag;
    }

}
