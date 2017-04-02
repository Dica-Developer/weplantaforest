package org.dicadeveloper.weplantaforest.admin.event;

import java.util.List;

import javax.transaction.Transactional;

import org.dicadeveloper.weplantaforest.admin.cart.Cart;
import org.dicadeveloper.weplantaforest.admin.cart.CartRepository;
import org.dicadeveloper.weplantaforest.admin.cart.CartState;
import org.dicadeveloper.weplantaforest.admin.code.Code;
import org.dicadeveloper.weplantaforest.admin.code.CodeRepository;
import org.dicadeveloper.weplantaforest.admin.code.CodeService;
import org.dicadeveloper.weplantaforest.admin.errorhandling.ErrorCodes;
import org.dicadeveloper.weplantaforest.admin.errorhandling.IpatException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventService {

    @Autowired
    private EventRepository _eventRepository;

    @Autowired
    private CodeService _codeService;

    @Autowired
    CodeRepository _codeRepository;

    @Autowired
    CartRepository _cartRepository;

    public Event create(Event event) throws IpatException {
        if (event != null) {
            if (event.getId() == null) {
                return _eventRepository.save(event);
            } else {
                throw new IpatException(ErrorCodes.EVENT_ALREADY_EXISTS);
            }
        } else {
            throw new IpatException(ErrorCodes.EVENT_IS_NULL);
        }
    }

    @Transactional
    public void delete(Long eventId) throws IpatException {
        Event event = _eventRepository.findOne(eventId);
        if (event != null) {
            List<Cart> cartsForEvent = _cartRepository.findByEvent(event);
            List<Code> codesForEvent = _codeRepository.findByEvent(event);
            for(Cart cart : cartsForEvent){
                if(cart.getCartState().equals(CartState.VERIFIED) ){
                    throw new IpatException(ErrorCodes.CART_ALREADY_REDEEMED);
                }
            }
            for(Cart cart : cartsForEvent){
                _cartRepository.delete(cart);
            }
            
            for(Code code : codesForEvent){
                _codeRepository.delete(code);
            }            
            _eventRepository.delete(event);
        } else {
            throw new IpatException(ErrorCodes.EVENT_NOT_FOUND, eventId);
        }
    }

    public Event update(Event event) throws IpatException {
        if (event != null) {
            Long eventId = event.getId();
            if (eventId != null) {
                event = _eventRepository.save(event);
                return event;
            } else {
                throw new IpatException(ErrorCodes.EVENT_ID_IS_NULL);
            }
        } else {
            throw new IpatException(ErrorCodes.EVENT_IS_NULL);
        }
    }

    @Transactional
    public void generateCodes(Long eventId, List<Long> cartIds) throws IpatException {
        Event event = _eventRepository.findOne(eventId);
        if (event != null) {
            for (int i = 0; i < cartIds.size(); i++) {
                generateCode(event, cartIds.get(i));
            }
        } else {
            throw new IpatException(ErrorCodes.EVENT_NOT_FOUND, eventId);
        }
    }

    private void generateCode(Event event, Long cartId) throws IpatException {
        Cart cart = _cartRepository.findOne(cartId);
        if(cart != null){
            Code code = _codeService.generateCode();
            code.setEvent(event);
            _codeRepository.save(code);
            cart.setEvent(event);
            cart.setCode(code);
            _cartRepository.save(cart);            
        }else{
            throw new IpatException(ErrorCodes.CART_IS_NULL);
        }

    }

}
