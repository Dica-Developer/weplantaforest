package org.dicadeveloper.weplantaforest.admin.cart;

import org.dicadeveloper.weplantaforest.views.Views;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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

    @RequestMapping(value = "/carts", method = RequestMethod.GET)
    @JsonView(Views.OverviewCart.class)
    public Page<Cart> getAllCarts(@RequestParam int page, @RequestParam int size) {
        return _cartRepository.findAllCarts(new PageRequest(page, size));
    }
}
