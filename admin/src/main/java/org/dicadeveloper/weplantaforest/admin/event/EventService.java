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
import org.dicadeveloper.weplantaforest.admin.errorhandling.IpatPreconditions;
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
        IpatPreconditions.checkNotNull(event, ErrorCodes.EVENT_IS_NULL);
        IpatPreconditions.checkArgument(event.getId() == null, ErrorCodes.EVENT_ALREADY_EXISTS);
        return _eventRepository.save(event);
    }

    public Event getEvent(Long eventId) throws IpatException {        
        Event event = _eventRepository.findOne(eventId);
        IpatPreconditions.checkNotNull(event, ErrorCodes.EVENT_IS_NULL);
        return event;
    }

    @Transactional
    public void delete(Long eventId) throws IpatException {
        Event event = getEvent(eventId);
        List<Cart> cartsForEvent = _cartRepository.findByEvent(event);
        List<Code> codesForEvent = _codeRepository.findByEvent(event);
        for (Cart cart : cartsForEvent) {
            if (cart.getCartState().equals(CartState.VERIFIED)) {
                throw new IpatException(ErrorCodes.CART_ALREADY_REDEEMED);
            }
        }
        for (Cart cart : cartsForEvent) {
            _cartRepository.delete(cart);
        }

        for (Code code : codesForEvent) {
            _codeRepository.delete(code);
        }
        _eventRepository.delete(event);
    }

    public Event update(Event event) throws IpatException {
        IpatPreconditions.checkNotNull(event, ErrorCodes.EVENT_IS_NULL);
        IpatPreconditions.checkNotNull(event.getId(), ErrorCodes.EVENT_ALREADY_EXISTS);
        return _eventRepository.save(event);
    }

    @Transactional
    public void generateCodes(Long eventId, List<Long> cartIds) throws IpatException {
        Event event = _eventRepository.findOne(eventId);
        IpatPreconditions.checkNotNull(event, ErrorCodes.EVENT_NOT_FOUND);
        for (int i = 0; i < cartIds.size(); i++) {
            generateCode(event, cartIds.get(i));
        }
    }

    private void generateCode(Event event, Long cartId) throws IpatException {
        Cart cart = _cartRepository.findOne(cartId);
        IpatPreconditions.checkNotNull(event, ErrorCodes.CART_IS_NULL);
        Code code = _codeService.generateCode();
        code.setEvent(event);
        code = _codeRepository.save(code);
        cart.setEvent(event);
        cart.setCode(code);
        _cartRepository.save(cart);
        //TODO: think about to remove one of both references
        code.setCart(cart);
        _codeRepository.save(code);
    }

}
