package org.dicadeveloper.weplantaforest.planting;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Random;

import org.dicadeveloper.weplantaforest.projects.Project;
import org.dicadeveloper.weplantaforest.projects.ProjectArticle;
import org.dicadeveloper.weplantaforest.projects.ProjectArticleRepository;
import org.dicadeveloper.weplantaforest.projects.ProjectRepository;
import org.dicadeveloper.weplantaforest.support.PriceHelper;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.dicadeveloper.weplantaforest.treetypes.TreeTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import lombok.NonNull;

@Component
public class PlantPageHelper {

    private @NonNull ProjectRepository _projectRepository;

    private @NonNull ProjectArticleRepository _projectArticleRepository;

    private @NonNull TreeRepository _treeRepository;

    private @NonNull TreeTypeRepository _treeTypeRepository;

    private PlantPageData plantPageData;

    private List<ProjectArticle> projectArticles;

    @Autowired
    private PlantPageHelper(ProjectRepository projectRepository, ProjectArticleRepository projectArticleRepository,
            TreeTypeRepository treeTypeRepository, TreeRepository treeRepository) {
        _projectRepository = projectRepository;
        _projectArticleRepository = projectArticleRepository;
        _treeTypeRepository = treeTypeRepository;
        _treeRepository = treeRepository;
    }

