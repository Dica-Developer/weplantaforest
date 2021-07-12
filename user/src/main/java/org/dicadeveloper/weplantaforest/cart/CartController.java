package org.dicadeveloper.weplantaforest.cart;

import java.util.List;

import org.dicadeveloper.weplantaforest.security.TokenAuthenticationService;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.user.UserRepository;
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
import lombok.val;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class CartController {

    private @NonNull CartRepository _cartRepository;

    @Autowired
    private TokenAuthenticationService _tokenAuthenticationService;

    @Autowired
    private UserRepository _userRepository;

    /*
     * get all verified carts by userId
     */
    @RequestMapping(value = Uris.VERIFIFIED_CART_SHORT_VIEW + "{userId}", method = RequestMethod.GET)
    @JsonView(Views.ShortCart.class)
    public ResponseEntity<List<Cart>> getShortCartsByUser(@RequestHeader(value = "X-AUTH-TOKEN") String userToken) {
        val user = _tokenAuthenticationService.getUserFromToken(userToken);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            val userId = _userRepository.findByName(user.getName()).getId();
            val cartList = _cartRepository.findVerifiedCartsByUserId(userId);
            return new ResponseEntity<>(cartList, HttpStatus.OK);
        }
    }

    @RequestMapping(value = Uris.LAST_CART, method = RequestMethod.GET)
    @JsonView(Views.LastCartDetails.class)
    public ResponseEntity<Cart> getDetailsOfLastCart(@RequestHeader(value = "X-AUTH-TOKEN") String userToken) {
        val user = _tokenAuthenticationService.getUserFromToken(userToken);
        if (user != null) {
            val userId = _userRepository.findByName(user.getName()).getId();
            val cart = _cartRepository.getDetailsOfLastCartByUser(userId);
            return new ResponseEntity<>(cart, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
