package org.dicadeveloper.weplantaforest.planting;

import java.util.Set;

import org.dicadeveloper.weplantaforest.projects.ProjectArticleRepository;
import org.dicadeveloper.weplantaforest.projects.ProjectRepository;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PlantPageDataValidator extends AbstractPlantPageValidator {

    @Autowired
    private PlantPageDataValidator(TreeRepository treeRepository, ProjectArticleRepository projectArticleRepository,
            ProjectRepository projectRepository) {
        super(treeRepository, projectArticleRepository, projectRepository);
    }

    protected boolean isPlantPageDataValid(PlantPageData plantPageData) {
        Set<String> projectNames = plantPageData.getProjects()
                                                .keySet();
        return projectsExist(projectNames) && projectsAreActive(projectNames) && articlesExist(plantPageData)
                && areThereEnoughTreesRemaining(plantPageData);
    }

    private boolean articlesExist(PlantPageData plantPageData) {
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

    private boolean areThereEnoughTreesRemaining(PlantPageData plantPageData) {
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
