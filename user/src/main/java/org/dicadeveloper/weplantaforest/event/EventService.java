package org.dicadeveloper.weplantaforest.event;

import javax.transaction.Transactional;

import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.cart.CartRepository;
import org.dicadeveloper.weplantaforest.cart.CartState;
import org.dicadeveloper.weplantaforest.code.Code;
import org.dicadeveloper.weplantaforest.code.CodeRepository;
import org.dicadeveloper.weplantaforest.common.errorhandling.ErrorCodes;
import org.dicadeveloper.weplantaforest.common.errorhandling.IpatException;
import org.dicadeveloper.weplantaforest.common.errorhandling.IpatPreconditions;
import org.dicadeveloper.weplantaforest.team.Team;
import org.dicadeveloper.weplantaforest.team.TeamService;
import org.dicadeveloper.weplantaforest.trees.Tree;
import org.dicadeveloper.weplantaforest.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class EventService {

    @NonNull
    private CartRepository _cartRepository;

    @NonNull
    private CodeRepository _codeRepository;

    @NonNull
    private TeamService _teamService;

    @Transactional
    public void redeemEventCode(User recipient, String eventCode) throws IpatException {
        Cart cartForEventCode = _cartRepository.findCartByCode(eventCode);
        Team team = null;
        if (null == cartForEventCode) {
            Code code = _codeRepository.findByCode(eventCode);
            IpatPreconditions.checkNotNull(code, ErrorCodes.INVALID_CODE);
            IpatPreconditions.checkNotNull(code.getEvent(), ErrorCodes.EVENT_IS_NULL);
            cartForEventCode = _cartRepository.findOneCartByEventAndGenerated(code.getEvent().getId());
            IpatPreconditions.checkNotNull(cartForEventCode, ErrorCodes.CART_TO_EVENT_CODE_IS_NULL);
            cartForEventCode.setCode(code);
            code.setCart(cartForEventCode);
            team = code.getEvent().getTeam();
        } else {
            IpatPreconditions.checkNotNull(cartForEventCode, ErrorCodes.CART_TO_EVENT_CODE_IS_NULL);
        }

        boolean isCartAlreadyVerified = cartForEventCode.getCartState().equals(CartState.VERIFIED);
        IpatPreconditions.checkArgument(!isCartAlreadyVerified, ErrorCodes.CODE_ALREADY_REDEEMED);

        cartForEventCode.setCartState(CartState.VERIFIED);
        for (Tree cartTree : cartForEventCode.getTrees()) {
            cartTree.setOwner(recipient);
        }
        _cartRepository.save(cartForEventCode);

        if (null != team && null == recipient.getTeam()) {
            _teamService.joinTeam(recipient.getId(), team.getId());
        }
    }
}
