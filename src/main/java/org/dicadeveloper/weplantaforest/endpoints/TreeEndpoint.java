package org.dicadeveloper.weplantaforest.endpoints;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.dicadeveloper.weplantaforest.persist.dto.TreeDto;
import org.dicadeveloper.weplantaforest.persist.dto.TreeTypeDto;
import org.dicadeveloper.weplantaforest.services.TreeService;
import org.dicadeveloper.weplantaforest.services.TreeTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@Produces({ MediaType.APPLICATION_JSON })
@Path("/rest/v1/trees")
@Transactional
public class TreeEndpoint {

    @Autowired
    private TreeService _treeService;

    @Autowired
    TreeTypeService _treeTypeSerivce;

    @GET
    @Path("/")
    public Response getTrees() {
        List<TreeDto> trees = _treeService.findAll();
        if (trees.isEmpty()) {
            float latitude = 51.51f;
            float longitude = 11.12f;
            TreeDto tree = new TreeDto(latitude, longitude, 20);
            _treeService.save(tree);
        }
        Response response = Response.status(200).entity(trees).build();
        return response;
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
        tree.setTreeType(treeType);
        _treeService.save(tree);
        Response response = Response.status(200).entity(tree).build();
        return response;
    }

    @GET
    @Path("/{treeType}")
    public Response getTreeType(@PathParam("treetype") String treeType) {
        String type = "Ahorn";
        return Response.status(200).entity(type).build();
    }

}
