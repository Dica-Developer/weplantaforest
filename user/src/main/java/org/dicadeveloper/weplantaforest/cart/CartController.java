package org.dicadeveloper.weplantaforest.cart;

import java.util.List;

import org.dicadeveloper.weplantaforest.security.TokenAuthenticationService;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.user.User;
import org.dicadeveloper.weplantaforest.views.Views;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestHeader;
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

    @Autowired
    private TokenAuthenticationService _tokenAuthenticationService;

    /*
     * get all verified carts by userId
     */
    @RequestMapping(value = Uris.VERIFIFIED_CART_SHORT_VIEW + "{userId}", method = RequestMethod.GET)
    @JsonView(Views.ShortCart.class)
    public ResponseEntity<List<Cart>> getShortCartsByUser(@RequestHeader(value = "X-AUTH-TOKEN") String userToken) {
        User owner = _tokenAuthenticationService.getUserFromToken(userToken);
        if (owner == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            List<Cart> cartList = _cartRepository.findVerifiedCartsByUserId(owner.getId());
            return new ResponseEntity<>(cartList, HttpStatus.OK);
        }
    }
}
