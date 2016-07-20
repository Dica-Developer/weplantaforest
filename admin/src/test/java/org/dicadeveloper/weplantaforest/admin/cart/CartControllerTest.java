package org.dicadeveloper.weplantaforest.admin.cart;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.dicadeveloper.weplantaforest.admin.WeplantaforestAdminApplication;
import org.dicadeveloper.weplantaforest.admin.testSupport.DbInjecter;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
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
@SpringApplicationConfiguration(classes = WeplantaforestAdminApplication.class)
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class CartControllerTest {

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private DbInjecter _dbInjecter;

    @Before
    public void setup() {
        mockMvc = webAppContextSetup(this.webApplicationContext).build();
    }

    @Test
    @Transactional
    public void testGetAllUser() throws Exception {
        long timeOfPlanting = System.currentTimeMillis();

        _dbInjecter.injectUser("Adam");
        _dbInjecter.injectTreeType("wood", "wood desc", 0.5);

        _dbInjecter.injectProject("project", "Adam", "project desc", true, 1.0f, 1.0f);
        _dbInjecter.injectProjectArticle("wood", "project", 1.0);

        _dbInjecter.injectTreeToProject("wood", "Adam", 1, timeOfPlanting, "project");

        List<Long> treeIdList = new ArrayList<>();
        treeIdList.add(1L);

        _dbInjecter.injectCart("Adam", treeIdList);

        mockMvc.perform(get("/carts").accept("application/json")
                                     .param("page", "0")
                                     .param("size", "5"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.totalElements").value(1))
               .andExpect(jsonPath("$.totalPages").value(1))
               .andExpect(jsonPath("$.numberOfElements").value(1))
               .andExpect(jsonPath("$.last").value(true))
               .andExpect(jsonPath("$.first").value(true))

               .andExpect(jsonPath("$.content[0].buyer.name").value("Adam"));
    }

}
