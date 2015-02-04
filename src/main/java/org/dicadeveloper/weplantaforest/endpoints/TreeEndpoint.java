package org.dicadeveloper.weplantaforest.endpoints;

import java.util.Date;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.dicadeveloper.weplantaforest.persist.dto.TreeDto;
import org.dicadeveloper.weplantaforest.services.TreeService;
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

    @GET
    @Path("/")
    public Response getTrees() {
        List<TreeDto> trees = _treeService.findAll();
        if (trees.isEmpty()) {
            TreeDto tree = new TreeDto();
            tree.setAmount(20);
            tree.setLatitude(51.51f);
            tree.setLongitude(11.12f);
            tree.setSubmittedOn(new Date());
            _treeService.save(tree);
        }
        Response response = Response.status(200).entity(trees).build();
        return response;
    }

    @GET
    @Path("/{treeType}")
    public Response getTreeType(@PathParam("treetype") String treeType) {
        String type = "Ahorn";
        return Response.status(200).entity(type).build();
    }

}
