package org.dicadeveloper.weplantaforest.reports.co2;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import org.dicadeveloper.weplantaforest.common.testsupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@SpringBootTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class Co2ControllerTest {

    private MockMvc mockMvc;

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private DbInjecter dbInjecter;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Before
    public void setup() {
        this.mockMvc = webAppContextSetup(this.webApplicationContext).build();
    }

    @Test
    public void testGetTreesCountAndCo2() throws Exception {
        dbInjecter.injectUser("Bert");
        dbInjecter.injectTreeType("wood", "desc", 0.5);
        dbInjecter.injectTree("wood", "Bert", 10, 30000L);

        this.mockMvc.perform(get(Uris.REPORT_CO2).accept("application/json")).andExpect(status().isOk()).andExpect(jsonPath("$.treesCount").value(10)).andExpect(jsonPath("$.co2").exists());
    }

    @Test
    public void testGetTreesCountAndCo2ForUser() throws Exception {
        dbInjecter.injectTreeType("wood", "desc", 0.5);

        dbInjecter.injectUser("Adam");
        dbInjecter.injectUser("Bert");

        dbInjecter.injectTree("wood", "Adam", 1, 30000L);
        dbInjecter.injectTree("wood", "Bert", 1, 30000L);

        this.mockMvc.perform(get(Uris.REPORT_CO2_FOR_USER).param("userName", "Adam").accept("application/json")).andExpect(status().isOk()).andExpect(jsonPath("$.treesCount").value(1))
                .andExpect(jsonPath("$.co2").exists());
    }

}