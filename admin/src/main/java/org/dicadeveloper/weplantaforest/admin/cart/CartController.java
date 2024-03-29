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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.node.ObjectNode;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class CartController {

    private @NonNull CartRepository cartRepository;

    private @NonNull TreeRepository treeRepository;

    private @NonNull CartService cartService;

    @RequestMapping(value = Uris.CARTS, method = RequestMethod.POST)
    @JsonView(Views.OverviewCart.class)
    public Iterable<Cart> getAllCarts(@RequestBody CartRequest cartRequest) {
        return cartService.searchCarts(cartRequest);
    }

    @RequestMapping(value = "/cart/{cartId}/address", method = RequestMethod.PUT)
    public ResponseEntity<Void> saveStreet(@PathVariable long cartId, @RequestBody ObjectNode address) {
        // TODO: validate
        cartService.saveAddress(cartId, address);
        return ResponseEntity.noContent().build();
    }

    @RequestMapping(value = "/cart/{cartId}")
    @Transactional
    @JsonView(Views.CartDetails.class)
    public Cart getCartDetails(@PathVariable(value = "cartId") Long cartId) {
        return cartRepository.findById(cartId).orElse(null);
    }

    @PostMapping(value = "/cart/receiptable")
    @JsonView(Views.OverviewCart.class)
    public Cart setReceiptable(@RequestParam Long cartId, @RequestParam boolean receiptable) {
        return cartService.setReceiptable(cartId, receiptable);
    }

    @RequestMapping(value = Uris.CHANGE_CART_STATE, method = RequestMethod.POST)
    public ResponseEntity<?> changeCartState(@RequestParam Long cartId, @RequestParam CartState cartState) {
        if (cartRepository.existsById(cartId)) {
            Cart cart = cartRepository.findById(cartId).orElse(null);
            cart.setCartState(cartState);
            if (CartState.DISCARDED.equals(cartState)) {
                List<Tree> treesToDelete = new ArrayList<>();
                for (CartItem cartItem : cart.getCartItems()) {
                    Tree tree = cartItem.getTree();
                    treesToDelete.add(tree);
                    cartItem.removeTree();
                }
                treeRepository.deleteAll(treesToDelete);
            }
            cartRepository.save(cart);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }
}
