package org.dicadeveloper.weplantaforest.abo;

import java.util.List;

import org.dicadeveloper.weplantaforest.abo.Abo.Period;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBagValidator;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.views.Views;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class AboController {

    private @NonNull AboRepository _aboRepository;

    private @NonNull PlantBagValidator _plantBagValidator;

    private @NonNull AboHelper _aboHelper;

    @RequestMapping(value = Uris.ABOS_BY_USER + "{userId}", method = RequestMethod.GET)
    @JsonView(Views.AboOverview.class)
    public List<Abo> getAbosFromUser(@PathVariable("userId") long userId) {
        return _aboRepository.findAbosByUserId(userId);
    }

    @RequestMapping(value = Uris.ABO_CREATE, method = RequestMethod.POST)
    @Transactional
    public ResponseEntity<?> createAbo(@RequestBody AboRequestData aboRequest) {
        if (_plantBagValidator.isPlantPageDataValid(aboRequest.getPlantBag())) {
            Abo abo = _aboHelper.createAboFromAboRequest(aboRequest);
            _aboRepository.save(abo);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @RequestMapping(value = Uris.ABO_EDIT, method = RequestMethod.POST)
    @Transactional
    public ResponseEntity<?> editAbo(@RequestBody AboEditData aboEditData) {
        Abo abo = _aboRepository.findOne(aboEditData.aboId);
        abo.setAmount(aboEditData.getAmount());
        abo.setPeriod(Period.valueOf(aboEditData.getPeriod()));
        _aboRepository.save(abo);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = Uris.ABO_CANCEL, method = RequestMethod.POST)
    @Transactional
    public ResponseEntity<?> cancelAbo(@RequestParam long aboId) {
        Abo abo = _aboRepository.findOne(aboId);
        abo.setActive(false);
        _aboRepository.save(abo);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
