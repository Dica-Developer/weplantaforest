package org.dicadeveloper.weplantaforest.support;

import java.util.ArrayList;
import java.util.List;

import org.dicadeveloper.weplantaforest.admin.codes.Cart;
import org.dicadeveloper.weplantaforest.admin.codes.CartItem;
import org.dicadeveloper.weplantaforest.projects.Project;
import org.dicadeveloper.weplantaforest.projects.ProjectArticle;
import org.dicadeveloper.weplantaforest.projects.ProjectArticleRepository;
import org.dicadeveloper.weplantaforest.trees.Tree;
import org.dicadeveloper.weplantaforest.trees.User;
import org.dicadeveloper.weplantaforest.treetypes.TreeTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import lombok.NonNull;

@Component
public class CartToTreeListConverter {

    private @NonNull TreeTypeRepository _treeTypeRepository;

    private @NonNull ProjectArticleRepository _projectArticleRepository;

    @Autowired
    public CartToTreeListConverter(TreeTypeRepository treeTypeRepository, ProjectArticleRepository projectArticleRepository) {
        _treeTypeRepository = treeTypeRepository;
        _projectArticleRepository = projectArticleRepository;
    }

    public List<Tree> createTreeListFromCart(Cart cart) {
        List<Tree> treeList = new ArrayList<>();
        Long plantedOn = cart.getTimeStamp();
        User owner = cart.getBuyer();

        for (CartItem cartItem : cart.getCartItems()) {
            Tree tree = new Tree();
            Project project = _projectArticleRepository.findOne(cartItem.getPlantArticleId())
                                                       .getProject();
            ProjectArticle projectArticle = _projectArticleRepository.findOne(cartItem.getPlantArticleId());
            
            tree.setAmount(cartItem.getAmount());
            tree.setTreeType(projectArticle.getTreeType());
            tree.setProjectArticle(projectArticle);
            tree.setPlantedOn(plantedOn);
            tree.setSubmittedOn(plantedOn);
            tree.setOwner(owner);
            tree.setLatitude(project.getLatitude());
            tree.setLongitude(project.getLongitude());

            treeList.add(tree);
        }
        return treeList;
    }
}
