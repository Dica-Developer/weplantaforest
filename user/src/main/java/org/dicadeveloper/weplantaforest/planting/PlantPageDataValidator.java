package org.dicadeveloper.weplantaforest.planting;

import java.util.Set;

import org.dicadeveloper.weplantaforest.projects.ProjectArticle;
import org.dicadeveloper.weplantaforest.projects.ProjectArticleRepository;
import org.dicadeveloper.weplantaforest.projects.ProjectRepository;
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
    private @NonNull ProjectRepository _projectRepository;

    @Autowired
    private PlantPageDataValidator(TreeRepository treeRepository, ProjectArticleRepository projectArticlerepository) {
        _treeRepository = treeRepository;
        _projectArticleRepository = projectArticlerepository;
    }

    protected boolean isPlantPageDataValid(PlantPageData plantPageData) {
        Set<String> projectNames = plantPageData.getProjects()
                                                .keySet();
        return projectsExist(projectNames) && projectsAreActive(projectNames) && articlesExist(plantPageData)
                && areThereEnoughTreesRemaining(plantPageData);
    }

    private boolean projectsExist(Set<String> projectNames) {
        for (String projectName : projectNames) {
            if (!projectExists(projectName)) {
                return false;
            }
        }
        return true;
    }

    private boolean projectsAreActive(Set<String> projectNames) {
        for (String projectName : projectNames) {
            if (!isProjectActive(projectName)) {
                return false;
            }
        }
        return true;
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
                if (!isThereEnoughTreesRemainingForThisArticle(plantPageData, projectName, articleName)) {
                    return false;
                }
            }
        }
        return true;
    }

    private boolean articleExists(String projectName, String articleName) {
        if (null != _projectArticleRepository.findArticleIdByProjectAndTreeType(projectName, articleName)) {
            return true;
        }
        return false;
    }

    private boolean projectExists(String projectName) {
        if (null != _projectRepository.findByName(projectName)) {
            return true;
        }
        return false;
    }

    private boolean isProjectActive(String projectName) {
        return _projectRepository.findByName(projectName)
                                 .getShopActive();
    }

    private boolean isThereEnoughTreesRemainingForThisArticle(PlantPageData plantPageData, String projectName,
            String articleName) {
        Long articleId = _projectArticleRepository.findArticleIdByProjectAndTreeType(projectName, articleName);
        ProjectArticle article = _projectArticleRepository.findOne(articleId);
        Long articleAmount = article.getAmount();
        Long alreadyPlanted = _treeRepository.countAlreadyPlantedTreesByProjectArticle(article);
        Long treesRemaining = articleAmount - alreadyPlanted;
        Long wantedToPlant = (long) plantPageData.getProjects()
                                                 .get(projectName)
                                                 .getPlantItems()
                                                 .get(articleName)
                                                 .getAmount();
        if (wantedToPlant <= treesRemaining) {
            /*
             * perhaps we can add here some messages to tell the user what
             * exactly the problem was
             * 
             * something like: There are not enough trees of %treeType% in
             * project %project% anymore
             */
            return true;
        } else {
            return false;
        }
    }

}
