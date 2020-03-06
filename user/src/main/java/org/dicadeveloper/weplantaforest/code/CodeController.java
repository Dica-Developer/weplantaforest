package org.dicadeveloper.weplantaforest.code;

import org.dicadeveloper.weplantaforest.common.errorHandling.IpatException;
import org.dicadeveloper.weplantaforest.security.TokenAuthenticationService;
import org.dicadeveloper.weplantaforest.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class CodeController {

    private final static String REQUEST_URL = "/code";

    private @NonNull TokenAuthenticationService _tokenAuthenticationService;

    private @NonNull CodeService _codeService;

    @PostMapping(value = REQUEST_URL + "/redeem")
    public ResponseEntity<?> redeemCode(@RequestHeader(value = "X-AUTH-TOKEN") String userToken, @RequestParam String codeString) throws IpatException {
        User recipient = _tokenAuthenticationService.getUserFromToken(userToken);
        if (recipient != null) {
            _codeService.redeemCode(recipient, codeString);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

}
