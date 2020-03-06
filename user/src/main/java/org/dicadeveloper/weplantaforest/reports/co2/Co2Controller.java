package org.dicadeveloper.weplantaforest.reports.co2;

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
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class Co2Controller {

    private @NonNull Co2Repository _co2Repository;

    // @Cacheable(value = CacheConfiguration.TEN_MINUTE_CACHE)
    @RequestMapping(value = Uris.REPORT_CO2, method = RequestMethod.GET)
    public ResponseEntity<?> getAmount() {
        Co2Data co2Data = _co2Repository.getAllTreesAndCo2Saving(System.currentTimeMillis());
        return new ResponseEntity<>(co2Data, HttpStatus.OK);
    }

    @RequestMapping(value = Uris.REPORT_CO2_FOR_USER, method = RequestMethod.GET)
    public ResponseEntity<?> getTreesAndCo2ForUser(@RequestParam("userName") String userName) {
        Co2Data co2Data = _co2Repository.getAllTreesAndCo2SavingForUserName(System.currentTimeMillis(), userName);
        return new ResponseEntity<>(co2Data, HttpStatus.OK);
    }

}
