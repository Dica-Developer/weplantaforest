package org.dicadeveloper.weplantaforest.payment;

import org.dicadeveloper.weplantaforest.common.errorhandling.IpatException;
import org.dicadeveloper.weplantaforest.security.TokenAuthenticationService;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.val;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class PaymentController {

    private @NonNull PaymentService _paymentService;

    private @NonNull TokenAuthenticationService _tokenAuthenticationService;

    @RequestMapping(value = Uris.PAY_PLANTBAG, method = RequestMethod.POST)
    public ResponseEntity<?> payPlantBag(@RequestHeader(value = "X-AUTH-TOKEN") String userToken, @RequestBody PaymentData paymentData) throws IpatException {
        val buyer = _tokenAuthenticationService.getUserFromToken(userToken);
        _paymentService.payPlantBag(paymentData, buyer);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
