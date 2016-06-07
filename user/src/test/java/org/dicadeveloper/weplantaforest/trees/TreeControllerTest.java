package org.dicadeveloper.weplantaforest.trees;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@SpringApplicationConfiguration(classes = WeplantaforestApplication.class)
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class TreeControllerTest {
    private MockMvc mockMvc;

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private DbInjecter dbInjecter;

    @Autowired
    private TreeRepository _treeRepository;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Before
    public void setup() {
        this.mockMvc = webAppContextSetup(this.webApplicationContext).build();
    }

    @Test
    @Transactional
    public void testSelfPlantStatusBadRequestCauseOfAmountLowerOne() throws Exception {
        dbInjecter.injectUser("Adam");
        dbInjecter.injectTreeType("wood", "this is wood", 0.5);
        dbInjecter.injectTree("wood", "Adam", 1, 10000);

        assertThat(_treeRepository.count()).isEqualTo(1L);
        
        this.mockMvc.perform(get("/tree/1").accept("application/json"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.amount").value(1))
                    .andExpect(jsonPath("$.longitude").value(0.0))
                    .andExpect(jsonPath("$.latitude").value(0.0))
                    .andExpect(jsonPath("$.plantedOn").value(10000))
                    .andExpect(jsonPath("$.submittedOn").value(10000))
                    .andExpect(jsonPath("$.description").isEmpty())
                    .andExpect(jsonPath("$.owner.name").value("Adam"))
                    .andExpect(jsonPath("$.treeType.name").value("wood"));

    }

}
