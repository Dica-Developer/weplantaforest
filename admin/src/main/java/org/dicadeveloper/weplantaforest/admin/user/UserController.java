package org.dicadeveloper.weplantaforest.admin.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class UserController {
    
    private @NonNull UserRepository _userRepository;

    
    @RequestMapping(value="/users", method = RequestMethod.GET )
    public Page<User> getAllUser(@RequestParam int page, @RequestParam int size){
        return _userRepository.findAllUser(new PageRequest(page, size));
    }
}
