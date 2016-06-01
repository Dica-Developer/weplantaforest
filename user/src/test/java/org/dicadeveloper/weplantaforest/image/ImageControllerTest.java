package org.dicadeveloper.weplantaforest.image;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@SpringApplicationConfiguration(classes = WeplantaforestApplication.class)
@IntegrationTest({ "spring.profiles.active=test" })
public class ImageControllerTest {

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Before
    public void setup() {
        this.mockMvc = webAppContextSetup(this.webApplicationContext).build();
    }

    @Test
    public void testGetImageNonScaled() throws Exception {
        this.mockMvc.perform(get(Uris.IMAGE + "{imageName:.+}", "test.jpg").accept("image/jpg"))
                    .andExpect(status().isOk());
    }
    
    @Test
    public void testGetImageNonScaledBadRequest() throws Exception {
        this.mockMvc.perform(get(Uris.IMAGE + "{imageName:.+}", "testttt.jpg").accept("image/jpg"))
                    .andExpect(status().isBadRequest());
    }
    
    @Test
    public void testGetImageScaled() throws Exception {
        this.mockMvc.perform(get(Uris.IMAGE + "{imageName:.+}/{width}/{height}", "test.jpg", 500, 500).accept("image/jpg"))
                    .andExpect(status().isOk());
    }
    
    @Test
    public void testGetImageScaledBadRequest() throws Exception {
        this.mockMvc.perform(get(Uris.IMAGE + "{imageName:.+}/{width}/{height}", "testttt.jpg", 500, 500).accept("image/jpg"))
                    .andExpect(status().isBadRequest());
    }
}
