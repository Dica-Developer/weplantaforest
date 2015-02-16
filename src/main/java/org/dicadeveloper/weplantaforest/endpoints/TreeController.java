package org.dicadeveloper.weplantaforest.endpoints;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

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
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Component
@RequestMapping(PATHS.PATH_TREES)
@ExposesResourceFor(TreeDto.class)
@Produces(MediaType.APPLICATION_JSON)
@Controller
public class TreeController {

    @Autowired
    private TreeService _treeService;

    @Autowired
    TreeTypeService _treeTypeSerivce;

    @RequestMapping(value = "/", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON })
    public HttpEntity<Resources<Resource<TreeDto>>> getTrees() {
        List<TreeDto> trees = _treeService.findAll();
        if (trees.isEmpty()) {
            float latitude = 51.51f;
            float longitude = 11.12f;
            TreeDto tree = new TreeDto(latitude, longitude, 20);
            _treeService.save(tree);
        }
        Resources<Resource<TreeDto>> treeResources = Resources.wrap(trees);
        treeResources.add(linkTo(methodOn(TreeController.class).getTrees()).withSelfRel());

        return new ResponseEntity<Resources<Resource<TreeDto>>>(treeResources, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON })
    public HttpEntity<Resource<TreeDto>> getTree(@PathVariable("id") Long id) {
        if (id == null) {
            return new ResponseEntity<Resource<TreeDto>>(HttpStatus.NOT_FOUND);
        }
        TreeDto tree = _treeService.findOne(id);

        Resource<TreeDto> treeResource = new Resource(tree);
        treeResource.add(linkTo(methodOn(TreeController.class).getTree(id)).withSelfRel());
        treeResource.add(linkTo(methodOn(TreeController.class).getTrees()).withRel("parent"));
        return new ResponseEntity<Resource<TreeDto>>(treeResource, HttpStatus.OK);
    }

    @POST
    @Path("/{latitude}/{longitude}/{amount}/{treeTypeName}")
    public Response createTree(@PathParam("latitude") float latitude, @PathParam("longitude") float longitude, @PathParam("amount") int amount, @PathParam("treeTypeName") String treeTypeName) {
        // TODO validation
        TreeTypeDto treeType = _treeTypeSerivce.findByName(treeTypeName);
        if (treeType.equals(TreeTypeDto.NO_TREE_TYPE)) {
            Response response = Response.status(400).entity("You must define the tree type '" + treeTypeName + "' first.").build();
            return response;
        }
        TreeDto tree = new TreeDto(latitude, longitude, amount);
        // tree.setTreeType(treeType);
        _treeService.save(tree);
        Response response = Response.status(200).entity(tree).build();
        return response;
    }

    @GET
    @Path("type/{treeTypeName}")
    public Response getTreeType(@PathParam("treeTypeName") String treeTypeName) {
        String typeName = treeTypeName;
        if (typeName == null) {
            typeName = "Ahorn";
        }
        return Response.status(200).entity(typeName).build();
    }

}
