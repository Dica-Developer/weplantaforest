package org.dicadeveloper.weplantaforest.login;

import org.dicadeveloper.weplantaforest.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class LoginValidator {

    @Autowired
    private UserRepository _userRepository;

    @Autowired
    private LoginValidator(UserRepository userRepository) {
        _userRepository = userRepository;
    }

    protected boolean validateLogin(String userName, String enteredPassword) {
        return userExists(userName) && isPasswordCorrect(userName, enteredPassword);
    }

    private boolean userExists(String userName) {
        return _userRepository.userExists(userName) == 1 ? true : false;
    }

    private boolean isPasswordCorrect(String userName, String enteredPassword) {
        return _userRepository.getPasswordByUserName(userName)
                              .equals(enteredPassword);

    }
}
