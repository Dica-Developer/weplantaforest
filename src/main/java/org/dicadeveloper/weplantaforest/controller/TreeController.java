package org.dicadeveloper.weplantaforest.controller;

import java.util.Date;
import java.util.List;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status.Family;
import javax.ws.rs.core.Response.StatusType;

import org.dicadeveloper.weplantaforest.PATHS;
import org.dicadeveloper.weplantaforest.persist.dto.TreeDto;
import org.dicadeveloper.weplantaforest.persist.dto.TreeTypeDto;
import org.dicadeveloper.weplantaforest.services.TreeService;
import org.dicadeveloper.weplantaforest.services.TreeTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.ExposesResourceFor;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

@ExposesResourceFor(TreeDto.class)
@RestController
public class TreeController {

    @Autowired
    private TreeService _treeService;

    @Autowired
    TreeTypeService _treeTypeSerivce;

    @RequestMapping(value = PATHS.PATH_TREES, method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON })
    public HttpEntity<Resources<Resource<TreeDto>>> getTrees() {
        System.out.println("GET trees");
        List<TreeDto> trees = _treeService.findAll();
        Resources<Resource<TreeDto>> treeResources = Resources.wrap(trees);
        treeResources.add(linkTo(methodOn(TreeController.class).getTrees()).withSelfRel());

        return new ResponseEntity<Resources<Resource<TreeDto>>>(treeResources, HttpStatus.OK);
    }

    @RequestMapping(value = PATHS.PATH_TREES + "/{id}", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON })
    public HttpEntity<Resource<TreeDto>> getTree(@PathVariable("id") Long treeId) {
        if (treeId == null) {
            return new ResponseEntity<Resource<TreeDto>>(HttpStatus.NOT_FOUND);
        }
        TreeDto tree = _treeService.findOne(treeId);

        Long treeTypeId = _treeService.findTreeTypeIdByTreeId(treeId);

        Resource<TreeDto> treeResource = new Resource(tree);
        treeResource.add(linkTo(methodOn(TreeController.class).getTree(treeId)).withSelfRel());
        treeResource.add(linkTo(methodOn(TreeController.class).getTrees()).withRel("parent"));
        treeResource.add(linkTo(methodOn(TreeTypeController.class).getTreeType(treeTypeId)).withRel("treeType"));
        return new ResponseEntity<Resource<TreeDto>>(treeResource, HttpStatus.OK);
    }

    @RequestMapping(value = PATHS.PATH_TREES, method = RequestMethod.POST, consumes = { MediaType.APPLICATION_JSON }, produces = { MediaType.APPLICATION_JSON })
    public Response createTree(@RequestBody TreeDto tree) {
        // TODO validation
        System.out.println("POST trees");
        TreeTypeDto treeType = _treeTypeSerivce.findByName(tree.getTreeTypeName());
        if (treeType.equals(TreeTypeDto.NO_TREE_TYPE)) {
            Response response = Response.status(new StatusType() {

                @Override
                public int getStatusCode() {
                    return 400;
                }

                @Override
                public String getReasonPhrase() {
                    return "You must define the tree type '" + tree.getTreeTypeName() + "' first.";
                }

                @Override
                public Family getFamily() {
                    return Family.CLIENT_ERROR;
                }
            }).entity(new TreeDto()).build();
            return response;
        }
        tree.setPlantedOn(new Date());
        tree.setSubmittedOn(new Date());
        _treeService.save(tree);
        Response response = Response.status(200).entity(tree).build();
        return response;
    }

}
