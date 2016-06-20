package org.dicadeveloper.weplantaforest.planting.plantbag;

import java.util.Set;

import org.dicadeveloper.weplantaforest.projects.ProjectArticleRepository;
import org.dicadeveloper.weplantaforest.projects.ProjectRepository;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PlantBagValidator extends AbstractPlantBagValidator {

    @Autowired
    private PlantBagValidator(TreeRepository treeRepository, ProjectArticleRepository projectArticleRepository,
            ProjectRepository projectRepository) {
        super(treeRepository, projectArticleRepository, projectRepository);
    }

    public boolean isPlantPageDataValid(PlantBag plantPageData) {
        Set<String> projectNames = plantPageData.getProjects()
                                                .keySet();
        return projectsExist(projectNames) && projectsAreActive(projectNames) && articlesExist(plantPageData)
                && areThereEnoughTreesRemaining(plantPageData);
    }

    private boolean articlesExist(PlantBag plantPageData) {
        Set<String> projectNames = plantPageData.getProjects()
                                                .keySet();

        for (String projectName : projectNames) {
            Set<String> articleNames = plantPageData.getProjects()
                                                    .get(projectName)
                                                    .getPlantItems()
                                                    .keySet();
            for (String articleName : articleNames) {
                if (!articleExists(projectName, articleName)) {
                    return false;
                }
            }
        }
        return true;
    }

    private boolean areThereEnoughTreesRemaining(PlantBag plantPageData) {
        Set<String> projectNames = plantPageData.getProjects()
                                                .keySet();

        for (String projectName : projectNames) {
            Set<String> plantItemNames = plantPageData.getProjects()
                                                      .get(projectName)
                                                      .getPlantItems()
                                                      .keySet();
            for (String articleName : plantItemNames) {
                Long wantedToPlant = (long) plantPageData.getProjects()
                                                         .get(projectName)
                                                         .getPlantItems()
                                                         .get(articleName)
                                                         .getAmount();
                if (!isThereEnoughTreesRemainingForThisArticle(projectName, articleName, wantedToPlant)) {
                    return false;
                }
            }
        }
        return true;
    }

}
