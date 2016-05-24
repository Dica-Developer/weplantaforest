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
public abstract class AbstractPlantPageValidator {

    @Autowired
    protected @NonNull TreeRepository _treeRepository;

    @Autowired
    protected @NonNull ProjectArticleRepository _projectArticleRepository;

    @Autowired
    protected @NonNull ProjectRepository _projectRepository;

    @Autowired
    protected AbstractPlantPageValidator(TreeRepository treeRepository,
            ProjectArticleRepository projectArticlerepository, ProjectRepository projectRepository) {
        _treeRepository = treeRepository;
        _projectArticleRepository = projectArticlerepository;
        _projectRepository = projectRepository;
    }

    protected boolean projectsExist(Set<String> projectNames) {
        for (String projectName : projectNames) {
            if (!projectExists(projectName)) {
                return false;
            }
        }
        return true;
    }

    protected boolean projectsAreActive(Set<String> projectNames) {
        for (String projectName : projectNames) {
            if (!isProjectActive(projectName)) {
                return false;
            }
        }
        return true;
    }

    protected boolean articleExists(String projectName, String articleName) {
        if (null != _projectArticleRepository.findArticleIdByProjectAndTreeType(projectName, articleName)) {
            return true;
        }
        return false;
    }

    protected boolean projectExists(String projectName) {
        if (null != _projectRepository.findByName(projectName)) {
            return true;
        }
        return false;
    }

    protected boolean isProjectActive(String projectName) {
        return _projectRepository.findByName(projectName)
                                 .getShopActive();
    }

    protected boolean isThereEnoughTreesRemainingForThisArticle(String projectName, String articleName,
            long wantedToPlant) {
        Long articleId = _projectArticleRepository.findArticleIdByProjectAndTreeType(projectName, articleName);
        ProjectArticle article = _projectArticleRepository.findOne(articleId);
        Long articleAmount = article.getAmount();
        Long alreadyPlanted = _treeRepository.countAlreadyPlantedTreesByProjectArticle(article);
        Long treesRemaining = articleAmount - alreadyPlanted;

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
