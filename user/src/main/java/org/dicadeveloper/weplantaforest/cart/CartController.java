package org.dicadeveloper.weplantaforest.cart;

import java.util.List;

import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.views.Views;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class CartController {

    private @NonNull CartRepository _cartRepository;

    @RequestMapping(value = Uris.CART_SHORT_VIEW + "{userId}", method = RequestMethod.GET)
    @JsonView(Views.ShortCart.class)
    public List<Cart> getShortCartsByUser(@PathVariable("userId") long userId) {
        return _cartRepository.findCartsByUserId(userId);
    }
}
