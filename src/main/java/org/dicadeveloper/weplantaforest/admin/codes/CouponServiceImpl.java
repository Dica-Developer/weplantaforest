package org.dicadeveloper.weplantaforest.admin.codes;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.UUID;

import org.dicadeveloper.weplantaforest.base.GenericServiceImpl;
import org.dozer.DozerBeanMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CouponServiceImpl extends GenericServiceImpl<Coupon, CouponDto, Long> implements CouponService {

    private EventRepository _eventRepository;

    @Autowired
    public CouponServiceImpl(DozerBeanMapper mapper, CouponRepository repository, EventRepository eventRepository) {
        super(mapper, repository);
        _eventRepository = eventRepository;
    }

    public List<CouponDto> generateCoupons(Long eventId, int numberOfCoupons, int numberOfTrees) {
        Event event = _eventRepository.getOne(eventId);

        final Calendar cal = Calendar.getInstance();
        final int year = cal.get(Calendar.YEAR);
        final int month = cal.get(Calendar.MONTH);

        List<CouponDto> coupons = new ArrayList<>();
        for (int i = 0; i < numberOfCoupons; i++) {
            CouponDto couponDto = new CouponDto();
            final Coupon coupon = new Coupon();
            coupon.setEvent(event);
            coupon.setYear(year);
            coupon.setMonth(month);
            coupon.setTreeCount(numberOfTrees);
            coupon.setCode(generateNewCode());
            _repository.save(coupon);
            coupons.add(couponDto);
        }
        return coupons;
    }

    private String generateNewCode() {
        String randomUUID = UUID.randomUUID().toString();
        String code = randomUUID.substring(4, randomUUID.lastIndexOf('-')).toUpperCase();
        while (((CouponRepository) _repository).existCouponWithCode(code)) {
            code = randomUUID.substring(4, randomUUID.lastIndexOf('-')).toUpperCase();
        }
        return code;
    }

}
