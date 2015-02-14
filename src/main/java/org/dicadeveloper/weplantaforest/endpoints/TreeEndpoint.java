package org.dicadeveloper.weplantaforest.endpoints;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;
import javax.ws.rs.core.UriInfo;

import org.dicadeveloper.weplantaforest.PATHS;
import org.dicadeveloper.weplantaforest.persist.dto.TreeDto;
import org.dicadeveloper.weplantaforest.persist.dto.TreeTypeDto;
import org.dicadeveloper.weplantaforest.services.TreeService;
import org.dicadeveloper.weplantaforest.services.TreeTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.theoryinpractise.halbuilder.api.RepresentationFactory;
import com.theoryinpractise.halbuilder.impl.representations.MutableRepresentation;
import com.theoryinpractise.halbuilder.standard.StandardRepresentationFactory;

@Component
@Produces({ RepresentationFactory.HAL_JSON })
@Path(PATHS.PATH_TREES)
@Transactional
public class TreeEndpoint {

    @Autowired
    private TreeService _treeService;

    @Autowired
    TreeTypeService _treeTypeSerivce;

    public static final String BASE_URI = "http://localhost:8080/rest/";

    public static URI mkUri(final Class resourceClass) throws URISyntaxException {
        URI href = UriBuilder.fromResource(resourceClass).build();
        return new URI(BASE_URI).resolve(href);
    }

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

    @GET
    @Path("/{id}")
    public Response getTree(@PathParam("id") Long id, @Context UriInfo ui) throws URISyntaxException {
        if (id == null) {
            return Response.status(400).entity("Parameter 'id' must not be null.").build();
        }
        RepresentationFactory representationFactory = new StandardRepresentationFactory().withFlag(RepresentationFactory.PRETTY_PRINT).withLink("website", "http://iplantatree.org");
        MutableRepresentation rep = (MutableRepresentation) representationFactory.newRepresentation(mkUri(TreeEndpoint.class));

        TreeDto tree = _treeService.findOne(id);
        rep.withFields(tree);

        Response response = Response.ok(rep).build();
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
    @Path("type/{treeTypeName}")
    public Response getTreeType(@PathParam("treeTypeName") String treeTypeName) {
        String typeName = treeTypeName;
        if (typeName == null) {
            typeName = "Ahorn";
        }
        return Response.status(200).entity(typeName).build();
    }

}
