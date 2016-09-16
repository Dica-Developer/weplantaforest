package org.dicadeveloper.weplantaforest.abo;

import org.dicadeveloper.weplantaforest.abo.Abo.Period;
import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.support.PlantBagToCartConverter;
import org.dicadeveloper.weplantaforest.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AboHelper {
    
    @Autowired
    private PlantBagToCartConverter _plantBagToCartConverter;

    public Abo createAboFromAboRequest(AboRequestData aboRequest, User buyer){
        long createdOn = System.currentTimeMillis();
        
        Abo abo = new Abo();
        abo.setActive(true);
        abo.setAmount(aboRequest.getAmount());
        abo.setPeriod(Period.valueOf(aboRequest.getPeriod()));
        abo.setTimeStamp(createdOn);
        
        Cart cart = _plantBagToCartConverter.convertPlantPageDataToCart(aboRequest.getPlantBag(), buyer);
        cart.setAbo(abo);
        
        abo.setCurrentCart(cart);
        abo.getCarts().add(cart);
        abo.setLast(createdOn);
        
        abo.setUser(cart.getBuyer());
     
        return abo;
    }
    
}
