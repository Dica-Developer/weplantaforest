package org.dicadeveloper.weplantaforest.planting;

import java.util.HashMap;

import org.dicadeveloper.weplantaforest.common.support.PriceHelper;
import org.dicadeveloper.weplantaforest.planting.PlantPageData.ProjectData;
import org.dicadeveloper.weplantaforest.planting.PlantPageData.ProjectData.PlantItem;
import org.dicadeveloper.weplantaforest.projects.Project;
import org.dicadeveloper.weplantaforest.projects.ProjectArticle;
import org.dicadeveloper.weplantaforest.projects.ProjectArticleRepository;
import org.dicadeveloper.weplantaforest.projects.ProjectRepository;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.dicadeveloper.weplantaforest.treetypes.TreeTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

@Component
public class PlantPageDataHelper extends AbstractPlantPageHelper {

    private PlantPageData plantPageData;

    @Autowired
    private PlantPageDataHelper(ProjectRepository projectRepository, ProjectArticleRepository projectArticleRepository,
            TreeTypeRepository treeTypeRepository, TreeRepository treeRepository) {
        super(projectRepository, projectArticleRepository, treeTypeRepository, treeRepository);
    }

    protected PlantPageData createPlantProposalForTargetPrice(long targetedPrice) {
        initialize(targetedPrice);

        ProjectArticle articleWithHighestMarge = findProjectArticleWithHighestMarge();

        double targetPriceAsDouble = PriceHelper.fromCentsToEuro(targetedPrice);
        double targetedPriceForHighestMarge = targetPriceAsDouble * 0.7;

        increaseAmountOfPlantItemTillPriceReached(articleWithHighestMarge, targetedPriceForHighestMarge);

        double targetedPriceForOtherTrees = targetPriceAsDouble
                - PriceHelper.fromCentsToEuro(plantPageData.getActualPrice());

        targetedPriceForOtherTrees = addFurtherPlantItems(targetedPriceForOtherTrees);

        increaseAmountOfPlantItemTillPriceReached(articleWithHighestMarge, targetedPriceForOtherTrees);
        return plantPageData;
    }

    private void initialize(long targetedPrice) {
        plantPageData = new PlantPageData();
        addActiveProjectsToPlantPageData();
        plantPageData.setTargetPrice(targetedPrice);
        projectArticles = createListOfAllAvailableProjectArticles();
        initializePlantItems();
    }

    private void initializePlantItems() {
        for (ProjectArticle article : projectArticles) {
            initialisePlantItem(article);
        }
    }

    private void addActiveProjectsToPlantPageData() {
        HashMap<String, ProjectData> projectMap = new HashMap<>();
        plantPageData.setProjects(projectMap);
        for (Project project : _projectRepository.active(new PageRequest(0, 5))) {
            ProjectData projectData = new ProjectData();
            String projectName = project.getName();

            plantPageData.projects.put(projectName, projectData);

            HashMap<String, PlantItem> plantItemMap = new HashMap<>();
            plantPageData.projects.get(projectName)
                                  .setPlantItems(plantItemMap);
        }
    }

    private void increaseAmountOfPlantItemTillPriceReached(ProjectArticle article, double targetedPrice) {
        boolean treeCouldBeAdded = false;

        do {
            treeCouldBeAdded = false;
            double treePrice = article.getPrice()
                                      .getAmount()
                                      .doubleValue();
            // check, if it's possible to add 1 tree without
            // exceeding the targeted price
            if (targetedPrice > 0 && isLowerOrEqualThanTargetedPrice(treePrice, targetedPrice)) {
                // if yes, increase the amount of this article by one, if there
                // are enough remaining trees
                if (increasePlantItemAmountByOneIfEnoughTreesRemaining(article)) {
                    // targeted price lowered by price of one tree
                    targetedPrice = targetedPrice - treePrice;
                    treeCouldBeAdded = true;
                }
            } else {
                // do Nothing
            }

        }
        // if at least 1 tree could be added, iterate over all articles again
        while (treeCouldBeAdded);
    }

    private double addFurtherPlantItems(double targetedPrice) {
        boolean treeCouldBeAdded = false;

        do {
            treeCouldBeAdded = false;

            for (ProjectArticle article : projectArticles) {
                double treePrice = article.getPrice()
                                          .getAmount()
                                          .doubleValue();
                // check, if it's possible to add 1 tree without
                // exceeding the targeted price and if there are remaining trees
                // by
                // this article
                if (targetedPrice > 0 && isLowerOrEqualThanTargetedPrice(treePrice, targetedPrice)) {
                    // if yes, increase the amount of this article by one
                    if (increasePlantItemAmountByOneIfEnoughTreesRemaining(article)) {
                        // targeted price lowered by price of one tree
                        targetedPrice = targetedPrice - treePrice;
                        treeCouldBeAdded = true;
                    }
                } else {
                    // do Nothing
                }
            }
        }
        // if at least 1 tree could be added, iterate over all articles again
        while (treeCouldBeAdded);

        return targetedPrice;

    }

    private void initialisePlantItem(ProjectArticle article) {
        String projectName = article.getProject()
                                    .getName();
        String treeTypeName = article.getTreeType()
                                     .getName();

        long treePrice = PriceHelper.fromBigDecimalToLong(article.getPrice()
                                                                 .getAmount());

        PlantItem plantItem = new PlantItem();
        plantItem.setAmount(0);
        plantItem.setTreePrice(treePrice);

        plantPageData.getProjects()
                     .get(projectName)
                     .getPlantItems()
                     .put(treeTypeName, plantItem);
    }

    private boolean increasePlantItemAmountByOneIfEnoughTreesRemaining(ProjectArticle article) {
        String projectName = article.getProject()
                                    .getName();
        String treeTypeName = article.getTreeType()
                                     .getName();

        int amountNow = plantPageData.getProjects()
                                     .get(projectName)
                                     .getPlantItems()
                                     .get(treeTypeName)
                                     .getAmount();

        if ((amountNow + 1) <= countTreesRemainingByThisArticle(article)) {

            long treePrice = PriceHelper.fromBigDecimalToLong(article.getPrice()
                                                                     .getAmount());

            long actualPriceNow = plantPageData.getActualPrice() + treePrice;

            plantPageData.setActualPrice(actualPriceNow);

            plantPageData.getProjects()
                         .get(projectName)
                         .getPlantItems()
                         .get(treeTypeName)
                         .setAmount(amountNow + 1);

            return true;
        } else {
            return false;
        }
    }
}
