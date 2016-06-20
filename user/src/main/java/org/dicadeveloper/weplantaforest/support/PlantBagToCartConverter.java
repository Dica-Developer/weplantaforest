package org.dicadeveloper.weplantaforest.support;

import java.math.BigDecimal;
import java.util.Set;

import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.cart.CartItem;
import org.dicadeveloper.weplantaforest.common.support.PriceHelper;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBag;
import org.dicadeveloper.weplantaforest.planting.plantbag.SimplePlantBag;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBag.ProjectData.PlantItem;
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

    public Cart convertPlantPageDataToCart(PlantBag plantPageData) {
        User buyer = _userRepository.findOne(plantPageData.getUserId());
        
        Cart cart = new Cart();
        cart.setTimeStamp(System.currentTimeMillis());
        cart.setBuyer(buyer);

        Set<String> projectNames = plantPageData.getProjects()
                                                .keySet();

        for (String projectname : projectNames) {
            Set<String> plantItemnames = plantPageData.getProjects()
                                                      .get(projectname)
                                                      .getPlantItems()
                                                      .keySet();

            for (String plantItemName : plantItemnames) {
                int amount = plantPageData.getProjects()
                                          .get(projectname)
                                          .getPlantItems()
                                          .get(plantItemName)
                                          .getAmount();
                if (amount > 0) {
                    PlantItem plantItem = plantPageData.getProjects()
                                                       .get(projectname)
                                                       .getPlantItems()
                                                       .get(plantItemName);

                    BigDecimal treePrice = PriceHelper.fromLongToBigDecimal(plantItem.getTreePrice());
                    BigDecimal totalPrice = PriceHelper.fromLongToBigDecimal(amount * plantItem.getTreePrice());
                    Long plantArticleId = _projectArticleRepository.findArticleIdByProjectAndTreeType(projectname, plantItemName);

                    Tree tree = createTree(amount, cart.getTimeStamp(), cart.getBuyer(), plantArticleId);
                    
                    cart.addCartItem(createCartItem(amount, treePrice, totalPrice, plantArticleId, tree));
                }
            }
        }
        return cart;
    }

    public Cart convertSimplePlantPageDataToCart(SimplePlantBag simplePlantPageData) {
        User buyer = _userRepository.findOne(simplePlantPageData.getUserId());
        
        Cart cart = new Cart();
        cart.setTimeStamp(System.currentTimeMillis());
        cart.setBuyer(buyer);

        for (SimplePlantPageItem simplePlantPageItem : simplePlantPageData.getPlantItems()) {
            int amount = (int) simplePlantPageItem.getAmount();

            long treePriceAsLong = simplePlantPageItem.getTreePrice();

            String projectName = simplePlantPageItem.getProjectName();
            String plantItemName = simplePlantPageItem.getTreeType();

            BigDecimal treePrice = PriceHelper.fromLongToBigDecimal(treePriceAsLong);
            BigDecimal totalPrice = PriceHelper.fromLongToBigDecimal(amount * treePriceAsLong);

            Long plantArticleId = _projectArticleRepository.findArticleIdByProjectAndTreeType(projectName, plantItemName);

            Tree tree = createTree(amount, cart.getTimeStamp(), cart.getBuyer(), plantArticleId);
            
            cart.addCartItem(createCartItem(amount, treePrice, totalPrice, plantArticleId, tree));
        }
        return cart;
    }
    
    private Tree createTree(int amount, long plantedOn, User owner, long projectArticleId){
        Tree tree = new Tree();
        Project project = _projectArticleRepository.findOne(projectArticleId)
                                                   .getProject();
        ProjectArticle projectArticle = _projectArticleRepository.findOne(projectArticleId);
        
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

    private CartItem createCartItem(int amount, BigDecimal treePrice, BigDecimal totalPrice, Long articleId, Tree tree) {
        CartItem cartItem = new CartItem();
        cartItem.setAmount(amount);
        cartItem.setBasePricePerPiece(treePrice);
        cartItem.setTotalPrice(totalPrice);
        cartItem.setPlantArticleId(articleId);
        cartItem.setTree(tree);
        
        return cartItem;
    }

}
