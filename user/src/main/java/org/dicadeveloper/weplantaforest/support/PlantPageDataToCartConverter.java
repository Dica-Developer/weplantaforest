package org.dicadeveloper.weplantaforest.support;

import java.math.BigDecimal;
import java.util.Set;

import org.dicadeveloper.weplantaforest.admin.codes.Cart;
import org.dicadeveloper.weplantaforest.admin.codes.CartItem;
import org.dicadeveloper.weplantaforest.planting.PlantItem;
import org.dicadeveloper.weplantaforest.planting.PlantPageData;
import org.dicadeveloper.weplantaforest.projects.ProjectArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import lombok.NonNull;

@Component
public class PlantPageDataToCartConverter {

    private @NonNull ProjectArticleRepository _projectArticleRepository;

    @Autowired
    public PlantPageDataToCartConverter(ProjectArticleRepository projectArticleRepository) {
        _projectArticleRepository = projectArticleRepository;
    }

    public Cart convertPlantPageDataToCart(PlantPageData plantPageData) {
        Cart cart = new Cart();

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

                    double treePrice = plantItem.getTreePrice();
                    double totalPrice = amount * plantItem.getTreePrice();
                    Long plantArticleId = _projectArticleRepository.findArticleIdByProjectAndTreeType(projectname,
                            plantItemName);
                    
                    cart.addCartItem(createCartItem(amount, treePrice, totalPrice, plantArticleId));
                }
            }

        }

        return cart;
    }

    private CartItem createCartItem(int amount, double treePrice, double totalPrice, Long articleId) {
        CartItem cartItem = new CartItem();
        cartItem.setAmount(amount);
        cartItem.setBasePricePerPiece(new BigDecimal(treePrice));
        cartItem.setTotalPrice(new BigDecimal(totalPrice));
        cartItem.setPlantArticleId(articleId);
        return cartItem;
    }

}
