package org.dicadeveloper.weplantaforest.admin.event;

import java.util.List;

import javax.transaction.Transactional;

import org.dicadeveloper.weplantaforest.admin.cart.Cart;
import org.dicadeveloper.weplantaforest.admin.cart.CartRepository;
import org.dicadeveloper.weplantaforest.admin.cart.CartState;
import org.dicadeveloper.weplantaforest.admin.code.Code;
import org.dicadeveloper.weplantaforest.admin.code.CodeRepository;
import org.dicadeveloper.weplantaforest.admin.code.CodeService;
import org.dicadeveloper.weplantaforest.common.errorhandling.ErrorCodes;
import org.dicadeveloper.weplantaforest.common.errorhandling.IpatException;
import org.dicadeveloper.weplantaforest.common.errorhandling.IpatPreconditions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private CodeService codeService;

    @Autowired
    CodeRepository codeRepository;

    @Autowired
    CartRepository cartRepository;

    public Event create(Event event) throws IpatException {
        IpatPreconditions.checkNotNull(event, ErrorCodes.EVENT_IS_NULL);
        IpatPreconditions.checkArgument(event.getId() == null, ErrorCodes.EVENT_ALREADY_EXISTS);
        return eventRepository.save(event);
    }

    public Event getEvent(Long eventId) throws IpatException {
        Event event = eventRepository.findById(eventId).orElse(null);
        IpatPreconditions.checkNotNull(event, ErrorCodes.EVENT_IS_NULL);
        return event;
    }

    @Transactional
    public void delete(Long eventId) throws IpatException {
        Event event = getEvent(eventId);
        List<Cart> cartsForEvent = cartRepository.findByEvent(event);
        List<Code> codesForEvent = codeRepository.findByEvent(event);
        for (Cart cart : cartsForEvent) {
            if (cart.getCartState().equals(CartState.VERIFIED)) {
                throw new IpatException(ErrorCodes.CART_ALREADY_REDEEMED);
            }
        }
        for (Cart cart : cartsForEvent) {
            cartRepository.delete(cart);
        }

        for (Code code : codesForEvent) {
            codeRepository.delete(code);
        }
        eventRepository.delete(event);
    }

    public Event update(Event event) throws IpatException {
        IpatPreconditions.checkNotNull(event, ErrorCodes.EVENT_IS_NULL);
        IpatPreconditions.checkNotNull(event.getId(), ErrorCodes.EVENT_ALREADY_EXISTS);
        return eventRepository.save(event);
    }

    @Transactional
    public void generateCodes(Long eventId, List<Long> cartIds) throws IpatException {
        Event event = eventRepository.findById(eventId).orElse(null);
        IpatPreconditions.checkNotNull(event, ErrorCodes.EVENT_NOT_FOUND);
        for (int i = 0; i < cartIds.size(); i++) {
            generateCode(event, cartIds.get(i));
        }
    }

    private void generateCode(Event event, Long cartId) throws IpatException {
        Cart cart = cartRepository.findById(cartId).orElse(null);
        IpatPreconditions.checkNotNull(event, ErrorCodes.CART_IS_NULL);
        Code code = codeService.generateCode();
        code.setEvent(event);
        code = codeRepository.save(code);
        cart.setEvent(event);
        cart.setCode(code);
        cartRepository.save(cart);
        // TODO: think about to remove one of both references
        code.setCart(cart);
        codeRepository.save(code);
    }

}
