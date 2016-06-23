package org.dicadeveloper.weplantaforest.abo;

import java.util.List;

import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.views.Views;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class AboController {

    private @NonNull AboRepository _aboRepository;

    @RequestMapping(value = Uris.ABOS_BY_USER + "{userId}", method = RequestMethod.GET)
    @JsonView(Views.AboOverview.class)
    public List<Abo> getAbosFromUser(@PathVariable("userId") long userId) {
        return _aboRepository.findAbosByUserId(userId);
    }

}
