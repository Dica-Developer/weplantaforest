package org.dicadeveloper.weplantaforest.payment;

import org.dicadeveloper.weplantaforest.common.errorHandling.IpatException;
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

    private @NonNull PaymentService _paymentService;

    @RequestMapping(value = Uris.PAY_PLANTBAG, method = RequestMethod.POST)
    public ResponseEntity<?> payPlantBag(@RequestBody PaymentData paymentData) throws IpatException {
        _paymentService.payPlantBag(paymentData);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
