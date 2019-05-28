package org.dicadeveloper.weplantaforest.cart;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends CrudRepository<Cart, Long> {

    public final static String FIND_CARTS_BUY_USER_ID = "SELECT cart from Cart cart where cart.buyer.id = :userId";

    public final static String FIND_CART_BUY_USER_AND_INITIAL = "SELECT * from Cart where _buyer__userId  = :userId AND _cartState = \'INITIAL\' LIMIT 1";

    public final static String FIND_VERIFIED_CARTS_BUY_USER_ID = "SELECT cart from Cart cart where cart.buyer.id = :userId AND cart.cartState = \'VERIFIED\'";

    public final static String FIND_CART_BY_CODE = "SELECT cart from Cart cart WHERE cart.code.code = :codeString";

    public final static String FIND_INITIAL_CARTS_OLDER_HALF_HOUR = "SELECT cart FROM Cart cart WHERE ((:time - cart.timeStamp) > 1800000) AND cart.cartState = \'INITIAL\'";

    public final static String FIND_RECEIPTABLE_CARTS = "select * from Cart where _cartState = 'VERIFIED' AND _receipt__receiptId IS NULL AND _receiptable is TRUE AND ((UNIX_TIMESTAMP() * 1000) - _timeStamp) > (4.838 * POWER(10, 9))";
    
    public final static String FIND_LAST_PAYED_CART_BY_USER = "SELECT * FROM Cart WHERE _cartState IN( 'CALLBACK', 'VERIFIED') AND _callBackZahlungsart = 'SEPA' AND _buyer__userId = :userId ORDER BY _timeStamp DESC LIMIT 1";
    
    public List<Cart> findCartsByIdIn(@Param("id") Long[] ids);

    @Query(value = FIND_CARTS_BUY_USER_ID)
    public List<Cart> findCartsByUserId(@Param("userId") long userId);

    @Query(value = FIND_CART_BUY_USER_AND_INITIAL, nativeQuery = true)
    public Cart findCartByUserAndOpen(@Param("userId") long userId);

    @Query(value = FIND_VERIFIED_CARTS_BUY_USER_ID)
    public List<Cart> findVerifiedCartsByUserId(@Param("userId") long userId);

    @Query(value = FIND_CART_BY_CODE)
    public Cart findCartByCode(@Param("codeString") String codeString);

    @Query(value = FIND_INITIAL_CARTS_OLDER_HALF_HOUR)
    public List<Cart> findInitialCartsOlderThanHalfHour(@Param("time") long timeOfMeasurement);

    @Query(value = FIND_RECEIPTABLE_CARTS, nativeQuery = true)
    public List<Cart> findReceiptableCarts();

    @Query(value = FIND_LAST_PAYED_CART_BY_USER, nativeQuery = true)
    public Cart getDetailsOfLastCartByUser(@Param("userId") long userId);

}
