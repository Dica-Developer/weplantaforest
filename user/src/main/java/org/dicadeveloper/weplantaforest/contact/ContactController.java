package org.dicadeveloper.weplantaforest.contact;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
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
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ContactController {

    protected final Log LOG = LogFactory.getLog(ContactController.class.getName());

    private @NonNull ContactService _contactService;

    @RequestMapping(value = Uris.CONTACT, method = RequestMethod.POST)
    public ResponseEntity<?> sendContactMail(@RequestBody ContactDTO contactDTO) {
        _contactService.sendContactMail(contactDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
