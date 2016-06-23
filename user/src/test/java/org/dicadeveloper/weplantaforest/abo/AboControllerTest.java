package org.dicadeveloper.weplantaforest.abo;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.abo.Abo.Period;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.support.Uris;
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
public class AboControllerTest {
    private MockMvc mockMvc;

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private DbInjecter _dbInjecter;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Before
    public void setup() {
        this.mockMvc = webAppContextSetup(this.webApplicationContext).build();
    }

    @Test
    public void testGetAbosByUserId() throws Exception {
        long createdOn = System.currentTimeMillis();
        _dbInjecter.injectUser("Adam");
        _dbInjecter.injectAbo("Adam", true, 1, Period.WEEKLY, createdOn);

        mockMvc.perform(get((Uris.ABOS_BY_USER + "{userId}"), 1).accept("application/json"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.[0].id").value(1))
               .andExpect(jsonPath("$.[0].amount").value(1))
               .andExpect(jsonPath("$.[0].period").value("WEEKLY"))
               .andExpect(jsonPath("$.[0].timeStamp").value(createdOn))
               .andExpect(jsonPath("$.[0].last").isEmpty())
               .andExpect(jsonPath("$.[0].active").value(true));
    }
}
