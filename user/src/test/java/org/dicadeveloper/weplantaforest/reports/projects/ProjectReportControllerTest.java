package org.dicadeveloper.weplantaforest.reports.projects;

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
public class ProjectReportControllerTest {

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
    public void testGetProjectReport() throws Exception {
        long timeOfPlanting = System.currentTimeMillis();

        _dbInjecter.injectTreeType("wood", "wooddesc", 0.5);
        _dbInjecter.injectTreeType("doow", "wooddesc", 0.5);

        _dbInjecter.injectUser("Adam");

        _dbInjecter.injectProject("Project A", "Adam", "project A desc", true, 1.0f, 2.0f);
        _dbInjecter.injectProject("Project B", "Adam", "project B desc", true, 3.0f, 4.0f);

        _dbInjecter.injectProjectArticle("wood", "Project A", 100, 1.0, 0.5);
        _dbInjecter.injectProjectArticle("doow", "Project A", 200, 1.0, 0.5);
        _dbInjecter.injectProjectArticle("wood", "Project B", 300, 1.0, 0.5);
        _dbInjecter.injectProjectArticle("doow", "Project B", 500, 1.0, 0.5);

        _dbInjecter.injectTreeToProject("wood", "Adam", 50, timeOfPlanting, "Project A");
        _dbInjecter.injectTreeToProject("doow", "Adam", 30, timeOfPlanting, "Project A");
        _dbInjecter.injectTreeToProject("wood", "Adam", 20, timeOfPlanting, "Project A");

        _dbInjecter.injectTreeToProject("wood", "Adam", 100, timeOfPlanting, "Project B");
        _dbInjecter.injectTreeToProject("wood", "Adam", 100, timeOfPlanting, "Project B");
        _dbInjecter.injectTreeToProject("doow", "Adam", 200, timeOfPlanting, "Project B");

        this.mockMvc.perform(get("/reports/activeProjects").accept("application/json"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.[0].projectName").value("Project A"))
                    .andExpect(jsonPath("$.[0].description").value("project A desc"))
                    .andExpect(jsonPath("$.[0].latitude").value(1.0))
                    .andExpect(jsonPath("$.[0].longitude").value(2.0))
                    .andExpect(jsonPath("$.[0].amount").value(300))
                    .andExpect(jsonPath("$.[0].alreadyPlanted").value(100))
                    .andExpect(jsonPath("$.[1].projectName").value("Project B"))
                    .andExpect(jsonPath("$.[1].description").value("project B desc"))
                    .andExpect(jsonPath("$.[1].latitude").value(3.0))
                    .andExpect(jsonPath("$.[1].longitude").value(4.0))
                    .andExpect(jsonPath("$.[1].amount").value(800))
                    .andExpect(jsonPath("$.[1].alreadyPlanted").value(400));
    }

}
