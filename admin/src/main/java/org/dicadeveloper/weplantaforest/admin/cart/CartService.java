package org.dicadeveloper.weplantaforest.admin.cart;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class CartService {

    @Autowired
    private @NonNull CartRepository _cartRepository;
    
    @PersistenceContext
    EntityManager entityManager;
    
    @SuppressWarnings("unchecked")
    public Iterable<Cart> searchCarts(CartRequest cartRequest) {
        Iterable<Cart> results = new ArrayList<>();
        results = entityManager.createNativeQuery(createQueryString(cartRequest), Cart.class).getResultList();
        return results;
    }
    
    public Cart setReceiptable(Long cartId, boolean receiptable) {
        Cart cart = _cartRepository.findById(cartId).orElse(null);
        cart.setReceiptable(receiptable);
        _cartRepository.save(cart);
        return cart;
    }
        
    private String createQueryString(CartRequest cartRequest) {
        String query = "SELECT * FROM Cart ";
        if(areThereFilterOptionsSet(cartRequest)) {
            query += "WHERE ";
            query = addCartStateReqstriction(cartRequest, query);
            query = addFromRestriction(cartRequest, query);
            query = addToRestriction(cartRequest, query);
            query = query.substring(0, query.length() - 3);
        }
        System.out.println("query: " + query);
        return query;
    }
        
    private String addCartStateReqstriction(CartRequest cartRequest, String query) {
        List<String> cartStates = cartRequest.getCartStates();
        if(cartStates != null && cartStates.size() > 0) {
            query += "_cartState IN('";
            query += StringUtils.join(cartStates, "','");
            query += "') AND";
        }
        return query;
    }
    
    private String addFromRestriction(CartRequest cartRequest, String query) {
        if(cartRequest.getFrom() != null) {
            query += " _timeStamp > " + cartRequest.getFrom() + " AND";
        }
        return query;
    }
    
    private String addToRestriction(CartRequest cartRequest, String query) {
        if(cartRequest.getTo() != null) {
            query += " _timeStamp < " + cartRequest.getTo() + " AND";
        }
        return query;
    }
    
    private boolean areThereFilterOptionsSet(CartRequest cartRequest) {
        return (cartRequest.getCartStates() != null && cartRequest.getCartStates().size() > 0) || (cartRequest.getFrom() != null) || (cartRequest.getTo() != null);
    }
}
