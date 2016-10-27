package org.dicadeveloper.weplantaforest.scheduling;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.cart.CartItem;
import org.dicadeveloper.weplantaforest.cart.CartRepository;
import org.dicadeveloper.weplantaforest.trees.Tree;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import lombok.NonNull;

@Service
public class ScheduledTasks {

    private static final Log LOG = LogFactory.getLog(ScheduledTasks.class.getName());

    private final static long DAY_IN_MILLISECONDS = 86400000;
    
    private final static long FOUR_HOURS_IN_MILLISECONDS = 14400000;
    
    @Autowired
    private @NonNull CartRepository _cartRepository;
    @Autowired
    private @NonNull TreeRepository _treeRepository;
//        
//    @Scheduled(fixedRate = DAY_IN_MILLISECONDS)
//    public void checkAbos() {
//        
//    }
    
    
    @Scheduled(fixedRate = FOUR_HOURS_IN_MILLISECONDS)
    private void cleanUpInitialCarts(){
        List<Cart> carts = _cartRepository.findInitialCartsOlderThanFourHours(System.currentTimeMillis());
        List<Tree> treesToDelete = new ArrayList<>();
        for(Cart cart : carts){
            for(CartItem cartItem : cart.getCartItems()){
                if(cartItem.getTree() != null){
                    treesToDelete.add(cartItem.getTree());
                    cartItem.removeTree();                                 
                }
            }
            _cartRepository.save(cart);
            for(Tree treeToDelete : treesToDelete){
                _treeRepository.delete(treeToDelete);
            }
        }
        LOG.info("cleaned up initial carts");
    }
}
