package org.dicadeveloper.weplantaforest.planting.plantbag;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.dicadeveloper.weplantaforest.common.errorHandling.IpatErrorInfo;
import org.dicadeveloper.weplantaforest.common.errorHandling.IpatException;
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

    public void validatePlantBag(PlantBag plantBag) throws IpatException {
        Set<String> projectNames = plantBag.getProjects()
                                           .keySet();
        checkProjects(plantBag, projectNames);
        if (errorInfos.size() > 0) {
            List<IpatErrorInfo> returnedErrors = this.errorInfos;
            this.errorInfos = new ArrayList<IpatErrorInfo>();
            throw new IpatException(returnedErrors);
        }
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

}
