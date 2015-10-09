package org.dicadeveloper.weplantaforest.trees;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.util.ArrayList;
import java.util.Date;

import javax.annotation.Nullable;
import javax.ws.rs.core.MediaType;

import org.dicadeveloper.weplantaforest.treetypes.TreeTypeDto;
import org.dicadeveloper.weplantaforest.treetypes.TreeTypeService;
import org.dicadeveloper.weplantaforest.util.UtilConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.ExposesResourceFor;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@ExposesResourceFor(TreeDto.class)
@RestController
public class TreeController {

    @Autowired
    private TreeService _treeService;

    @Autowired
    private TreeResourceAssembler _treeResourceAssembler;

    @Autowired
    UserService _userService;
    @Autowired
    TreeTypeService _treeTypeSerivce;

    @RequestMapping(value = "/rest/v1/trees", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON })
    @ResponseBody
    public PagedResources<TreeDto> getTrees(@PageableDefault(size = UtilConstants.DEFAULT_RETURN_RECORD_COUNT, page = 0, sort = { "_plantedOn" }) Pageable pageable,
            @Nullable PagedResourcesAssembler assembler) {
        Page<TreeDto> trees = _treeService.findAll(pageable);
        PagedResources<TreeDto> pagedResource = null;
        if (null != assembler) {
            pagedResource = assembler.toResource(trees, _treeResourceAssembler);
        } else {
            pagedResource = new PagedResources<TreeDto>(new ArrayList<TreeDto>(), null);
        }
        return pagedResource;
    }

    @RequestMapping(value = "/rest/v1/trees/{id}", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON })
    public HttpEntity<Resource<TreeDto>> getTree(@PathVariable("id") Long treeId) {
        if (treeId == null || !_treeService.exists(treeId)) {
            return new ResponseEntity<Resource<TreeDto>>(HttpStatus.NOT_FOUND);
        }
        TreeDto tree = _treeService.findOne(treeId);
        Resource<TreeDto> treeResource = new Resource<TreeDto>(tree);
        treeResource.add(linkTo(methodOn(TreeController.class).getTree(treeId)).withSelfRel());
        treeResource.add(linkTo(methodOn(TreeController.class).getTrees(null, null)).withRel("parent"));
        // TODO treeTypeID is null -> JPA query needs to be fixed.
        // Long treeTypeId = _treeService.findTreeTypeIdByTreeId(treeId);
        // treeResource.add(linkTo(methodOn(TreeTypeController.class).getTreeType(treeTypeId)).withRel("treeType"));
        return new ResponseEntity<Resource<TreeDto>>(treeResource, HttpStatus.OK);
    }

    @RequestMapping(value = "/rest/v1/trees", method = RequestMethod.PUT, consumes = { MediaType.APPLICATION_JSON }, produces = { MediaType.APPLICATION_JSON })
    public HttpEntity<Resource<Object>> createTree(@RequestBody TreeDto tree) {
        ResponseEntity<Resource<Object>> response;
        // TODO validation
        TreeTypeDto treeType = _treeTypeSerivce.findByName(tree.getTreeTypeName());
        UserDto owner = _userService.findByName(tree.getOwnerName());
        if (treeType.equals(TreeTypeDto.NO_TREE_TYPE)) {
            response = new ResponseEntity<Resource<Object>>(new Resource<Object>("You must define the tree type '" + tree.getTreeTypeName() + "' first."), HttpStatus.BAD_REQUEST);
        } else if (owner.equals(UserDto.NO_USER)) {
            response = new ResponseEntity<Resource<Object>>(new Resource<Object>("You must define the owner '" + tree.getOwnerName() + "' first."), HttpStatus.BAD_REQUEST);
        } else {
            tree.setOwner(owner);
            tree.setPlantedOn(new Date());
            tree.setSubmittedOn(new Date());
            _treeService.save(tree);
            response = new ResponseEntity<Resource<Object>>(new Resource<Object>(tree), HttpStatus.OK);
        }
        return response;
    }

}
