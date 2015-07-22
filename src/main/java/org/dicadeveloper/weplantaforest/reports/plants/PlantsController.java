package org.dicadeveloper.weplantaforest.reports.plants;

import javax.ws.rs.core.MediaType;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Component
@RestController
public class PlantsController {

    @RequestMapping(value = "/rest/v1/reports/plants/neweset", produces = { MediaType.APPLICATION_JSON })
    public String newest() {
        return null;
    }
}
