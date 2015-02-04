package org.dicadeveloper.weplantaforest.endpoints;

import static org.fest.assertions.Assertions.assertThat;

import java.util.List;
import java.util.Map;

import org.assertj.core.util.Maps;
import org.dicadeveloper.weplantaforest.Application;
import org.dicadeveloper.weplantaforest.persist.dto.TreeDto;
import org.junit.Test;
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

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@IntegrationTest("server.port=0")
@WebAppConfiguration
public class TreesEndpointIntegrationTest {

    @Value("${local.server.port}")
    private int port;

    private RestTemplate _restTemplate = new TestRestTemplate();

    @Test
    public void testTreeCreation_Successful() {
        Map<String, String> params = Maps.newHashMap();
        ResponseEntity<TreeDto> entity = _restTemplate.postForEntity("http://localhost:" + this.port + "/rest/v1/trees/51.23/11.43/34", params, TreeDto.class);
        TreeDto tree = entity.getBody();
        assertThat(tree.getLatitude()).isEqualTo(51.23f);
        assertThat(tree.getLongitude()).isEqualTo(11.43f);
        assertThat(tree.getAmount()).isEqualTo(34);
        assertThat(entity.getStatusCode()).isEqualTo(HttpStatus.OK);
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
        return new ParameterizedTypeReference<List<TreeDto>>() {
            // nothing todo
        };
    }
}
