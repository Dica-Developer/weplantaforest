package org.dicadeveloper.weplantaforest.reports.rankings;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.testsupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@SpringApplicationConfiguration(classes = WeplantaforestApplication.class)
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class UserAndOrgRankingControllerTest {

    private MockMvc mockMvc;

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private DbInjecter dbInjecter;

    @Autowired
    private WebApplicationContext wac;

    @Before
    public void setup() {
        this.mockMvc = webAppContextSetup(this.wac).build();
    }

    @Test
    public void testGetBestUser() throws Exception {
        dbInjecter.injectUser("Bert");
        dbInjecter.injectUser("Horst");

        dbInjecter.injectTreeType("wood", "desc", 0.5);
        dbInjecter.injectTree("wood", "Bert", 10, 30000L);
        dbInjecter.injectTree("wood", "Bert", 30, 30000L);
        dbInjecter.injectTree("wood", "Horst", 10, 30000L);

        this.mockMvc.perform(get("/reports/ranking/bestUser/{pageNr}/{pageSize}", 0, 5).accept("application/json")).andExpect(status().isOk()).andExpect(jsonPath("$.names[0]").value("Bert"))
                .andExpect(jsonPath("$.amount[0]").value(40)).andExpect(jsonPath("$.co2Saved[0]").exists()).andExpect(jsonPath("$.names[1]").value("Horst"))
                .andExpect(jsonPath("$.amount[1]").value(10)).andExpect(jsonPath("$.co2Saved[1]").exists());
    }

    @Test
    public void testGetLastUser() throws Exception {
        dbInjecter.injectUser("Bert", 50000L);
        dbInjecter.injectUser("Horst", 500000L);

        this.mockMvc.perform(get("/reports/ranking/lastUser/{page}/{pageSize}", 0, 5).accept("application/json")).andExpect(status().isOk()).andExpect(jsonPath("$.names[0]").value("Horst"))
                .andExpect(jsonPath("$.dates[0]").value("31.12.1969")).andExpect(jsonPath("$.times[0]").value("16:08:20")).andExpect(jsonPath("$.names[1]").value("Bert"))
                .andExpect(jsonPath("$.dates[1]").value("31.12.1969")).andExpect(jsonPath("$.times[1]").value("16:00:50"));
    }

}
