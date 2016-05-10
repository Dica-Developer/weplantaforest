package org.dicadeveloper.weplantaforest.reports.co2;

import org.dicadeveloper.weplantaforest.CacheConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class Co2Controller {

    private @NonNull Co2Repository _co2Repository;

    @Cacheable(value = CacheConfiguration.TEN_MINUTE_CACHE)
    @RequestMapping(value = "/reports/co2", method = RequestMethod.GET)
    public Co2Data getAmount() {
        return _co2Repository.getAllTreesAndCo2Saving(System.currentTimeMillis());
    }

}
