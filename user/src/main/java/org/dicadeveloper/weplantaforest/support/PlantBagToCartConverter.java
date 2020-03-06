package org.dicadeveloper.weplantaforest.support;

import java.util.Set;

import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.cart.CartItem;
import org.dicadeveloper.weplantaforest.cart.CartState;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBag;
import org.dicadeveloper.weplantaforest.planting.plantbag.SimplePlantBag;
import org.dicadeveloper.weplantaforest.planting.plantbag.SimplePlantBag.SimplePlantPageItem;
import org.dicadeveloper.weplantaforest.projects.Project;
import org.dicadeveloper.weplantaforest.projects.ProjectArticle;
import org.dicadeveloper.weplantaforest.projects.ProjectArticleRepository;
import org.dicadeveloper.weplantaforest.trees.Tree;
import org.dicadeveloper.weplantaforest.user.User;
import org.dicadeveloper.weplantaforest.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import lombok.NonNull;

@Component
public class PlantBagToCartConverter {

    private @NonNull ProjectArticleRepository _projectArticleRepository;

    private @NonNull UserRepository _userRepository;

    @Autowired
    public PlantBagToCartConverter(ProjectArticleRepository projectArticleRepository, UserRepository userRepository) {
        _projectArticleRepository = projectArticleRepository;
        _userRepository = userRepository;
    }

    public Cart convertPlantPageDataToCart(PlantBag plantPageData, User buyer, CartState cartState) {

        Cart cart = new Cart();
        cart.setTimeStamp(System.currentTimeMillis());
        cart.setBuyer(buyer);
        cart.setCartState(cartState);

        Set<String> projectNames = plantPageData.getProjects().keySet();

        for (String projectname : projectNames) {
            Set<String> plantItemnames = plantPageData.getProjects().get(projectname).getPlantItems().keySet();

            for (String plantItemName : plantItemnames) {
                int amount = plantPageData.getProjects().get(projectname).getPlantItems().get(plantItemName).getAmount();
                if (amount > 0) {
                    Long plantArticleId = _projectArticleRepository.findArticleIdByProjectAndTreeType(projectname, plantItemName);

                    Tree tree = createTree(amount, cart.getTimeStamp(), cart.getBuyer(), plantArticleId);

                    cart.addCartItem(createCartItem(tree));
                }
            }
        }
        return cart;
    }

    public Cart convertSimplePlantPageDataToCart(SimplePlantBag simplePlantPageData, User buyer) {

        Cart cart = new Cart();
        cart.setTimeStamp(System.currentTimeMillis());
        cart.setBuyer(buyer);

        for (SimplePlantPageItem simplePlantPageItem : simplePlantPageData.getPlantItems()) {
            int amount = (int) simplePlantPageItem.getAmount();
            String projectName = simplePlantPageItem.getProjectName();
            String plantItemName = simplePlantPageItem.getTreeType();
            Long plantArticleId = _projectArticleRepository.findArticleIdByProjectAndTreeType(projectName, plantItemName);

            Tree tree = createTree(amount, cart.getTimeStamp(), cart.getBuyer(), plantArticleId);

            cart.addCartItem(createCartItem(tree));
        }
        return cart;
    }

    private Tree createTree(int amount, long plantedOn, User owner, long projectArticleId) {
        Tree tree = new Tree();
        Project project = _projectArticleRepository.findById(projectArticleId).orElse(null).getProject();
        ProjectArticle projectArticle = _projectArticleRepository.findById(projectArticleId).orElse(null);

        tree.setAmount(amount);
        tree.setTreeType(projectArticle.getTreeType());
        tree.setProjectArticle(projectArticle);
        tree.setPlantedOn(plantedOn);
        tree.setSubmittedOn(plantedOn);
        tree.setOwner(owner);
        tree.setLatitude(project.getLatitude());
        tree.setLongitude(project.getLongitude());

        return tree;
    }

    private CartItem createCartItem(Tree tree) {
        CartItem cartItem = new CartItem();
        cartItem.setTree(tree);
        return cartItem;
    }

}
