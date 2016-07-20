package org.dicadeveloper.weplantaforest.admin.gift;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface GiftRepository extends CrudRepository<Gift, Long> {

    public final static String FIND_GIFTS_BY_CONSIGNOR_ID = "SELECT gift FROM Gift gift where gift.consignor.id = :userId";

    public final static String FIND_GIFTS_BY_RECIPIENT_ID = "SELECT gift FROM Gift gift where gift.recipient.id = :userId";
    
    public final static String FIND_GIFT_BY_CODE = "SELECT gift from Gift gift where gift.code.code = :codeString";

    @Query(value = FIND_GIFTS_BY_CONSIGNOR_ID)
    public List<Gift> findGiftsByConsignor(@Param("userId") Long userId);

    @Query(value = FIND_GIFTS_BY_RECIPIENT_ID)
    public List<Gift> findGiftsByRecipient(@Param("userId") Long userId);
    
    @Query(value = FIND_GIFT_BY_CODE)
    public Gift findGiftByCode(@Param("codeString") String codeString);
}