    protected PlantPageData createPlantProposal(long targetedPrice) {
        plantPageData = new PlantPageData();
        addActiveProjectsToPlantPageData();

        projectArticles = createListOfAllAvailableProjectArticles();

        addPlantItemWithHighestMarge(PriceHelper.fromCentsToEuro(targetedPrice));

        double newTargetedPrice = PriceHelper.fromCentsToEuro(targetedPrice)
                - PriceHelper.fromCentsToEuro(plantPageData.getActualPrice());
        addFurtherPlantItems(newTargetedPrice);

        return plantPageData;
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

    private List<ProjectArticle> createListOfAllAvailableProjectArticles() {
        List<ProjectArticle> projectArticles = new ArrayList<>();
        // only the active Projects
        for (Project project : _projectRepository.active(new PageRequest(0, 5))) {
            for (ProjectArticle article : project.getArticles()) {
                // add only articles, where there are remaining trees to plant
                if (areThereTreesRemaining(article)) {
                    projectArticles.add(article);
                }
            }
        }
        return projectArticles;
    }

    private void addPlantItemWithHighestMarge(double targetedPrice) {
        double newTargetedPrice;
        // if there are more articles, use 70% of the targeted price for the
        // article with highest marge
        if (projectArticles.size() > 1) {
            newTargetedPrice = targetedPrice * 0.7;
        } else {
            newTargetedPrice = targetedPrice;
        }

        ProjectArticle article = findProjectArticleWithHighestMarge();

        long treesRemaining = countTreesRemainingByThisArticle(article);
        double treePrice = article.getPrice()
                                  .getAmount()
                                  .doubleValue();
        int maxMargeTreeAmount = countAmountOfTreesToPlant(newTargetedPrice, treesRemaining, treePrice);

        projectArticles.remove(article);
        addPlantItemToProject(article, maxMargeTreeAmount);
    }

    private void addFurtherPlantItems(double targetedPrice) {
        Random random = new Random();

        while (projectArticles.size() > 0) {
            // pick randomly one article
            int pickOne = random.nextInt(projectArticles.size());
            ProjectArticle article = projectArticles.get(pickOne);

            double treePrice = article.getPrice()
                                      .getAmount()
                                      .doubleValue();

            // remove the article, so this list can be used to compare the
            // picked article with the rest of them
            projectArticles.remove(pickOne);

            // check, if it's possible to add 1 tree without
            // exceeding the targeted price and if there are remaining trees by
            // this article
            if (targetedPrice > 0 && isLowerOrEqualThanTargetedPrice(treePrice, targetedPrice)) {

                // Check, if there are other articles, where it's possible to
                // fill the cart with
                if (areThereMorePossibilitiesToPlant(projectArticles, targetedPrice - treePrice)) {
                    // if yes, just add 1 tree by this article
                    addPlantItemToProject(article, 1);

                    // targeted price lowered by price of one tree
                    targetedPrice = targetedPrice - treePrice;
                } else {
                    // if not, fill the rest of the remaining price with this
                    // article

                    // but first, find out, how many trees are remained by this
                    // article
                    long treesRemaining = countTreesRemainingByThisArticle(article);
                    // then count, how many trees can be planted
                    int amount = countAmountOfTreesToPlant(targetedPrice, treesRemaining, treePrice);

                    // now you can create the cartItem with the amount of trees
                    addPlantItemToProject(article, amount);

                    // targeted price lowered by the amount of trees multiplied
                    // by the price og one tree
                    targetedPrice = targetedPrice - (amount * treePrice);
                }
            } else {
                // add PlantItem with amount 0 to let the user the possibility
                // to change this
                addPlantItemToProject(article, 0);
            }
        }
    }

    private ProjectArticle findProjectArticleWithHighestMarge() {
        ProjectArticle article = null;
        double maxMarge = 0.0;

        for (ProjectArticle projectArticle : projectArticles) {
            double articleMarge = projectArticle.getPrice()
                                                .getMarge()
                                                .doubleValue();
            if (articleMarge > maxMarge) {
                maxMarge = articleMarge;
                article = projectArticle;
            }
        }

        return article;
    }

    private boolean areThereMorePossibilitiesToPlant(List<ProjectArticle> articles, double targetedPrice) {
        for (ProjectArticle article : articles) {
            double treePrice = article.getPrice()
                                      .getAmount()
                                      .doubleValue();
            if (isLowerOrEqualThanTargetedPrice(treePrice, targetedPrice)) {
                return true;
            }
        }
        return false;
    }

    private boolean isLowerOrEqualThanTargetedPrice(double cartPrice, double targetedPrice) {
        return cartPrice <= targetedPrice;
    }

    private void addPlantItemToProject(ProjectArticle article, int amount) {
        String projectName = article.getProject()
                                    .getName();
        String treeTypeName = article.getTreeType()
                                     .getName();

        long treePrice = PriceHelper.fromBigDecimalToLong(article.getPrice()
                                                                 .getAmount());

        PlantItem plantItem = new PlantItem();
        plantItem.setAmount(amount);
        plantItem.setTreePrice(treePrice);

        long actualPriceNow = plantPageData.getActualPrice() + amount * treePrice;

        plantPageData.setActualPrice(actualPriceNow);

        plantPageData.getProjects()
                     .get(projectName)
                     .getPlantItems()
                     .put(treeTypeName, plantItem);
    }

    private boolean areThereTreesRemaining(ProjectArticle article) {
        return countTreesRemainingByThisArticle(article) > 0 ? true : false;
    }

    private Long countTreesRemainingByThisArticle(ProjectArticle article) {
        return article.getAmount() - _treeRepository.countAlreadyPlantedTreesByProjectArticle(article);
    }

    private int countAmountOfTreesToPlant(double targetedPrice, long treesRemaining, double treePrice) {
        int amount = 0;

        // check if you could reach the targeted price with this article
        if (isEnoughToReachTargetedPrice(targetedPrice, treesRemaining, treePrice)) {
            // if yes, iterate until you reach the last possible amount to not
            // exceed the targeted price
            while ((amount + 1) * treePrice <= targetedPrice) {
                amount++;
            }
        } else {
            // if not, you can take all remaining trees
            amount = (int) treesRemaining;
        }
        return amount;
    }

    private boolean isEnoughToReachTargetedPrice(double targetedPrice, long treesRemaining, double treePrice) {
        return (treesRemaining * treePrice) > targetedPrice;
    }

}
