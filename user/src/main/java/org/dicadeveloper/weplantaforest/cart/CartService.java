package org.dicadeveloper.weplantaforest.cart;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.dicadeveloper.weplantaforest.common.errorhandling.IpatException;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBag;
import org.dicadeveloper.weplantaforest.support.PlantBagToCartConverter;
import org.dicadeveloper.weplantaforest.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class CartService {

    private @NonNull PlantBagToCartConverter plantPageToCartConverter;

    private @NonNull CartRepository _cartRepository;

    public Long createCartAndSave(PlantBag plantBag, User buyer, CartState cartState) throws IpatException {
        Cart cart = plantPageToCartConverter.convertPlantPageDataToCart(plantBag, buyer, cartState);
        cart = _cartRepository.save(cart);
        return cart.getId();
    }

    public List<Long> createCarts(PlantBag plantBag, User buyer, CartState cartState, int amountOfPlantBags) throws IpatException {
        List<Long> cartIds = new ArrayList<>();
        for (int i = 0; i < amountOfPlantBags; i++) {
            long cartId = createCartAndSave(plantBag, buyer, cartState);
            cartIds.add(cartId);
        }
        return cartIds;
    }

    public Map<String, List<Cart>> groupCartsByUser(List<Cart> carts) {
        Map<String, List<Cart>> userCartMap = new HashMap<>();
        for (Cart cart : carts) {
            String userName = cart.getBuyer().getUsername();
            if (userCartMap.containsKey(userName)) {
                userCartMap.get(userName).add(cart);
            } else {
                List<Cart> newCartList = new ArrayList<>();
                newCartList.add(cart);
                userCartMap.put(userName, newCartList);
            }
        }
        return userCartMap;
    }

}
