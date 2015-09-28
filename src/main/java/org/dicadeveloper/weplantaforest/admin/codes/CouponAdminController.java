package org.dicadeveloper.weplantaforest.admin.codes;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.dicadeveloper.weplantaforest.trees.TreeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.ExposesResourceFor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@ExposesResourceFor(TreeDto.class)
@RestController
public class CouponAdminController {

    @Autowired
    private CouponService _couponService;

    private CartService _cartService;

    @RequestMapping(value = "/rest/v1/admin/coupons", method = RequestMethod.POST)
    public void generateCoupons(Long eventId, Long projectId, int numberOfCoupons, Map<Long, Integer> couponComposition) {
        // validate parameters

        // coupon generation
        // TODO calculate number of trees from composition map
        int numberOfTrees = 0;
        List<Coupon> coupons = _couponService.generateCoupons(eventId, numberOfCoupons, numberOfTrees);
        // freischalten
        for (Coupon coupon : coupons) {
            Cart cart = _cartService.generateCart(coupon);
            cart.setCartItems(null);
            for (Entry<Long, Integer> treesPerType : couponComposition.entrySet()) {
                CartItem cartItem = new CartItem();
                cartItem.setCart(cart);
                cartItem.setAmount(treesPerType.getValue());
                cartItem.setTreeType(null);
                // // generate trees
                // cartItem.setTreeId(null);
            }
            coupon.setEvaluated(true);
        }

        // return result
    }
}
