package org.dicadeveloper.weplantaforest.admin.codes;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.dicadeveloper.weplantaforest.projects.ProjectDto;
import org.dicadeveloper.weplantaforest.projects.ProjectService;
import org.dicadeveloper.weplantaforest.trees.TreeDto;
import org.dicadeveloper.weplantaforest.trees.TreeService;
import org.dicadeveloper.weplantaforest.treetypes.TreeTypeDto;
import org.dicadeveloper.weplantaforest.treetypes.TreeTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.ExposesResourceFor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.collect.ImmutableMap;

@ExposesResourceFor(TreeDto.class)
@RestController
public class CouponAdminController {

    @Autowired
    private CouponService _couponService;

    @Autowired
    private CartService _cartService;

    @Autowired
    private TreeTypeService _treeTypeService;

    @Autowired
    private TreeService _treeService;

    @Autowired
    private ProjectService _projectService;

    public void generate1000() {
        generateCoupons(16L, 14L, 1000, ImmutableMap.of(12L, 1, 9L, 1));
    }

    public void generate500() {
        generateCoupons(16L, 14L, 500, ImmutableMap.of(12L, 1, 20L, 1));
    }

    @RequestMapping(value = "/rest/v1/admin/coupons", method = RequestMethod.POST)
    public void generateCoupons(Long eventId, Long projectId, int numberOfCoupons, Map<Long, Integer> couponComposition) {
        // validate parameters
        ProjectDto projectDto = _projectService.findOne(projectId);

        // coupon generation
        int numberOfTrees = 0;
        for (Entry<Long, Integer> entry : couponComposition.entrySet()) {
            numberOfTrees += entry.getValue();
        }
        List<CouponDto> coupons = _couponService.generateCoupons(eventId, numberOfCoupons, numberOfTrees);
        // freischalten
        for (CouponDto coupon : coupons) {
            CartDto cart = new CartDto();
            cart.setCartState(CartState.VERIFIED);
            List<CartItemDto> cartItems = new ArrayList<CartItemDto>();
            for (Entry<Long, Integer> treesPerType : couponComposition.entrySet()) {
                TreeTypeDto treeTypeDto = _treeTypeService.findOne(treesPerType.getKey());

                TreeDto treeDto = new TreeDto(projectDto.getLatitude(), projectDto.getLongitude(), treesPerType.getValue());
                treeDto.setOwner(coupon.getOwner());
                treeDto.setTreeType(treeTypeDto);
                treeDto.setPlantedOn(treeDto.getSubmittedOn());
                // treeDto.setImageId(projectDto.getImageId());
                _treeService.save(treeDto);

                CartItemDto cartItem = new CartItemDto();
                cartItem.setCart(cart);
                cartItem.setAmount(treesPerType.getValue());
                cartItem.setTreeType(treeTypeDto);
                cartItem.setTreeId(treeDto.getDtoId());
                cartItems.add(cartItem);
            }
            cart.setCartItems(cartItems);
            _cartService.save(cart);
            coupon.setEvaluated(true);
            _couponService.save(coupon);
        }

        // return result
    }
}
