package org.dicadeveloper.weplantaforest.planting.plantbag;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.dicadeveloper.weplantaforest.common.errorhandling.IpatErrorInfo;
import org.dicadeveloper.weplantaforest.common.errorhandling.IpatException;
import org.dicadeveloper.weplantaforest.projects.Project;
import org.dicadeveloper.weplantaforest.projects.ProjectArticle;
import org.dicadeveloper.weplantaforest.projects.ProjectArticleRepository;
import org.dicadeveloper.weplantaforest.projects.ProjectRepository;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import lombok.NonNull;
import lombok.val;

@Component
public class PlantBagValidator extends AbstractPlantBagValidator {

    @Autowired
    private PlantBagValidator(TreeRepository treeRepository, ProjectArticleRepository projectArticleRepository, ProjectRepository projectRepository) {
        super(treeRepository, projectArticleRepository, projectRepository);
    }

    public void validatePlantBag(@NonNull PlantBag plantBag) throws IpatException {
        val projectNames = plantBag.getProjects().keySet();
        val errorInfos = new ArrayList<IpatErrorInfo>();
        checkProjects(plantBag, projectNames, errorInfos);
        if (errorInfos.size() > 0) {
            throw new IpatException(errorInfos);
        }
    }

    private void checkProjects(@NonNull PlantBag plantBag, @NonNull Set<String> projectNames, final List<IpatErrorInfo> errorInfos) {
        for (String projectName : projectNames) {
            checkProject(plantBag, projectName, errorInfos);
        }
    }

    private void checkProject(@NonNull PlantBag plantBag, @NonNull String projectName, final List<IpatErrorInfo> errorInfos) {
        Project project = projectExistsTemp(projectName, errorInfos);
        if (project != null && isProjectActiveTemp(project, errorInfos)) {
            checkArticles(plantBag, projectName, errorInfos);
        }
    }

    private void checkArticles(@NonNull PlantBag plantBag, @NonNull String projectName, final List<IpatErrorInfo> errorInfos) {
        Set<String> articleNames = plantBag.getProjects().get(projectName).getPlantItems().keySet();
        for (String articleName : articleNames) {
            checkArticle(plantBag, projectName, articleName, errorInfos);
        }
    }

    private void checkArticle(@NonNull PlantBag plantBag, @NonNull String projectName, @NonNull String articleName, final List<IpatErrorInfo> errorInfos) {
        ProjectArticle article = articleExistsTemp(projectName, articleName, errorInfos);
        if (article != null) {
            Long wantedToPlant = (long) plantBag.getProjects().get(projectName).getPlantItems().get(articleName).getAmount();
            areThereEnoughTreesRemainingForThisArticleTemp(article, wantedToPlant, projectName, articleName, errorInfos);
        }
    }

}
