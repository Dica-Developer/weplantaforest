package org.dicadeveloper.weplantaforest.planting;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SimplePlantPageData {

    long targetAmountOfTrees;
    long actualAmountOfTrees;

    long price;

    List<SimplePlantPageItem> plantItems;

    protected long calcActualAmountOfTrees() {
        long amount = 0;
        for (SimplePlantPageItem plantPageItem : getPlantItems()) {
            amount = amount + plantPageItem.getAmount();
        }
        return amount;
    }

    protected long calcPrice() {
        long price = 0;
        for (SimplePlantPageItem plantPageItem : getPlantItems()) {
            price = price + plantPageItem.getTreePrice() * plantPageItem.getAmount();
        }
        return price;
    }

    protected boolean containsPlantItem(String treeType, long treePrice, String projectName) {
        boolean contains = false;

        if (null != plantItems) {
            for (SimplePlantPageItem plantPageItem : plantItems) {
                if (plantPageItem.getTreeType()
                                 .equals(treeType)
                        && plantPageItem.getProjectName()
                                        .equals(projectName)
                        && plantPageItem.getTreePrice() == treePrice) {
                    contains = true;
                }
            }
        }
        return contains;
    }

    protected SimplePlantPageItem getPlantPageItem(String treeType, long treePrice, String projectName) {
        for (SimplePlantPageItem plantPageItem : getPlantItems()) {
            if (plantPageItem.getTreeType()
                             .equals(treeType)
                    && plantPageItem.getProjectName()
                                    .equals(projectName)
                    && plantPageItem.getTreePrice() == treePrice) {
                return plantPageItem;
            }
        }
        return null;
    }

}
