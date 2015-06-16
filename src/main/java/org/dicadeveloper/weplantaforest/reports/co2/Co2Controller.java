package org.dicadeveloper.weplantaforest.reports.co2;

import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.ExposesResourceFor;
import org.springframework.hateoas.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

@Component
@RequestMapping(value = "/rest/v1/", produces = { MediaType.APPLICATION_JSON })
@ExposesResourceFor(Co2Dto.class)
@Produces(MediaType.APPLICATION_JSON)
@Controller
public class Co2Controller {

    private Co2Service _co2Service;

    @Autowired
    public Co2Controller(Co2Service co2Service) {
        _co2Service = co2Service;
    }

    @RequestMapping(value = "reports/co2", method = RequestMethod.GET)
    public HttpEntity<Resource<Co2Dto>> getAmount() {
        Co2Dto co2Dto = _co2Service.getGetCo2OfAllTrees();
        Resource<Co2Dto> treeResources = new Resource<Co2Dto>(co2Dto);
        treeResources.add(linkTo(methodOn(Co2Controller.class).getAmount()).withSelfRel());

        return new ResponseEntity<Resource<Co2Dto>>(treeResources, HttpStatus.OK);
    }
}
