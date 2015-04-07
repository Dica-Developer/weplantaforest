package org.dicadeveloper.weplantaforest.controller;

import java.util.List;
import java.util.Map;

import org.assertj.core.util.Maps;
import org.dicadeveloper.weplantaforest.Application;
import org.dicadeveloper.weplantaforest.persist.dto.TreeDto;
import org.dicadeveloper.weplantaforest.persist.dto.TreeTypeDto;
import org.dicadeveloper.weplantaforest.services.TreeTypeService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.web.client.RestTemplate;

import static org.fest.assertions.Assertions.assertThat;

@WebAppConfiguration
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class TreesControllerIntegrationTest {

    private final static class ParameterizedTypeReferenceExtension extends ParameterizedTypeReference<List<TreeDto>> {
    }

    @Value("${local.server.port}")
    private int port;

    private RestTemplate _restTemplate = new TestRestTemplate();

    @Autowired
    private TreeTypeService _treeTypeService;

    @Test
    public void testTreeCreation_Successful() {
        Map<String, String> params = Maps.newHashMap();
        ResponseEntity<TreeDto> entity = _restTemplate.postForEntity("http://localhost:" + this.port + "/rest/v1/trees/51.23/11.43/34/Ahorn", params, TreeDto.class);
        assertThat(entity.getStatusCode()).isEqualTo(HttpStatus.OK);
        TreeDto tree = entity.getBody();
        assertThat(tree.getLatitude()).isEqualTo(51.23f);
        assertThat(tree.getLongitude()).isEqualTo(11.43f);
        assertThat(tree.getAmount()).isEqualTo(34);
        assertThat(tree.getTreeType()).isNull();
    }

    @Test
    public void testTreeCreation_TreeTypeShouldExists() {
        Map<String, String> params = Maps.newHashMap();
        assertThat(_treeTypeService.findByName("Buche")).isEqualTo(TreeTypeDto.NO_TREE_TYPE);
        ResponseEntity<String> entity = _restTemplate.postForEntity("http://localhost:" + this.port + "/rest/v1/trees/51.23/11.43/34/Buche", params, String.class);
        assertThat(entity.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        String errorMessage = entity.getBody();
        assertThat(errorMessage).isEqualTo("You must define the tree type 'Buche' first.");
    }

    @Test
    public void testGetTrees_Successful() {
        ResponseEntity<List<TreeDto>> entity = getTrees("http://localhost:" + this.port + "/rest/v1/trees/");
        assertThat(entity.getStatusCode()).isEqualTo(HttpStatus.OK);
        List<TreeDto> trees = entity.getBody();
        assertThat(trees.size()).isGreaterThan(0);
        TreeDto tree = trees.get(0);
        assertThat(tree.getLatitude()).isNotEqualTo(0f);
        assertThat(tree.getLongitude()).isNotEqualTo(0f);
        assertThat(tree.getAmount()).isNotEqualTo(0);
        assertThat(entity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    private ResponseEntity<List<TreeDto>> getTrees(String uri) {
        return _restTemplate.exchange(uri, HttpMethod.GET, null, getParameterizedPageTypeReference());
    }

    private ParameterizedTypeReference<List<TreeDto>> getParameterizedPageTypeReference() {
        return new ParameterizedTypeReferenceExtension();
    }
}
