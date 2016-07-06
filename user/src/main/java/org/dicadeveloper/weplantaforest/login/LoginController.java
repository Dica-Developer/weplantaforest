package org.dicadeveloper.weplantaforest.login;

import org.dicadeveloper.weplantaforest.encryption.PasswordEncrypter;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class LoginController {

    private @NonNull PasswordEncrypter _passwordEncrypter;

    private @NonNull LoginValidator _loginValidator;

    @RequestMapping(value = Uris.LOGIN, method = RequestMethod.POST)
    public ResponseEntity<?> login(@RequestParam("name") String name, @RequestParam("password") String password) {
        String encryptedPassword = _passwordEncrypter.encryptPassword(password);
        if (_loginValidator.validateLogin(name, encryptedPassword)) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
