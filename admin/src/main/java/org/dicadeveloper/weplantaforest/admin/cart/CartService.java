package org.dicadeveloper.weplantaforest.admin.cart;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.node.ObjectNode;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class CartService {

    @Autowired
    private @NonNull CartRepository cartRepository;

    @PersistenceContext
    EntityManager entityManager;

    @SuppressWarnings("unchecked")
    public Iterable<Cart> searchCarts(CartRequest cartRequest) {
        Iterable<Cart> results = new ArrayList<>();
        results = entityManager.createNativeQuery(createQueryString(cartRequest), Cart.class).getResultList();
        return results;
    }

    public Cart setReceiptable(Long cartId, boolean receiptable) {
        Cart cart = cartRepository.findById(cartId).orElse(null);
        cart.setReceiptable(receiptable);
        cartRepository.save(cart);
        return cart;
    }

    private String createQueryString(CartRequest cartRequest) {
        String query = "SELECT * FROM Cart ";
        if (areThereFilterOptionsSet(cartRequest)) {
            query += "WHERE ";
            query = addCartStateReqstriction(cartRequest, query);
            query = addFromRestriction(cartRequest, query);
            query = addToRestriction(cartRequest, query);
            query = query.substring(0, query.length() - 3);
        }
        return query;
    }

    private String addCartStateReqstriction(CartRequest cartRequest, String query) {
        List<String> cartStates = cartRequest.getCartStates();
        if (cartStates != null && cartStates.size() > 0) {
            query += "_cartState IN('";
            query += StringUtils.join(cartStates, "','");
            query += "') AND";
        }
        return query;
    }

    private String addFromRestriction(CartRequest cartRequest, String query) {
        if (cartRequest.getFrom() != null) {
            query += " _timeStamp > " + cartRequest.getFrom() + " AND";
        }
        return query;
    }

    private String addToRestriction(CartRequest cartRequest, String query) {
        if (cartRequest.getTo() != null) {
            query += " _timeStamp < " + cartRequest.getTo() + " AND";
        }
        return query;
    }

    private boolean areThereFilterOptionsSet(CartRequest cartRequest) {
        return (cartRequest.getCartStates() != null && cartRequest.getCartStates().size() > 0) || (cartRequest.getFrom() != null) || (cartRequest.getTo() != null);
    }

    @Transactional
    public void saveAddress(long cartId, ObjectNode address) {
        cartRepository.findById(cartId).ifPresent(cart -> {
            if (address.has("company")) {
                Optional.ofNullable(address.get("company")).ifPresent((field) -> cart.setCallBackFirma(field.asText()));
            }
            if (address.has("lastName")) {
                Optional.ofNullable(address.get("lastName")).ifPresent((field) -> cart.setCallBackNachname(field.asText()));
            }
            if (address.has("firstName")) {
                Optional.ofNullable(address.get("firstName")).ifPresent((field) -> cart.setCallBackVorname(field.asText()));
            }
            if (address.has("street")) {
                Optional.ofNullable(address.get("street")).ifPresent((field) -> cart.setCallBackStrasse(field.asText()));
            }
            if (address.has("city")) {
                Optional.ofNullable(address.get("city")).ifPresent((field) -> cart.setCallBackOrt(field.asText()));
            }
            if (address.has("postalcode")) {
                Optional.ofNullable(address.get("postalcode")).ifPresent((field) -> cart.setCallBackPlz(field.asText()));
            }
            cartRepository.save(cart);
        });
    }
}
