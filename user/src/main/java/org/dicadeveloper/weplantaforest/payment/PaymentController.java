package org.dicadeveloper.weplantaforest.payment;

import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.cart.CartRepository;
import org.dicadeveloper.weplantaforest.cart.CartState;
import org.dicadeveloper.weplantaforest.common.errorHandling.ErrorCodes;
import org.dicadeveloper.weplantaforest.common.errorHandling.IpatException;
import org.dicadeveloper.weplantaforest.common.errorHandling.IpatPreconditions;
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
import org.springframework.web.bind.annotation.RequestParam;
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
    public ResponseEntity<?> payPlantBag(@RequestBody PaymentData paymentData) throws IpatException {
        Cart cartToPay = _cartRepository.findOne(paymentData.getCartId());
        IpatPreconditions.checkNotNull(cartToPay, ErrorCodes.CART_IS_NULL);
        String paymentRequestResponse = _paymentHelper.postRequestSepa(cartToPay, paymentData);
        IpatPreconditions.checkArgument(!_paymentHelper.isConnectionError(paymentRequestResponse), ErrorCodes.BANK_CONNECTION_ERROR);
        IpatPreconditions.checkArgument(!_paymentHelper.isUndefinedError(paymentRequestResponse), ErrorCodes.BANK_UNDEFINED_ERROR);
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
            throw new IpatException(PaymentHelper.BANK_ERRORS.get("BANK_" + errorCode));
        }
    }

    @RequestMapping(value = Uris.VALIDATE_CC_DATA, method = RequestMethod.POST)
    public ResponseEntity<?> validatePlantBagCC(@RequestBody PaymentData paymentData) throws IpatException {
        Cart cartToPay = _cartRepository.findOne(paymentData.getCartId());
        IpatPreconditions.checkNotNull(cartToPay, ErrorCodes.CART_IS_NULL);
        String paymentRequestResponse = _paymentHelper.postRequestCC(cartToPay, paymentData);
        IpatPreconditions.checkArgument(!_paymentHelper.isConnectionError(paymentRequestResponse), ErrorCodes.BANK_CONNECTION_ERROR);
        IpatPreconditions.checkArgument(!_paymentHelper.isUndefinedError(paymentRequestResponse), ErrorCodes.BANK_UNDEFINED_ERROR);
        if (_paymentHelper.isSuccessFullCC(paymentRequestResponse)) {
            cartToPay.setCallBackValues(paymentData);
            _cartRepository.save(cartToPay);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            String errorCode = _paymentHelper.getErrorCode(paymentRequestResponse);
            throw new IpatException(PaymentHelper.BANK_ERRORS.get("BANK_" + errorCode));
        }
    }

    @RequestMapping(value = Uris.SUBMIT_CC_PAYED_PLANTBAG, method = RequestMethod.POST)
    public ResponseEntity<?> submitCCpayedPlantBag(@RequestParam long cartId) throws IpatException{
        Cart cartToSubmit = _cartRepository.findOne(cartId);
        IpatPreconditions.checkNotNull(cartToSubmit, ErrorCodes.CART_IS_NULL);
        cartToSubmit.setCartState(CartState.CALLBACK);
        _cartRepository.save(cartToSubmit);
        if (cartToSubmit.getCode() != null) {
            Gift giftToSubmit = _giftRepository.findGiftByCode(cartToSubmit.getCode()
                                                                           .getCode());
            giftToSubmit.setStatus(Status.UNREDEEMED);
            _giftRepository.save(giftToSubmit);
        }
        return new ResponseEntity<>(HttpStatus.OK);

    }
    
    @RequestMapping(value = Uris.SUBMIT_PAYPAL_PAYED_PLANTBAG, method = RequestMethod.POST)
    public ResponseEntity<?> submitPaypalPayedPlantBag(@RequestBody PaymentData paymentData) throws IpatException{
        Cart cartToSubmit = _cartRepository.findOne(paymentData.getCartId());
        IpatPreconditions.checkNotNull(cartToSubmit, ErrorCodes.CART_IS_NULL);
        cartToSubmit.setCallBackValuesAndStateToCallBack(paymentData);
        _cartRepository.save(cartToSubmit);
        if (cartToSubmit.getCode() != null) {
            Gift giftToSubmit = _giftRepository.findGiftByCode(cartToSubmit.getCode()
                                                                           .getCode());
            giftToSubmit.setStatus(Status.UNREDEEMED);
            _giftRepository.save(giftToSubmit);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    

}
