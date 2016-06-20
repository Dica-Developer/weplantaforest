package org.dicadeveloper.weplantaforest.planting.plantbag;

import java.util.HashSet;
import java.util.Set;

import org.dicadeveloper.weplantaforest.planting.plantbag.SimplePlantPageData.SimplePlantPageItem;
import org.dicadeveloper.weplantaforest.projects.ProjectArticleRepository;
import org.dicadeveloper.weplantaforest.projects.ProjectRepository;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SimplePlantPageDataValidator extends AbstractPlantPageValidator {

    @Autowired
    private SimplePlantPageDataValidator(TreeRepository treeRepository,
            ProjectArticleRepository projectArticleRepository, ProjectRepository projectRepository) {
        super(treeRepository, projectArticleRepository, projectRepository);
    }

    public boolean isPlantPageDataValid(SimplePlantPageData plantPageData) {
        Set<String> projectNames = new HashSet<>();

        for (SimplePlantPageItem plantItem : plantPageData.getPlantItems()) {
            projectNames.add(plantItem.getProjectName());
        }

        return projectsExist(projectNames) && projectsAreActive(projectNames) && articlesExist(plantPageData)
                && areThereEnoughTreesRemaining(plantPageData);
    }

    private boolean articlesExist(SimplePlantPageData plantPageData) {
        for (SimplePlantPageItem plantItem : plantPageData.getPlantItems()) {
            String projectName = plantItem.getProjectName();
            String articleName = plantItem.getTreeType();

            if (!articleExists(projectName, articleName)) {
                return false;
            }
        }
        return true;
    }

    private boolean areThereEnoughTreesRemaining(SimplePlantPageData plantPageData) {
        for (SimplePlantPageItem plantItem : plantPageData.getPlantItems()) {
            String projectName = plantItem.getProjectName();
            String articleName = plantItem.getTreeType();
            Long wantedToPlant = (long) plantItem.getAmount();
            if (!isThereEnoughTreesRemainingForThisArticle(projectName, articleName, wantedToPlant)) {
                return false;
            }
        }
        return true;
    }

}
