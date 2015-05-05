package org.dicadeveloper.weplantaforest.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Date;

import org.dicadeveloper.weplantaforest.Application;
import org.dicadeveloper.weplantaforest.persist.dto.TreeDto;
import org.dicadeveloper.weplantaforest.persist.dto.TreeTypeDto;
import org.dicadeveloper.weplantaforest.persist.dto.UserDto;
import org.dicadeveloper.weplantaforest.services.TreeService;
import org.dicadeveloper.weplantaforest.services.TreeTypeService;
import org.dicadeveloper.weplantaforest.services.UserService;
import org.dicadeveloper.weplantaforest.testsupport.CleanDbRule;
import org.hamcrest.Matchers;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import com.jayway.restassured.RestAssured;
import com.jayway.restassured.http.ContentType;
import com.jayway.restassured.response.ValidatableResponse;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class TreesControllerIntegrationTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Value("${local.server.port}")
    private int _port;

    @Autowired
    private UserService _userService;
    @Autowired
    private TreeTypeService _treeTypeService;
    @Autowired
    private TreeService _treeService;

    @Test
    public void testTreeCreation_Successful() throws URISyntaxException {
        TreeTypeDto treeType = new TreeTypeDto();
        treeType.setName("Buche");
        _treeTypeService.save(treeType);

        UserDto user = new UserDto("Bert");
        _userService.save(user);

        ValidatableResponse response = RestAssured.given().contentType(ContentType.JSON)
                .body("{\"longitude\":51.26,\"latitude\":11.4,\"amount\":36467574,\"treeTypeName\":\"Buche\",\"ownerName\":\"Bert\"}").post(new URI("http://localhost:" + _port + "/rest/v1/trees"))
                .then();
        response.statusCode(Matchers.equalTo(200));
        response.body("context.entity.longitude", Matchers.equalTo(new Float(51.26)));
        response.body("context.entity.latitude", Matchers.equalTo(new Float(11.4)));
        response.body("context.entity.amount", Matchers.equalTo(36467574));
    }

    @Test
    public void testTreeCreation_FailsBecauseTreeTypeDidNotExist() throws URISyntaxException {
        ValidatableResponse response = RestAssured.given().contentType(ContentType.JSON).body("{\"longitude\":51.26,\"latitude\":11.4,\"amount\":36467574,\"treeTypeName\":\"Buche\"}")
                .post(new URI("http://localhost:" + _port + "/rest/v1/trees")).then();
        response.statusCode(Matchers.equalTo(200));
        response.body("statusInfo.reasonPhrase", Matchers.equalTo("You must define the tree type 'Buche' first."));
        response.body("statusInfo.statusCode", Matchers.equalTo(400));
        response.body("statusInfo.family", Matchers.equalTo("CLIENT_ERROR"));
    }

    @Test
    public void testGetTrees_Successful() {
        TreeTypeDto treeType = new TreeTypeDto();
        treeType.setName("Buche");
        _treeTypeService.save(treeType);

        UserDto user = new UserDto("Bert");
        _userService.save(user);

        TreeDto tree = new TreeDto(1.0f, 3.0f, 67);
        tree.setPlantedOn(new Date());
        tree.setTreeType(treeType);
        tree.setOwner(user);
        _treeService.save(tree);

        ValidatableResponse response = RestAssured.get("http://localhost:" + _port + "/rest/v1/trees").then();
        response.statusCode(Matchers.equalTo(200));
        response.body("_links.self.href", Matchers.equalTo("http://localhost:" + _port + "/rest/v1/trees{?page,size,sort}"));
        response.body("_embedded.treeDtoList.latitude", Matchers.hasItems(1.0f));
        response.body("_embedded.treeDtoList.longitude", Matchers.hasItems(3.0f));
        response.body("_embedded.treeDtoList.amount", Matchers.hasItems(67));
    }
}
