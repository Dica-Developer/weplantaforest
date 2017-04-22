package org.dicadeveloper.weplantaforest.event;

import javax.transaction.Transactional;

import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.cart.CartRepository;
import org.dicadeveloper.weplantaforest.cart.CartState;
import org.dicadeveloper.weplantaforest.common.errorHandling.ErrorCodes;
import org.dicadeveloper.weplantaforest.common.errorHandling.IpatException;
import org.dicadeveloper.weplantaforest.common.errorHandling.IpatPreconditions;
import org.dicadeveloper.weplantaforest.trees.Tree;
import org.dicadeveloper.weplantaforest.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class EventService {

    private @NonNull EventRepository _eventRepository;
    
    private @NonNull CartRepository _cartRepository;
    
    @Transactional
    public void redeemEventCode(User recipient, String eventCode) throws IpatException{
        Cart cartForEventCode = _cartRepository.findCartByCode(eventCode);
        IpatPreconditions.checkNotNull(cartForEventCode, ErrorCodes.CART_TO_EVENT_CODE_IS_NULL);

        boolean isCartAlreadyVerified = cartForEventCode.getCartState().equals(CartState.VERIFIED);        
        IpatPreconditions.checkArgument(!isCartAlreadyVerified, ErrorCodes.CODE_ALREADY_REDEEMED);
        
        cartForEventCode.setCartState(CartState.VERIFIED);
        for (Tree cartTree : cartForEventCode.getTrees()) {
            cartTree.setOwner(recipient);
        }
        _cartRepository.save(cartForEventCode);      
    }
}
