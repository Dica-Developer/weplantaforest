package org.dicadeveloper.weplantaforest.planting;

import java.util.ArrayList;
import java.util.List;

import org.dicadeveloper.weplantaforest.common.support.PriceHelper;
import org.dicadeveloper.weplantaforest.projects.ProjectArticle;
import org.dicadeveloper.weplantaforest.projects.ProjectArticleRepository;
import org.dicadeveloper.weplantaforest.projects.ProjectRepository;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.dicadeveloper.weplantaforest.treetypes.TreeTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PlantPageTreeHelper extends AbstractPlantPageHelper {

    private SimplePlantPageData simplePlantPageData;

    @Autowired
    protected PlantPageTreeHelper(ProjectRepository projectRepository,
            ProjectArticleRepository projectArticleRepository, TreeTypeRepository treeTypeRepository,
            TreeRepository treeRepository) {
        super(projectRepository, projectArticleRepository, treeTypeRepository, treeRepository);
    }

    protected SimplePlantPageData createPlantProposalForAmountOfTrees(long targetAmountOfTrees) {
        initialize(targetAmountOfTrees);

        ProjectArticle articleWithHighestMarge = findProjectArticleWithHighestMarge();
        addItemWithHighestMarge(articleWithHighestMarge, targetAmountOfTrees);
        addFurtherItems();
        increaseAmountOfItemWithHighestMargeIfNeeded(articleWithHighestMarge);
        return simplePlantPageData;
    }

    private void initialize(long targetAmountOfTrees) {
        simplePlantPageData = new SimplePlantPageData();
        List<SimplePlantPageItem> simplePlantPageItems = new ArrayList<>();
        simplePlantPageData.setPlantItems(simplePlantPageItems);
        simplePlantPageData.setTargetAmountOfTrees(targetAmountOfTrees);
        projectArticles = createListOfAllAvailableProjectArticles();
    }

    private void addItemWithHighestMarge(ProjectArticle article, long targetAmountOfTrees) {
        long treePriceForHighestMarge = PriceHelper.fromBigDecimalToLong(article.getPrice()
                                                                                .getAmount());
        long amountOfTreesForHighestMarge = (long) Math.round((targetAmountOfTrees * 0.7));
        String treeTypeForHighestMarge = article.getTreeType()
                                                .getName();
        String projectNameForHighestMarge = article.getProject()
                                                   .getName();

        SimplePlantPageItem itemWithHighestMarge = createPlantItem(treePriceForHighestMarge, treeTypeForHighestMarge,
                projectNameForHighestMarge);

        if (amountOfTreesForHighestMarge <= countTreesRemainingByThisArticle(article)) {
            itemWithHighestMarge.setAmount(amountOfTreesForHighestMarge);
        } else {
            long treesRemaining = countTreesRemainingByThisArticle(article);
            itemWithHighestMarge.setAmount(treesRemaining);
        }
        simplePlantPageData.getPlantItems()
                           .add(itemWithHighestMarge);
        simplePlantPageData.setActualAmountOfTrees(simplePlantPageData.calcActualAmountOfTrees());
        simplePlantPageData.setPrice(simplePlantPageData.calcPrice());

        projectArticles.remove(article);
    }

    private void increaseAmountOfItemWithHighestMargeIfNeeded(ProjectArticle article) {
        if (simplePlantPageData.calcActualAmountOfTrees() < simplePlantPageData.getTargetAmountOfTrees()) {
            long diffTotargetAmount = simplePlantPageData.getTargetAmountOfTrees()
                    - simplePlantPageData.calcActualAmountOfTrees();

            if ((simplePlantPageData.getPlantItems()
                                    .get(0)
                                    .getAmount()
                    + diffTotargetAmount) <= countTreesRemainingByThisArticle(article)) {
                simplePlantPageData.getPlantItems()
                                   .get(0)
                                   .setAmount(simplePlantPageData.getPlantItems()
                                                                 .get(0)
                                                                 .getAmount()
                                           + diffTotargetAmount);
            } else {
                long treesRemaining = countTreesRemainingByThisArticle(article);
                simplePlantPageData.getPlantItems()
                                   .get(0)
                                   .setAmount(treesRemaining);
            }
        }

        simplePlantPageData.setActualAmountOfTrees(simplePlantPageData.calcActualAmountOfTrees());
        simplePlantPageData.setPrice(simplePlantPageData.calcPrice());
    }

    private void addFurtherItems() {
        boolean treeCouldBeAdded = false;
        do {
            treeCouldBeAdded = false;
            for (ProjectArticle article : projectArticles) {
                if (simplePlantPageData.calcActualAmountOfTrees() < simplePlantPageData.getTargetAmountOfTrees()) {

                    String treeType = article.getTreeType()
                                             .getName();
                    long treePrice = PriceHelper.fromBigDecimalToLong(article.getPrice()
                                                                             .getAmount());
                    String projectName = article.getProject()
                                                .getName();
                    if (simplePlantPageData.containsPlantItem(treeType, treePrice, projectName)) {
                        SimplePlantPageItem plantPageItem = simplePlantPageData.getPlantPageItem(treeType, treePrice,
                                projectName);
                        long itemAmount = plantPageItem.getAmount();
                        if ((itemAmount + 1) <= countTreesRemainingByThisArticle(article)) {
                            plantPageItem.setAmount(itemAmount + 1);
                            treeCouldBeAdded = true;
                        } else {
                            //do nothing
                        }

                    } else {
                        if (1 <= countTreesRemainingByThisArticle(article)) {
                            SimplePlantPageItem plantPageItem = createPlantItem(treePrice, treeType, projectName);
                            simplePlantPageData.getPlantItems()
                                               .add(plantPageItem);
                            treeCouldBeAdded = true;
                        } else {
                            //do nothing
                        }
                    }
                }
            }
        } while (treeCouldBeAdded);
        simplePlantPageData.setActualAmountOfTrees(simplePlantPageData.calcActualAmountOfTrees());
        simplePlantPageData.setPrice(simplePlantPageData.calcPrice());
    }

    private SimplePlantPageItem createPlantItem(long treePrice, String treeType, String projectName) {
        SimplePlantPageItem plantPageItem = new SimplePlantPageItem();
        plantPageItem.setTreePrice(treePrice);
        plantPageItem.setTreeType(treeType);
        plantPageItem.setProjectName(projectName);
        plantPageItem.setAmount(1);
        return plantPageItem;
    }

}
