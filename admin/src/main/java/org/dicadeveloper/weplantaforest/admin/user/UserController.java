package org.dicadeveloper.weplantaforest.admin.user;

import org.dicadeveloper.weplantaforest.admin.support.Uris;
import org.dicadeveloper.weplantaforest.common.user.Role;
import org.dicadeveloper.weplantaforest.views.Views;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class UserController {

    private @NonNull UserRepository _userRepository;

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    @JsonView(Views.OverviewUser.class)
    public Iterable<User> getAllUser() {
        return _userRepository.findAll();
    }

    @RequestMapping(value = Uris.USERNAME_CHANGE, method = RequestMethod.POST)
    public ResponseEntity<?> updateUsername(@RequestParam long userId, @RequestParam String newUsername) {
        User user = _userRepository.findOne(userId);
        if (user != null) {
            if (_userRepository.userExists(newUsername) == 1) {
                return new ResponseEntity<>(String.format("Ein Nutzer mit diesem Namen(%s) existiert bereits. ", newUsername), HttpStatus.BAD_REQUEST);
            } else {
                user.setName(newUsername);
            }
            _userRepository.save(user);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(String.format("Kein Nutzer mit dieser ID [%s] vorhanden.", userId), HttpStatus.BAD_REQUEST);
        }
    }
    
    @RequestMapping(value = Uris.MAIL_CHANGE, method = RequestMethod.POST)
    public ResponseEntity<?> updateMailaddress(@RequestParam long userId, @RequestParam String newMail) {
        User user = _userRepository.findOne(userId);
        if (user != null) {
            if (_userRepository.userWithMailExists(newMail) == 1) {
                return new ResponseEntity<>(String.format("Es existiert bereits ein User mit dieser EMail Adresse(%s).", newMail), HttpStatus.BAD_REQUEST);
            } else {
                user.setMail(newMail);
            }
            _userRepository.save(user);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(String.format("Kein Nutzer mit dieser ID [%s] vorhanden.", userId), HttpStatus.BAD_REQUEST);
        }
    }
    
    @RequestMapping(value = Uris.ACTIVE_CHANGE, method = RequestMethod.POST)
    public ResponseEntity<?> updateActiveFlag(@RequestParam long userId, @RequestParam boolean activeFlag){
        User user = _userRepository.findOne(userId);
        if (user != null) {
            user.setEnabled(activeFlag);
            _userRepository.save(user);
            return new ResponseEntity<>(HttpStatus.OK);            
        }else{
            return new ResponseEntity<>(String.format("Kein Nutzer mit dieser ID [%s] vorhanden.", userId), HttpStatus.BAD_REQUEST);  
        }
    }
    
    @RequestMapping(value = Uris.BANNED_CHANGE, method = RequestMethod.POST)
    public ResponseEntity<?> updateBannedFlag(@RequestParam long userId, @RequestParam boolean bannedFlag){
        User user = _userRepository.findOne(userId);
        if (user != null) {
            user.setBanned(bannedFlag);
            _userRepository.save(user);
            return new ResponseEntity<>(HttpStatus.OK);            
        }else{
            return new ResponseEntity<>(String.format("Kein Nutzer mit dieser ID [%s] vorhanden.", userId), HttpStatus.BAD_REQUEST);  
        }
    }
    
    @RequestMapping(value = Uris.ROLE_ADMIN_CHANGE, method = RequestMethod.POST)
    public ResponseEntity<?> updateAdminRole(@RequestParam long userId, @RequestParam boolean shouldBeAdmin){
        User user = _userRepository.findOne(userId);
        if (user != null) {
               if(shouldBeAdmin && !user.hasRole(Role.ADMIN)){
                   user.addRole(Role.ADMIN);                   
               }else if(!shouldBeAdmin && user.hasRole(Role.ADMIN)){
                   user.removeRole(Role.ADMIN);
               }
               _userRepository.save(user);
            return new ResponseEntity<>(HttpStatus.OK);            
        }else{
            return new ResponseEntity<>(String.format("Kein Nutzer mit dieser ID [%s] vorhanden.", userId), HttpStatus.BAD_REQUEST);  
        }        
    }
    
    @RequestMapping(value = Uris.ROLE_ARTICLE_MANAGER_CHANGE, method = RequestMethod.POST)
    public ResponseEntity<?> updateArticleManagerRole(@RequestParam long userId, @RequestParam boolean shouldBeArticleManager){
        User user = _userRepository.findOne(userId);
        if (user != null) {
               if(shouldBeArticleManager && !user.hasRole(Role.ARTICLE_MANAGER)){
                   user.addRole(Role.ARTICLE_MANAGER);                   
               }else if(!shouldBeArticleManager && user.hasRole(Role.ARTICLE_MANAGER)){
                   user.removeRole(Role.ARTICLE_MANAGER);
               }
               _userRepository.save(user);
            return new ResponseEntity<>(HttpStatus.OK);            
        }else{
            return new ResponseEntity<>(String.format("Kein Nutzer mit dieser ID [%s] vorhanden.", userId), HttpStatus.BAD_REQUEST);  
        }
        
    }
    
    
}
