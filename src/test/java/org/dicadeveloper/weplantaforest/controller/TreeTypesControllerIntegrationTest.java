package org.dicadeveloper.weplantaforest.controller;

import java.util.List;

import org.dicadeveloper.weplantaforest.Application;
import org.dicadeveloper.weplantaforest.CategoryIntegration;
import org.dicadeveloper.weplantaforest.persist.dto.TreeTypeDto;
import org.junit.Test;
import org.junit.experimental.categories.Category;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.web.client.RestTemplate;

import static org.fest.assertions.Assertions.assertThat;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@IntegrationTest("server.port=0")
@WebAppConfiguration
@Category(CategoryIntegration.class)
public class TreeTypesControllerIntegrationTest {

    @Value("${local.server.port}")
    private int port;

    private RestTemplate _restTemplate = new TestRestTemplate();

    @Test
    public void testGetTreeTypes_Successful() {
        ResponseEntity<List<TreeTypeDto>> entity = getTreeTypes("http://localhost:" + this.port + "/rest/v1/treetypes/");
        assertThat(entity.getStatusCode()).isEqualTo(HttpStatus.OK);
        List<TreeTypeDto> treeTypes = entity.getBody();
        assertThat(treeTypes.size()).isGreaterThan(0);
        TreeTypeDto tree = treeTypes.get(0);
        assertThat(tree.getName()).isNotEmpty();
        assertThat(tree.getDescription()).isNotEmpty();
        assertThat(entity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    private ResponseEntity<List<TreeTypeDto>> getTreeTypes(String uri) {
        return _restTemplate.exchange(uri, HttpMethod.GET, null, getParameterizedPageTypeReference());
    }

    private ParameterizedTypeReference<List<TreeTypeDto>> getParameterizedPageTypeReference() {
        return new ParameterizedTypeReference<List<TreeTypeDto>>() {
            // nothing todo
        };
    }
}
