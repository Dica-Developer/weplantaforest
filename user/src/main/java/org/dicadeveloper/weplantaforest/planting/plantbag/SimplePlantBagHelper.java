package org.dicadeveloper.weplantaforest.planting.plantbag;

import java.util.ArrayList;
import java.util.List;

import org.dicadeveloper.weplantaforest.common.support.PriceHelper;
import org.dicadeveloper.weplantaforest.planting.plantbag.SimplePlantBag.SimplePlantPageItem;
import org.dicadeveloper.weplantaforest.projects.ProjectArticle;
import org.dicadeveloper.weplantaforest.projects.ProjectArticleRepository;
import org.dicadeveloper.weplantaforest.projects.ProjectRepository;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.dicadeveloper.weplantaforest.treetypes.TreeTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SimplePlantBagHelper extends AbstractPlantBagHelper {

    private SimplePlantBag simplePlantPageData;

    @Autowired
    protected SimplePlantBagHelper(ProjectRepository projectRepository,
            ProjectArticleRepository projectArticleRepository, TreeTypeRepository treeTypeRepository,
            TreeRepository treeRepository) {
        super(projectRepository, projectArticleRepository, treeTypeRepository, treeRepository);
    }

    public SimplePlantBag createPlantProposalForAmountOfTrees(long targetAmountOfTrees) {
        initialize(targetAmountOfTrees);
        ProjectArticle articleWithHighestMarge = findProjectArticleWithHighestMarge();
        addItemWithHighestMarge(articleWithHighestMarge);
        addFurtherItems();
        increaseAmountOfItemWithHighestMargeIfNeeded(articleWithHighestMarge);
        return simplePlantPageData;
    }
    
    public SimplePlantBag createPlantProposalForAmountOfTrees(String projectName, long targetAmountOfTrees) {
        initialize(projectName, targetAmountOfTrees);
        ProjectArticle articleWithHighestMarge = findProjectArticleWithHighestMarge();
        addItemWithHighestMarge(articleWithHighestMarge);
        addFurtherItems();
        increaseAmountOfItemWithHighestMargeIfNeeded(articleWithHighestMarge);
        return simplePlantPageData;
    }

    private void initialize(long targetAmountOfTrees) {
        simplePlantPageData = new SimplePlantBag();
        List<SimplePlantPageItem> simplePlantPageItems = new ArrayList<>();
        simplePlantPageData.setPlantItems(simplePlantPageItems);
        simplePlantPageData.setTargetAmountOfTrees(targetAmountOfTrees);
        projectArticles = createListOfAllAvailableProjectArticles();
    }

    private void initialize(String projectName, long targetAmountOfTrees) {
        simplePlantPageData = new SimplePlantBag();
        List<SimplePlantPageItem> simplePlantPageItems = new ArrayList<>();
        simplePlantPageData.setPlantItems(simplePlantPageItems);
        simplePlantPageData.setTargetAmountOfTrees(targetAmountOfTrees);
        projectArticles = createListOfAllAvailableProjectArticles(projectName);
    }

    private void addItemWithHighestMarge(ProjectArticle article) {
        long amountOfTreesForHighestMarge = (long) Math.round((simplePlantPageData.getTargetAmountOfTrees() * 0.7));

        SimplePlantPageItem itemWithHighestMarge = createPlantItemFromArticle(article);

        if (amountOfTreesForHighestMarge <= countTreesRemainingByThisArticle(article)) {
            itemWithHighestMarge.setAmount(amountOfTreesForHighestMarge);
        } else {
            long treesRemaining = countTreesRemainingByThisArticle(article);
            itemWithHighestMarge.setAmount(treesRemaining);
        }
        simplePlantPageData.addPlantItem(itemWithHighestMarge);
        projectArticles.remove(article);
    }

    private void increaseAmountOfItemWithHighestMargeIfNeeded(ProjectArticle article) {
        if (simplePlantPageData.getDiffToTargetAmount() > 0) {
            long diffTotargetAmount = simplePlantPageData.getDiffToTargetAmount();

            SimplePlantPageItem plantItemWithHighestMarge = simplePlantPageData.getPlantItems()
                                                                               .get(0);

            if ((plantItemWithHighestMarge.getAmount() + diffTotargetAmount) <= countTreesRemainingByThisArticle(
                    article)) {
                simplePlantPageData.increaseAmountOfPlantItem(plantItemWithHighestMarge, diffTotargetAmount);
            } else {
                long treesRemaining = countTreesRemainingByThisArticle(article);
                long increaseAmountBy = treesRemaining - plantItemWithHighestMarge.getAmount();
                simplePlantPageData.increaseAmountOfPlantItem(plantItemWithHighestMarge, increaseAmountBy);
            }
        }
    }

    private void addFurtherItems() {
        boolean treeCouldBeAdded = false;
        do {
            treeCouldBeAdded = false;
            for (ProjectArticle article : projectArticles) {
                if (simplePlantPageData.getDiffToTargetAmount() > 0) {
                    SimplePlantPageItem plantItemFromArticle = createPlantItemFromArticle(article);
                    if (simplePlantPageData.containsPlantItem(plantItemFromArticle)) {
                        SimplePlantPageItem plantItemFromList = simplePlantPageData.getPlantItem(plantItemFromArticle);
                        long itemAmount = plantItemFromList.getAmount();
                        if ((itemAmount + 1) <= countTreesRemainingByThisArticle(article)) {
                            simplePlantPageData.increaseAmountOfPlantItem(plantItemFromList, 1);
                            treeCouldBeAdded = true;
                        } else {
                            // do nothing
                        }
                    } else {
                        simplePlantPageData.addPlantItem(plantItemFromArticle);
                        treeCouldBeAdded = true;
                    }
                }
            }
        } while (treeCouldBeAdded);
    }

    private SimplePlantPageItem createPlantItemFromArticle(ProjectArticle article) {
        String treeType = article.getTreeType()
                                 .getName();
        long treePrice = PriceHelper.fromBigDecimalToLong(article.getPrice()
                                                                 .getAmount());
        String projectName = article.getProject()
                                    .getName();

        SimplePlantPageItem plantPageItem = new SimplePlantPageItem();
        plantPageItem.setTreePrice(treePrice);
        plantPageItem.setTreeType(treeType);
        plantPageItem.setProjectName(projectName);
        plantPageItem.setAmount(1);
        plantPageItem.setImageFile(article.getTreeType().getImageFile());
        return plantPageItem;
    }

}
