package org.dicadeveloper.weplantaforest.controller;

import org.dicadeveloper.weplantaforest.Application;
import org.dicadeveloper.weplantaforest.CategoryIntegration;
import org.dicadeveloper.weplantaforest.testsupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.treetypes.TreeTypeDto;
import org.dicadeveloper.weplantaforest.treetypes.TreeTypeService;
import org.hamcrest.Matchers;
import org.junit.Rule;
import org.junit.Test;
import org.junit.experimental.categories.Category;
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
import com.jayway.restassured.response.Response;
import com.jayway.restassured.response.ValidatableResponse;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
@Category(CategoryIntegration.class)
public class TreeTypesControllerIntegrationTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Value("${local.server.port}")
    private int _port;

    @Autowired
    private TreeTypeService _treeTypeService;

    @Test
    public void testGetTreeTypes_Successful() {
        TreeTypeDto treeType = new TreeTypeDto();
        treeType.setName("Buche");
        treeType.setAnnualCo2SavingInTons(1.2f);
        treeType.setDescription("Baum typ Buche");
        _treeTypeService.save(treeType);
        Response responseTreeTypes = RestAssured.get("http://localhost:" + _port + "/rest/v1/treetypes");
        ValidatableResponse response = responseTreeTypes.then();
        response.statusCode(Matchers.equalTo(200));
        response.body("_links.self.href", Matchers.equalTo("http://localhost:" + _port + "/rest/v1/treetypes"));
        response.body("_embedded.treeTypeDtoList.name", Matchers.hasItems("Buche"));
        response.body("_embedded.treeTypeDtoList.annualCo2SavingInTons", Matchers.hasItems(1.2f));
        response.body("_embedded.treeTypeDtoList.description", Matchers.hasItems("Baum typ Buche"));

    }

}
