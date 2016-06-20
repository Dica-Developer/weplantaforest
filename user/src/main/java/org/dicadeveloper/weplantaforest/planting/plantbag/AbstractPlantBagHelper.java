package org.dicadeveloper.weplantaforest.planting.plantbag;

import java.util.ArrayList;
import java.util.List;

import org.dicadeveloper.weplantaforest.projects.Project;
import org.dicadeveloper.weplantaforest.projects.ProjectArticle;
import org.dicadeveloper.weplantaforest.projects.ProjectArticleRepository;
import org.dicadeveloper.weplantaforest.projects.ProjectRepository;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.dicadeveloper.weplantaforest.treetypes.TreeTypeRepository;
import org.springframework.data.domain.PageRequest;

import lombok.NonNull;

public abstract class AbstractPlantBagHelper {

    protected @NonNull ProjectRepository _projectRepository;

    protected @NonNull ProjectArticleRepository _projectArticleRepository;

    protected @NonNull TreeRepository _treeRepository;

    protected @NonNull TreeTypeRepository _treeTypeRepository;

    protected List<ProjectArticle> projectArticles;

    protected AbstractPlantBagHelper(ProjectRepository projectRepository,
            ProjectArticleRepository projectArticleRepository, TreeTypeRepository treeTypeRepository,
            TreeRepository treeRepository) {
        _projectRepository = projectRepository;
        _projectArticleRepository = projectArticleRepository;
        _treeTypeRepository = treeTypeRepository;
        _treeRepository = treeRepository;
    }

    protected boolean areThereTreesRemaining(ProjectArticle article) {
        return countTreesRemainingByThisArticle(article) > 0 ? true : false;
    }

    protected Long countTreesRemainingByThisArticle(ProjectArticle article) {
        return article.getAmount() - _treeRepository.countAlreadyPlantedTreesByProjectArticle(article);
    }

    protected ProjectArticle findProjectArticleWithHighestMarge() {
        ProjectArticle article = null;
        double maxMarge = 0.0;

        for (ProjectArticle projectArticle : projectArticles) {
            double articleMarge = projectArticle.getPrice()
                                                .getMarge()
                                                .doubleValue();
            if (articleMarge > maxMarge) {
                maxMarge = articleMarge;
                article = projectArticle;
            }
        }
        projectArticles.remove(article);
        return article;
    }

    protected List<ProjectArticle> createListOfAllAvailableProjectArticles() {
        List<ProjectArticle> projectArticles = new ArrayList<>();
        // only the active Projects
        for (Project project : _projectRepository.active(new PageRequest(0, 5))) {
            for (ProjectArticle article : project.getArticles()) {
                // add only articles, where there are remaining trees to plant
                if (areThereTreesRemaining(article)) {
                    projectArticles.add(article);
                }
            }
        }
        return projectArticles;
    }

    protected boolean isLowerOrEqualThanTargetedPrice(double cartPrice, double targetedPrice) {
        return cartPrice <= targetedPrice;
    }
}
