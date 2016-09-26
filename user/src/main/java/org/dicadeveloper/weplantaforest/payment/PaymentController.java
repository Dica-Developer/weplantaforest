package org.dicadeveloper.weplantaforest.payment;

import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.cart.CartRepository;
import org.dicadeveloper.weplantaforest.gift.Gift;
import org.dicadeveloper.weplantaforest.gift.Gift.Status;
import org.dicadeveloper.weplantaforest.gift.GiftRepository;
import org.dicadeveloper.weplantaforest.messages.MessageByLocaleService;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class PaymentController {

    private @NonNull PaymentHelper _paymentHelper;

    private @NonNull CartRepository _cartRepository;

    private @NonNull GiftRepository _giftRepository;

    private @NonNull MessageByLocaleService _messageByLocaleService;

    @RequestMapping(value = Uris.PAY_PLANTBAG, method = RequestMethod.POST)
    public ResponseEntity<?> payPlantBag(@RequestBody PaymentData paymentData) {
        Cart cartToPay = _cartRepository.findOne(paymentData.getCartId());
        String paymentRequestResponse = _paymentHelper.postRequest(cartToPay, paymentData);

        if (_paymentHelper.isSuccessFull(paymentRequestResponse)) {
            cartToPay.setCallBackValuesAndStateToCallBack(paymentData);
            _cartRepository.save(cartToPay);
            if (paymentData.getGiftId() != null) {
                Gift giftToPay = _giftRepository.findOne(paymentData.getGiftId());
                giftToPay.setStatus(Status.UNREDEEMED);
                _giftRepository.save(giftToPay);
            }
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            String errorCode = _paymentHelper.getErrorCode(paymentRequestResponse);
            String paymentErrorMessage = _messageByLocaleService.getMessage("sozialbank." + errorCode, cartToPay.getBuyer().getLang().getLocale());
            return new ResponseEntity<String>(paymentErrorMessage, HttpStatus.BAD_REQUEST);
        }
    }

}
