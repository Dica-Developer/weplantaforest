package org.dicadeveloper.weplantaforest.planting;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.HashMap;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.admin.codes.CartRepository;
import org.dicadeveloper.weplantaforest.testsupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.dicadeveloper.weplantaforest.testsupport.TestUtil;
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
public class PlantPageControllerPostMethodTest {

    private MockMvc mockMvc;

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private DbInjecter dbInjecter;

    @Autowired
    private WebApplicationContext wac;

    @Autowired
    public CartRepository _cartRepository;

    @Before
    public void setup() {
        this.mockMvc = webAppContextSetup(this.wac).build();
    }

    @Test
    public void testDonateTrees() throws Exception {
        dbInjecter.injectTreeType("wood", "desc", 0.5);

        dbInjecter.injectUser("Adam");

        dbInjecter.injectProject("Project A", "Adam", "adam's project", true, 0, 0);

        dbInjecter.injectProjectArticle("wood", "Project A", 10, 3.0, 1.0);

        PlantPageData plantPageData = initializePlantPageData();
        plantPageData = initializeProjectDataAndAddToPlantPageData(plantPageData, "Project A");

        PlantItem plantItem = createPlantItem(3, 3.0);

        plantPageData.getProjects()
                     .get("Project A")
                     .getPlantItems()
                     .put("wood", plantItem);

        this.mockMvc.perform(post("/donateTrees").contentType(TestUtil.APPLICATION_JSON_UTF8)
                                                 .content(TestUtil.convertObjectToJsonBytes(plantPageData)))
                    .andExpect(status().isOk());

        assertThat(_cartRepository.count()).isEqualTo(1L);

    }

    private PlantPageData initializePlantPageData() {
        PlantPageData plantPageData = new PlantPageData();
        plantPageData.setProjects(new HashMap<String, ProjectData>());
        return plantPageData;
    }

    private PlantPageData initializeProjectDataAndAddToPlantPageData(PlantPageData plantPageData, String projectName) {
        ProjectData projectData = new ProjectData();
        projectData.setPlantItems(new HashMap<String, PlantItem>());
        plantPageData.getProjects()
                     .put(projectName, projectData);
        return plantPageData;
    }

    private PlantItem createPlantItem(int amount, double price) {
        PlantItem plantItem = new PlantItem();
        plantItem.setAmount(amount);
        plantItem.setTreePrice(price);
        return plantItem;
    }

}
