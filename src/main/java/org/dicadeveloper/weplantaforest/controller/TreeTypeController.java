package org.dicadeveloper.weplantaforest.controller;

import javax.ws.rs.core.MediaType;

import org.dicadeveloper.weplantaforest.persist.dto.TreeTypeDto;
import org.dicadeveloper.weplantaforest.services.TreeTypeService;
import org.dicadeveloper.weplantaforest.util.UtilConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

@RestController
public class TreeTypeController {

    @Autowired
    private TreeTypeService _treeTypeService;

    @RequestMapping(value = "/rest/v1/treetypes", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON })
    public HttpEntity<Resources<Resource<TreeTypeDto>>> getTreeTypes(@PageableDefault(size = UtilConstants.DEFAULT_RETURN_RECORD_COUNT, page = 0, sort = { "_name" }) Pageable pageable) {
        Page<TreeTypeDto> treeTypes = _treeTypeService.findAll(pageable);
        Resources<Resource<TreeTypeDto>> treeTypeResources = Resources.wrap(treeTypes);
        treeTypeResources.add(linkTo(methodOn(TreeTypeController.class).getTreeTypes(pageable)).withSelfRel());
        return new ResponseEntity<Resources<Resource<TreeTypeDto>>>(treeTypeResources, HttpStatus.OK);
    }

    @RequestMapping(value = "/rest/v1/treetypes/{id}", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON })
    public HttpEntity<Resource<TreeTypeDto>> getTreeType(@PathVariable("id") Long id) {
        if (id == null) {
            return new ResponseEntity<Resource<TreeTypeDto>>(HttpStatus.NOT_FOUND);
        }
        TreeTypeDto treeType = _treeTypeService.findOne(id);
        Resource<TreeTypeDto> treeTypeResource = new Resource(treeType);
        treeTypeResource.add(linkTo(methodOn(TreeTypeController.class).getTreeType(id)).withSelfRel());
        treeTypeResource.add(linkTo(methodOn(TreeTypeController.class).getTreeTypes(null)).withRel("parent"));
        return new ResponseEntity<Resource<TreeTypeDto>>(treeTypeResource, HttpStatus.OK);
    }

}
