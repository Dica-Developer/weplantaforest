package org.dicadeveloper.weplantaforest.scheduling;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.cart.CartRepository;
import org.dicadeveloper.weplantaforest.code.Code;
import org.dicadeveloper.weplantaforest.code.CodeRepository;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import lombok.NonNull;

@Service
public class ScheduledTasks {

    private static final Log LOG = LogFactory.getLog(ScheduledTasks.class.getName());

    private final static long FOUR_HOURS_IN_MILLISECONDS = 14400000;

    @Autowired
    private @NonNull CartRepository _cartRepository;

    @Autowired
    private @NonNull TreeRepository _treeRepository;

    @Autowired
    private @NonNull CodeRepository _codeRepostiory;
    //
    // @Scheduled(fixedRate = DAY_IN_MILLISECONDS)
    // public void checkAbos() {
    //
    // }

    @Scheduled(fixedRate = FOUR_HOURS_IN_MILLISECONDS)
    private void cleanUpInitialCarts() {
        List<Cart> carts = _cartRepository.findInitialCartsOlderThanFourHours(System.currentTimeMillis());
        for (Cart cart : carts) {
            // quick fix because of fk constraint violations
            // TODO: if there's a code, there has to be also a Gift i think,
            // think this should also be checked
            if (cart.getCode() != null) {
                Code code = cart.getCode();
                code.setCart(null);
                cart.setCode(null);
                _codeRepostiory.delete(code);
            }
        }
        _cartRepository.delete(carts);
        LOG.info("deleted initial carts(" + carts.size() + ") and their trees");

    }
}
