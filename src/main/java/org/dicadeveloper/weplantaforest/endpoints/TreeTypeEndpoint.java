package org.dicadeveloper.weplantaforest.endpoints;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.dicadeveloper.weplantaforest.persist.dto.TreeTypeDto;
import org.dicadeveloper.weplantaforest.services.TreeTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@Produces({ MediaType.APPLICATION_JSON })
@Path("/rest/v1/treetypes")
@Transactional
public class TreeTypeEndpoint {

    @Autowired
    private TreeTypeService _treeTypeService;

    @GET
    @Path("/")
    public Response getTreeTypes() {
        List<TreeTypeDto> treeTypes = _treeTypeService.findAll();
        if (treeTypes.isEmpty()) {
            final String name = "Ahorn";
            final String description = "Die Ahorne (Acer) bilden eine Pflanzengattung in der Unterfamilie der Rosskastaniengewächse (Hippocastanoideae) innerhalb der Familie der Seifenbaumgewächse (Sapindaceae). ";
            TreeTypeDto treeType = new TreeTypeDto(name, description);
            _treeTypeService.save(treeType);
        }
        Response response = Response.status(200).entity(treeTypes).build();
        return response;
    }

    @GET
    @Path("/{id}")
    public Response getTree(@PathParam("id") Long id) {
        if (id == null) {
            return Response.status(400).entity("Parameter 'id' must not be null.").build();
        }
        TreeTypeDto treeType = _treeTypeService.findOne(id);
        Response response = Response.ok(treeType).build();
        return response;
    }

}
