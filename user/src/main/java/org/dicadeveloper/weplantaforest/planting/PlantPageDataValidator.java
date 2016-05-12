package org.dicadeveloper.weplantaforest.planting;

import java.util.Set;

import org.dicadeveloper.weplantaforest.projects.ProjectArticle;
import org.dicadeveloper.weplantaforest.projects.ProjectArticleRepository;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import lombok.NonNull;

@Component
public class PlantPageDataValidator {

    @Autowired
    private @NonNull TreeRepository _treeRepository;

    @Autowired
    private @NonNull ProjectArticleRepository _projectArticleRepository;

    @Autowired
    private PlantPageDataValidator(TreeRepository treeRepository, ProjectArticleRepository projectArticlerepository) {
        _treeRepository = treeRepository;
        _projectArticleRepository = projectArticlerepository;
    }

    protected boolean isPlantPageDataValid(PlantPageData plantPageData) {
        Set<String> projectNames = plantPageData.getProjects()
                                                .keySet();
        for (String projectName : projectNames) {
            Set<String> plantItemNames = plantPageData.getProjects()
                                                      .get(projectName)
                                                      .getPlantItems()
                                                      .keySet();
            for (String plantItemName : plantItemNames) {
                Long articleId = _projectArticleRepository.findArticleIdByProjectAndTreeType(projectName,
                        plantItemName);
                ProjectArticle article = _projectArticleRepository.findOne(articleId);
                Long articleAmount = article.getAmount();
                Long alreadyPlanted = _treeRepository.countAlreadyPlantedTreesByProjectArticle(article);
                Long treesRemaining = articleAmount - alreadyPlanted;
                Long wantedToPlant = (long) plantPageData.getProjects()
                                                         .get(projectName)
                                                         .getPlantItems()
                                                         .get(plantItemName)
                                                         .getAmount();
                if (wantedToPlant > treesRemaining) {
                    /*
                     * perhaps we can add here some messages to tell the user
                     * what exactly the problem was
                     * 
                     * something like: There are not enough trees of %treeType%
                     * in project %project% anymore
                     */
                    return false;
                }
            }
        }
        return true;
    }

}
