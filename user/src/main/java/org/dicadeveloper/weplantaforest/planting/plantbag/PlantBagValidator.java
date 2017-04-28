package org.dicadeveloper.weplantaforest.planting.plantbag;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.dicadeveloper.weplantaforest.common.errorHandling.IpatErrorInfo;
import org.dicadeveloper.weplantaforest.projects.Project;
import org.dicadeveloper.weplantaforest.projects.ProjectArticle;
import org.dicadeveloper.weplantaforest.projects.ProjectArticleRepository;
import org.dicadeveloper.weplantaforest.projects.ProjectRepository;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PlantBagValidator extends AbstractPlantBagValidator {

    @Autowired
    private PlantBagValidator(TreeRepository treeRepository, ProjectArticleRepository projectArticleRepository, ProjectRepository projectRepository) {
        super(treeRepository, projectArticleRepository, projectRepository);
    }

    public boolean isPlantPageDataValid(PlantBag plantPageData) {
        Set<String> projectNames = plantPageData.getProjects()
                                                .keySet();
        return projectsExist(projectNames) && projectsAreActive(projectNames) && articlesExist(plantPageData) && areThereEnoughTreesRemaining(plantPageData);
    }

    public List<IpatErrorInfo> validatePlantBag(PlantBag plantBag) {
        Set<String> projectNames = plantBag.getProjects()
                                           .keySet();
        checkProjects(plantBag, projectNames);
        List<IpatErrorInfo> returnedErrors = this.errorInfos;
        this.errorInfos = new ArrayList<IpatErrorInfo>();
        return returnedErrors;
    }

    private void checkProjects(PlantBag plantBag, Set<String> projectNames) {
        for (String projectName : projectNames) {
            checkProject(plantBag, projectName);
        }
    }

    private void checkProject(PlantBag plantBag, String projectName) {
        Project project = projectExistsTemp(projectName);
        if (project != null && isProjectActiveTemp(project)) {
            checkArticles(plantBag, projectName);
        }
    }

    private void checkArticles(PlantBag plantBag, String projectName) {
        Set<String> articleNames = plantBag.getProjects()
                                           .get(projectName)
                                           .getPlantItems()
                                           .keySet();
        for (String articleName : articleNames) {
            checkArticle(plantBag, projectName, articleName);
        }
    }

    private void checkArticle(PlantBag plantBag, String projectName, String articleName) {
        ProjectArticle article = articleExistsTemp(projectName, articleName);
        if (article != null) {
            Long wantedToPlant = (long) plantBag.getProjects()
                                                .get(projectName)
                                                .getPlantItems()
                                                .get(articleName)
                                                .getAmount();
            areThereEnoughTreesRemainingForThisArticleTemp(article, wantedToPlant, projectName, articleName);
        }
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
