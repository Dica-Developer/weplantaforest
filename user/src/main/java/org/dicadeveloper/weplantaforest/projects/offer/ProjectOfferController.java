package org.dicadeveloper.weplantaforest.projects.offer;

import javax.validation.Valid;

import org.dicadeveloper.weplantaforest.common.mail.MailHelper;
import org.dicadeveloper.weplantaforest.security.TokenAuthenticationService;
import org.dicadeveloper.weplantaforest.user.User;
import org.dicadeveloper.weplantaforest.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class ProjectOfferController {

    private @NonNull UserRepository _userRepository;

    private @NonNull MailHelper _mailHelper;
    
    private @NonNull TokenAuthenticationService _tokenAuthenticationService;

    @RequestMapping(value = "/project/offer", method = RequestMethod.POST)
    public ResponseEntity<?> offerProject(@RequestHeader(value = "X-AUTH-TOKEN") String userToken, @Valid @RequestBody ProjectOfferData projectOffer, BindingResult bindingResult) {
        if (!bindingResult.hasErrors()) {
            final String subject = ProjectOfferHelper.createSubject(projectOffer.getName(), projectOffer.getMail());
            String text;

            User user = _tokenAuthenticationService.getUserFromToken(userToken);
            text = ProjectOfferHelper.createMailText(projectOffer, user);

            new Thread(new Runnable() {
                public void run() {
                    _mailHelper.sendAMessage(subject, text);
                }
            }).start();

            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
