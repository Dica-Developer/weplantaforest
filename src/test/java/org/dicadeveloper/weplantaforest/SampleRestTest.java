package org.dicadeveloper.weplantaforest;

import static org.fest.assertions.Assertions.assertThat;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

// @RunWith(SpringJUnit4ClassRunner.class)
// @SpringApplicationConfiguration(classes = Application.class)
// @IntegrationTest("server.port=0")
// @WebAppConfiguration
public class SampleRestTest {

    @Value("${local.server.port}")
    private int port;

    private RestTemplate _restTemplate = new TestRestTemplate();

    // @Test
    public void contextLoads() {
        ResponseEntity<String> entity = _restTemplate.getForEntity("http://localhost:" + this.port + "/rest/v1/trees/", String.class);
        assertThat(entity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    // @Test
    public void validation() {
        ResponseEntity<String> entity = _restTemplate.getForEntity("http://localhost:" + this.port + "/rest/v1/trees/", String.class);
        assertThat(entity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

}
