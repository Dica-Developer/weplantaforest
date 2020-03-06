package org.dicadeveloper.weplantaforest.testsupport;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.common.testSupport.HashUtil;
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
public class SwitchCoverageTester {

    private MockMvc mockMvc;

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    public DbInjecter _dbInjecter;

    @Before
    public void setup() {
        this.mockMvc = webAppContextSetup(this.webApplicationContext).build();
    }

    @Test
    public void testGetBestUserFromTimeRangeCoverAllBranches() throws Exception {
        String sameHashForWeek = HashUtil.samehash("week", 1);
        String sameHashForYear = HashUtil.samehash("year", 1);

        this.mockMvc.perform(get("/ranking/bestUserFromTimeRange/{range}", sameHashForWeek).accept("application/json")).andExpect(status().isOk());

        this.mockMvc.perform(get("/ranking/bestUserFromTimeRange/{range}", sameHashForYear).accept("application/json")).andExpect(status().isOk());
    }

}
