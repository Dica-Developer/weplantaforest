package org.dicadeveloper.weplantaforest.admin.codes;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Long> {

    @Query("select coupon from Code coupon where coupon._code = :code")
    public boolean existCouponWithCode(@Param("code") String code);
}
