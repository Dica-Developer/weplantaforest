package org.dicadeveloper.weplantaforest.admin.cart;

import java.util.List;

import org.dicadeveloper.weplantaforest.admin.event.Event;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends CrudRepository<Cart, Long> {

    public final static String FIND_CARTS_BUY_USER_ID = "SELECT cart from Cart cart where cart.buyer.id = :userId";

    public final static String FIND_CART_BY_CODE = "SELECT cart from Cart cart WHERE cart.code.code = :codeString";

    public List<Cart> findCartsByIdIn(@Param("id") Long[] ids);

    @Query(value = FIND_CARTS_BUY_USER_ID)
    public List<Cart> findCartsByUserId(@Param("userId") long userId);

    @Query(value = FIND_CART_BY_CODE)
    public Cart findCartByCode(@Param("codeString") String codeString);

    public List<Cart> findByEvent(@Param("event") Event event);
    
    public List<Cart> findAllByOrderByIdDesc();
}
