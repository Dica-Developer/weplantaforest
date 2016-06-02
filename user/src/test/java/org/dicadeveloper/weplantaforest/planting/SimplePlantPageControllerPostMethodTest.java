package org.dicadeveloper.weplantaforest.planting;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.admin.codes.Cart;
import org.dicadeveloper.weplantaforest.admin.codes.CartRepository;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.common.testSupport.TestUtil;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.dicadeveloper.weplantaforest.testsupport.PlantPageDataCreater;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
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
public class SimplePlantPageControllerPostMethodTest {

    private MockMvc mockMvc;

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private DbInjecter dbInjecter;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private CartRepository _cartRepository;

    @Autowired
    private TreeRepository _treeRepository;

    @Before
    public void setup() {
        this.mockMvc = webAppContextSetup(this.webApplicationContext).build();
    }

    @Test
    @Transactional
    public void testDonateTreesSatusOk() throws Exception {
        dbInjecter.injectTreeType("wood", "desc", 0.5);

        dbInjecter.injectUser("Adam");

        dbInjecter.injectProject("Project A", "Adam", "adam's project", true, 0, 0);

        dbInjecter.injectProjectArticle("wood", "Project A", 10, 3.0, 1.0);

        SimplePlantPageData plantPageData = PlantPageDataCreater.initializeSimplePlantPageData();

        plantPageData = PlantPageDataCreater.createSimplePlantItemAndAddToSimplePlantPageData(3, 300, "wood", "Project A", plantPageData);

        this.mockMvc.perform(post(Uris.SIMPLE_DONATION).contentType(TestUtil.APPLICATION_JSON_UTF8)
                                                       .content(TestUtil.convertObjectToJsonBytes(plantPageData)))
                    .andExpect(status().isOk());

        assertThat(_cartRepository.count()).isEqualTo(1L);
        Cart cart = _cartRepository.findOne(1L);

        assertThat(cart.getTotalPrice()
                       .doubleValue()).isEqualTo(9.0);
        assertThat(cart.getCartItems()
                       .get(0)
                       .getPlantArticleId()).isEqualTo(1);
        assertThat(_treeRepository.count()).isEqualTo(1L);
    }

    @Test
    @Transactional
    public void testDonateTreesWithMultipleEntriesSatusOk() throws Exception {
        dbInjecter.injectTreeType("wood", "desc", 0.5);
        dbInjecter.injectTreeType("doow", "desc", 0.5);
        dbInjecter.injectTreeType("wodo", "desc", 0.5);

        dbInjecter.injectUser("Adam");

        dbInjecter.injectProject("Project A", "Adam", "adam's project", true, 0, 0);

        dbInjecter.injectProjectArticle("wood", "Project A", 10, 3.0, 1.0);
        dbInjecter.injectProjectArticle("doow", "Project A", 10, 3.0, 1.0);
        dbInjecter.injectProjectArticle("wodo", "Project A", 10, 3.0, 1.0);

        SimplePlantPageData plantPageData = PlantPageDataCreater.initializeSimplePlantPageData();
        plantPageData = PlantPageDataCreater.createSimplePlantItemAndAddToSimplePlantPageData(3, 300, "wood", "Project A", plantPageData);
        plantPageData = PlantPageDataCreater.createSimplePlantItemAndAddToSimplePlantPageData(3, 300, "doow", "Project A", plantPageData);
        plantPageData = PlantPageDataCreater.createSimplePlantItemAndAddToSimplePlantPageData(3, 300, "wodo", "Project A", plantPageData);

        this.mockMvc.perform(post(Uris.SIMPLE_DONATION).contentType(TestUtil.APPLICATION_JSON_UTF8)
                                                       .content(TestUtil.convertObjectToJsonBytes(plantPageData)))
                    .andExpect(status().isOk());

        assertThat(_cartRepository.count()).isEqualTo(1L);

        Cart cart = _cartRepository.findOne(1L);

        assertThat(cart.getTotalPrice()
                       .doubleValue()).isEqualTo(27.0);
        assertThat(cart.getPlantArticleIds()).contains(1L, 2L, 3L);
        assertThat(_treeRepository.count()).isEqualTo(3L);
    }

    @Test
    public void testDonateTreesSatusBadRequest() throws Exception {
        dbInjecter.injectTreeType("wood", "desc", 0.5);

        dbInjecter.injectUser("Adam");

        dbInjecter.injectProject("Project A", "Adam", "adam's project", true, 0, 0);

        dbInjecter.injectProjectArticle("wood", "Project A", 10, 3.0, 1.0);

        SimplePlantPageData plantPageData = PlantPageDataCreater.initializeSimplePlantPageData();

        plantPageData = PlantPageDataCreater.createSimplePlantItemAndAddToSimplePlantPageData(11, 300, "wood", "Project A", plantPageData);

        this.mockMvc.perform(post(Uris.SIMPLE_DONATION).contentType(TestUtil.APPLICATION_JSON_UTF8)
                                                       .content(TestUtil.convertObjectToJsonBytes(plantPageData)))
                    .andExpect(status().isBadRequest());

        assertThat(_cartRepository.count()).isEqualTo(0);

    }

}
