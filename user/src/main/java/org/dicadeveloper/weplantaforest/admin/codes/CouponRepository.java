package org.dicadeveloper.weplantaforest.admin.codes;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CouponRepository extends CrudRepository<Coupon, Long> {

    @Query("select coupon from Code coupon where coupon._code = :code")
    public boolean existCouponWithCode(@Param("code") String code);
}
