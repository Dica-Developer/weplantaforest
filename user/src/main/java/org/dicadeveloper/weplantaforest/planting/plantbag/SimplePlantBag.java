package org.dicadeveloper.weplantaforest.planting.plantbag;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SimplePlantBag {
    long targetAmountOfTrees;
    long actualAmountOfTrees;

    long actualPrice;

    List<SimplePlantPageItem> plantItems = new ArrayList<>();

    protected long getDiffToTargetAmount() {
        calcAndSetActualAmountOfTrees();
        return targetAmountOfTrees - actualAmountOfTrees;
    }

    protected boolean containsPlantItem(SimplePlantPageItem plantItemToCheck) {
        boolean contains = false;

        if (null != getPlantItems()) {
            for (SimplePlantPageItem plantPageItem : getPlantItems()) {
                if (plantPageItem.getTreeType()
                                 .equals(plantItemToCheck.getTreeType())
                        && plantPageItem.getProjectName()
                                        .equals(plantItemToCheck.getProjectName())
                        && plantPageItem.getTreePrice() == plantItemToCheck.getTreePrice()) {
                    contains = true;
                }
            }
        }
        return contains;
    }

    protected void addPlantItem(SimplePlantPageItem plantItem) {
        getPlantItems().add(plantItem);
        calcAndSetActualAmountOfTrees();
        calcAndSetPrice();
    }

    protected void increaseAmountOfPlantItem(SimplePlantPageItem plantItem, long toIncrease) {
        long amountNow = plantItem.getAmount() + toIncrease;
        getPlantItem(plantItem).setAmount(amountNow);
        calcAndSetActualAmountOfTrees();
        calcAndSetPrice();
    }

    protected SimplePlantPageItem getPlantItem(SimplePlantPageItem plantItemToGet) {
        if (null != getPlantItems()) {
            for (SimplePlantPageItem plantPageItem : getPlantItems()) {
                if (plantPageItem.getTreeType()
                                 .equals(plantItemToGet.getTreeType())
                        && plantPageItem.getProjectName()
                                        .equals(plantItemToGet.getProjectName())
                        && plantPageItem.getTreePrice() == plantItemToGet.getTreePrice()) {
                    return plantPageItem;
                }
            }
        }
        return null;
    }

    private void calcAndSetActualAmountOfTrees() {
        long actualAmountOfTrees = 0;
        for (SimplePlantPageItem plantPageItem : getPlantItems()) {
            actualAmountOfTrees += plantPageItem.getAmount();
        }
        this.actualAmountOfTrees = actualAmountOfTrees;
    }

    private void calcAndSetPrice() {
        long price = 0;
        for (SimplePlantPageItem plantPageItem : getPlantItems()) {
            price += plantPageItem.getTreePrice() * plantPageItem.getAmount();
        }
        this.actualPrice = price;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class SimplePlantPageItem {

        String treeType;

        long amount;

        long treePrice;

        String projectName;
        
        String imageFile;

    }

}
