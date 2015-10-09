package org.dicadeveloper.weplantaforest.admin.codes;

import java.util.List;

import org.dicadeveloper.weplantaforest.base.GenericService;

public interface CouponService extends GenericService<Coupon, CouponDto, Long> {

    List<CouponDto> generateCoupons(Long eventId, int numberOfCoupons, int numberOfTrees);

}
