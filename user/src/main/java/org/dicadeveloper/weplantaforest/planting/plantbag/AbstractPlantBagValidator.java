package org.dicadeveloper.weplantaforest.planting.plantbag;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.dicadeveloper.weplantaforest.common.errorHandling.ErrorCodes;
import org.dicadeveloper.weplantaforest.common.errorHandling.IpatErrorInfo;
import org.dicadeveloper.weplantaforest.projects.Project;
import org.dicadeveloper.weplantaforest.projects.ProjectArticle;
import org.dicadeveloper.weplantaforest.projects.ProjectArticleRepository;
import org.dicadeveloper.weplantaforest.projects.ProjectRepository;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import lombok.NonNull;

@Component
public abstract class AbstractPlantBagValidator {

    @Autowired
    protected @NonNull TreeRepository _treeRepository;

    @Autowired
    protected @NonNull ProjectArticleRepository _projectArticleRepository;

    @Autowired
    protected @NonNull ProjectRepository _projectRepository;

    protected List<IpatErrorInfo> errorInfos = new ArrayList<>();

    @Autowired
    protected AbstractPlantBagValidator(TreeRepository treeRepository, ProjectArticleRepository projectArticlerepository, ProjectRepository projectRepository) {
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

    protected void projectsExistTemp(Set<String> projectNames) {
        for (String projectName : projectNames) {
            projectExistsTemp(projectName);
        }
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

    protected ProjectArticle articleExistsTemp(String projectName, String articleName) {
        ProjectArticle article = _projectArticleRepository.findArticleByProjectAndTreeType(projectName, articleName);
        if (null == article) {
            addErrorInfo(ErrorCodes.ARTICLE_DOES_NOT_EXISTS, projectName, articleName);
        }
        return article;
    }

    protected boolean projectExists(String projectName) {
        if (null != _projectRepository.findByName(projectName)) {
            return true;
        }
        return false;
    }

    protected Project projectExistsTemp(String projectName) {
        Project project = _projectRepository.findByName(projectName);
        if (null == project) {
            addErrorInfo(ErrorCodes.PROJECT_DOES_NOT_EXISTS, projectName);
        }
        return project;
    }

    protected boolean isProjectActive(String projectName) {
        return _projectRepository.findByName(projectName)
                                 .getShopActive();
    }

    protected boolean isProjectActiveTemp(Project project) {
        boolean isActive = true;
        if (!project.getShopActive()) {
            addErrorInfo(ErrorCodes.PROJECT_NOT_ACTIVE, project.getName());
            isActive = false;
        }
        return isActive;
    }

    protected boolean isThereEnoughTreesRemainingForThisArticle(String projectName, String articleName, long wantedToPlant) {
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

    protected void areThereEnoughTreesRemainingForThisArticleTemp(ProjectArticle article, Long wantedToPlant, String projectName, String articleName) {
        Long articleAmount = article.getAmount();
        Long alreadyPlanted = _treeRepository.countAlreadyPlantedTreesByProjectArticle(article);
        Long treesRemaining = articleAmount - alreadyPlanted;
        if (wantedToPlant > treesRemaining) {        
            addErrorInfo(ErrorCodes.NOT_ENOUGH_TREES, projectName, articleName, wantedToPlant.toString(), treesRemaining.toString());
        }

    }
    
    protected void addErrorInfo(String errorCode, String... params){
        IpatErrorInfo errorInfo = new IpatErrorInfo(errorCode, params);
        errorInfos.add(errorInfo);
    }

}
