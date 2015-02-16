package org.dicadeveloper.weplantaforest.controller;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.util.List;

import javax.ws.rs.core.MediaType;

import org.dicadeveloper.weplantaforest.PATHS;
import org.dicadeveloper.weplantaforest.persist.dto.TreeTypeDto;
import org.dicadeveloper.weplantaforest.services.TreeTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.ExposesResourceFor;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Component
@Controller
@RequestMapping(PATHS.PATH_TREE_TYPES)
@ExposesResourceFor(TreeTypeDto.class)
public class TreeTypeController {

    @Autowired
    private TreeTypeService _treeTypeService;

    @RequestMapping(value = "/", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON })
    public HttpEntity<Resources<Resource<TreeTypeDto>>> getTreeTypes() {
        List<TreeTypeDto> treeTypes = _treeTypeService.findAll();
        if (treeTypes.isEmpty()) {
            final String name = "Ahorn";
            final String description = "Die Ahorne (Acer) bilden eine Pflanzengattung in der Unterfamilie der Rosskastaniengewächse (Hippocastanoideae) innerhalb der Familie der Seifenbaumgewächse (Sapindaceae). ";
            TreeTypeDto treeType = new TreeTypeDto(name, description);
            _treeTypeService.save(treeType);
        }
        Resources<Resource<TreeTypeDto>> treeTypeResources = Resources.wrap(treeTypes);
        treeTypeResources.add(linkTo(methodOn(TreeTypeController.class).getTreeTypes()).withSelfRel());
        return new ResponseEntity<Resources<Resource<TreeTypeDto>>>(treeTypeResources, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON })
    public HttpEntity<Resource<TreeTypeDto>> getTreeType(@PathVariable("id") Long id) {
        if (id == null) {
            return new ResponseEntity<Resource<TreeTypeDto>>(HttpStatus.NOT_FOUND);
        }
        TreeTypeDto treeType = _treeTypeService.findOne(id);
        Resource<TreeTypeDto> treeTypeResource = new Resource(treeType);
        treeTypeResource.add(linkTo(methodOn(TreeTypeController.class).getTreeType(id)).withSelfRel());
        treeTypeResource.add(linkTo(methodOn(TreeTypeController.class).getTreeTypes()).withRel("parent"));
        return new ResponseEntity<Resource<TreeTypeDto>>(treeTypeResource, HttpStatus.OK);
    }

}
