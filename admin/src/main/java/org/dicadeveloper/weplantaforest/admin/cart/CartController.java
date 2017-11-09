package org.dicadeveloper.weplantaforest.admin.cart;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.dicadeveloper.weplantaforest.admin.support.Uris;
import org.dicadeveloper.weplantaforest.admin.tree.Tree;
import org.dicadeveloper.weplantaforest.admin.tree.TreeRepository;
import org.dicadeveloper.weplantaforest.admin.views.Views;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class CartController {

    private @NonNull CartRepository _cartRepository;

    private @NonNull TreeRepository _treeRepository;

    @RequestMapping(value = Uris.CARTS, method = RequestMethod.GET)
    @JsonView(Views.OverviewCart.class)
    public Iterable<Cart> getAllCarts() {
        return _cartRepository.findAllByOrderByIdDesc();
    }

    @RequestMapping(value = "/cart/{cartId}")
    @Transactional
    @JsonView(Views.CartDetails.class)
    public Cart getCartDetails(@PathVariable(value = "cartId") Long cartId) {
        return _cartRepository.findOne(cartId);
    }

    @RequestMapping(value = Uris.CHANGE_CART_STATE, method = RequestMethod.POST)
    public ResponseEntity<?> changeCartState(@RequestParam Long cartId, @RequestParam CartState cartState) {
        if (_cartRepository.exists(cartId)) {
            Cart cart = _cartRepository.findOne(cartId);
            cart.setCartState(cartState);
            if (CartState.DISCARDED.equals(cartState)) {
                List<Tree> treesToDelete = new ArrayList<>();
                for (CartItem cartItem : cart.getCartItems()) {
                    Tree tree = cartItem.getTree();
                    treesToDelete.add(tree);
                    cartItem.removeTree();
                }
                _treeRepository.delete(treesToDelete);
            }
            _cartRepository.save(cart);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

}
