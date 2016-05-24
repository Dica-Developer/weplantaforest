package org.dicadeveloper.weplantaforest.planting;

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
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@SpringApplicationConfiguration(classes = WeplantaforestApplication.class)
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class SimplePlantPageControllerGetForTreeTest {

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
    public void testGetCartWithOneArticle() throws Exception {
        dbInjecter.injectTreeType("wood", "desc", 0.5);

        dbInjecter.injectUser("Adam");

        dbInjecter.injectProject("Project A", "Adam", "adam's project", true, 0, 0);

        dbInjecter.injectProjectArticle("wood", "Project A", 10, 1.0, 1.0);

        this.mockMvc.perform(get("/simplePlantProposalForTrees/{amountOfTrees}", 10).accept("application/json"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.plantItems[0].amount").value(10))
                    .andExpect(jsonPath("$.plantItems[0].treeType").value("wood"))
                    .andExpect(jsonPath("$.plantItems[0].treePrice").value(100))
                    .andExpect(jsonPath("$.plantItems[0].projectName").value("Project A"))
                    .andExpect(jsonPath("$.price").value(1000))
                    .andExpect(jsonPath("$.actualAmountOfTrees").value(10))
                    .andExpect(jsonPath("$.targetAmountOfTrees").value(10));
    }

    @Test
    public void testGetCartWithTwoArticles() throws Exception {
        dbInjecter.injectTreeType("wood", "desc", 0.5);
        dbInjecter.injectTreeType("doow", "desc", 0.5);

        dbInjecter.injectUser("Adam");

        dbInjecter.injectProject("Project A", "Adam", "adam's project", true, 0, 0);

        dbInjecter.injectProjectArticle("wood", "Project A", 10, 1.0, 0.8);
        dbInjecter.injectProjectArticle("doow", "Project A", 10, 1.0, 0.5);

        this.mockMvc.perform(get("/simplePlantProposalForTrees/{amountOfTrees}", 11).accept("application/json"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.plantItems[0].amount").value(8))
                    .andExpect(jsonPath("$.plantItems[0].treeType").value("wood"))
                    .andExpect(jsonPath("$.plantItems[0].treePrice").value(100))
                    .andExpect(jsonPath("$.plantItems[0].projectName").value("Project A"))
                    .andExpect(jsonPath("$.plantItems[1].amount").value(3))
                    .andExpect(jsonPath("$.plantItems[1].treeType").value("doow"))
                    .andExpect(jsonPath("$.plantItems[1].treePrice").value(100))
                    .andExpect(jsonPath("$.plantItems[1].projectName").value("Project A"))
                    .andExpect(jsonPath("$.price").value(1100))
                    .andExpect(jsonPath("$.actualAmountOfTrees").value(11))
                    .andExpect(jsonPath("$.targetAmountOfTrees").value(11));
    }

    @Test
    public void testGetCartWithThreeArticles() throws Exception {

        dbInjecter.injectTreeType("wood", "desc", 0.5);
        dbInjecter.injectTreeType("doow", "desc", 0.5);
        dbInjecter.injectTreeType("wodo", "desc", 0.5);

        dbInjecter.injectUser("Adam");

        dbInjecter.injectProject("Project A", "Adam", "adam's project", true, 0, 0);

        dbInjecter.injectProjectArticle("wood", "Project A", 10, 1.0, 0.8);
        dbInjecter.injectProjectArticle("doow", "Project A", 10, 1.0, 0.5);
        dbInjecter.injectProjectArticle("wodo", "Project A", 10, 1.0, 0.3);

        this.mockMvc.perform(get("/simplePlantProposalForTrees/{amountOfTrees}", 10).accept("application/json"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.plantItems[0].amount").value(7))
                    .andExpect(jsonPath("$.plantItems[0].treeType").value("wood"))
                    .andExpect(jsonPath("$.plantItems[0].treePrice").value(100))
                    .andExpect(jsonPath("$.plantItems[0].projectName").value("Project A"))
                    .andExpect(jsonPath("$.plantItems[1].amount").value(2))
                    .andExpect(jsonPath("$.plantItems[1].treeType").value("doow"))
                    .andExpect(jsonPath("$.plantItems[1].treePrice").value(100))
                    .andExpect(jsonPath("$.plantItems[1].projectName").value("Project A"))
                    .andExpect(jsonPath("$.plantItems[2].amount").value(1))
                    .andExpect(jsonPath("$.plantItems[2].treeType").value("wodo"))
                    .andExpect(jsonPath("$.plantItems[2].treePrice").value(100))
                    .andExpect(jsonPath("$.plantItems[2].projectName").value("Project A"))
                    .andExpect(jsonPath("$.price").value(1000))
                    .andExpect(jsonPath("$.actualAmountOfTrees").value(10))
                    .andExpect(jsonPath("$.targetAmountOfTrees").value(10));
    }

    @Test
    public void testGetCartWithFourArticles() throws Exception {

        dbInjecter.injectTreeType("wood", "desc", 0.5);
        dbInjecter.injectTreeType("doow", "desc", 0.5);
        dbInjecter.injectTreeType("wodo", "desc", 0.5);
        dbInjecter.injectTreeType("dowo", "desc", 0.5);

        dbInjecter.injectUser("Adam");

        dbInjecter.injectProject("Project A", "Adam", "adam's project", true, 0, 0);

        dbInjecter.injectProjectArticle("wood", "Project A", 10, 1.0, 0.8);
        dbInjecter.injectProjectArticle("doow", "Project A", 10, 1.0, 0.5);
        dbInjecter.injectProjectArticle("wodo", "Project A", 10, 1.0, 0.3);
        dbInjecter.injectProjectArticle("dowo", "Project A", 10, 1.0, 0.3);

        this.mockMvc.perform(get("/simplePlantProposalForTrees/{amountOfTrees}", 10).accept("application/json"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.plantItems[0].amount").value(7))
                    .andExpect(jsonPath("$.plantItems[0].treeType").value("wood"))
                    .andExpect(jsonPath("$.plantItems[0].treePrice").value(100))
                    .andExpect(jsonPath("$.plantItems[0].projectName").value("Project A"))
                    .andExpect(jsonPath("$.plantItems[1].amount").value(1))
                    .andExpect(jsonPath("$.plantItems[1].treeType").value("doow"))
                    .andExpect(jsonPath("$.plantItems[1].treePrice").value(100))
                    .andExpect(jsonPath("$.plantItems[1].projectName").value("Project A"))
                    .andExpect(jsonPath("$.plantItems[2].amount").value(1))
                    .andExpect(jsonPath("$.plantItems[2].treeType").value("wodo"))
                    .andExpect(jsonPath("$.plantItems[2].treePrice").value(100))
                    .andExpect(jsonPath("$.plantItems[2].projectName").value("Project A"))
                    .andExpect(jsonPath("$.plantItems[3].amount").value(1))
                    .andExpect(jsonPath("$.plantItems[3].treeType").value("dowo"))
                    .andExpect(jsonPath("$.plantItems[3].treePrice").value(100))
                    .andExpect(jsonPath("$.plantItems[3].projectName").value("Project A"))
                    .andExpect(jsonPath("$.price").value(1000))
                    .andExpect(jsonPath("$.actualAmountOfTrees").value(10))
                    .andExpect(jsonPath("$.targetAmountOfTrees").value(10));

    }

    @Test
    public void testGetCartWithOneArticleNotEnoughTreesRemaining() throws Exception {
        long timeOfPlanting = System.currentTimeMillis();

        dbInjecter.injectTreeType("wood", "desc", 0.5);

        dbInjecter.injectUser("Adam");

        dbInjecter.injectProject("Project A", "Adam", "adam's project", true, 0, 0);

        dbInjecter.injectProjectArticle("wood", "Project A", 10, 1.0, 1.0);

        dbInjecter.injectTreeToProject("wood", "Adam", 5, timeOfPlanting, "Project A");

        this.mockMvc.perform(get("/simplePlantProposalForTrees/{amountOfTrees}", 10).accept("application/json"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.plantItems[0].amount").value(5))
                    .andExpect(jsonPath("$.plantItems[0].treeType").value("wood"))
                    .andExpect(jsonPath("$.plantItems[0].treePrice").value(100))
                    .andExpect(jsonPath("$.plantItems[0].projectName").value("Project A"))
                    .andExpect(jsonPath("$.price").value(500))
                    .andExpect(jsonPath("$.actualAmountOfTrees").value(5))
                    .andExpect(jsonPath("$.targetAmountOfTrees").value(10));
    }

    @Test
    public void testGetCartWithTwoArticlesNotEnoughTreesRemainingForHighestMarge() throws Exception {
        long timeOfPlanting = System.currentTimeMillis();

        dbInjecter.injectTreeType("wood", "desc", 0.5);
        dbInjecter.injectTreeType("doow", "desc", 0.5);

        dbInjecter.injectUser("Adam");

        dbInjecter.injectProject("Project A", "Adam", "adam's project", true, 0, 0);

        dbInjecter.injectProjectArticle("wood", "Project A", 10, 1.0, 1.0);
        dbInjecter.injectProjectArticle("doow", "Project A", 10, 1.0, 0.5);

        dbInjecter.injectTreeToProject("wood", "Adam", 5, timeOfPlanting, "Project A");

        this.mockMvc.perform(get("/simplePlantProposalForTrees/{amountOfTrees}", 10).accept("application/json"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.plantItems[0].amount").value(5))
                    .andExpect(jsonPath("$.plantItems[0].treeType").value("wood"))
                    .andExpect(jsonPath("$.plantItems[0].treePrice").value(100))
                    .andExpect(jsonPath("$.plantItems[0].projectName").value("Project A"))
                    .andExpect(jsonPath("$.plantItems[1].amount").value(5))
                    .andExpect(jsonPath("$.plantItems[1].treeType").value("doow"))
                    .andExpect(jsonPath("$.plantItems[1].treePrice").value(100))
                    .andExpect(jsonPath("$.plantItems[1].projectName").value("Project A"))
                    .andExpect(jsonPath("$.price").value(1000))
                    .andExpect(jsonPath("$.actualAmountOfTrees").value(10))
                    .andExpect(jsonPath("$.targetAmountOfTrees").value(10));
    }

    @Test
    public void testGetCartWithTwoArticlesNoTreesRemainingFromLowerMarge() throws Exception {
        long timeOfPlanting = System.currentTimeMillis();

        dbInjecter.injectTreeType("wood", "desc", 0.5);
        dbInjecter.injectTreeType("doow", "desc", 0.5);

        dbInjecter.injectUser("Adam");

        dbInjecter.injectProject("Project A", "Adam", "adam's project", true, 0, 0);

        dbInjecter.injectProjectArticle("wood", "Project A", 10, 1.0, 1.0);
        dbInjecter.injectProjectArticle("doow", "Project A", 10, 1.0, 0.5);

        dbInjecter.injectTreeToProject("doow", "Adam", 10, timeOfPlanting, "Project A");

        this.mockMvc.perform(get("/simplePlantProposalForTrees/{amountOfTrees}", 10).accept("application/json"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.plantItems[0].amount").value(10))
                    .andExpect(jsonPath("$.plantItems[0].treeType").value("wood"))
                    .andExpect(jsonPath("$.plantItems[0].treePrice").value(100))
                    .andExpect(jsonPath("$.plantItems[0].projectName").value("Project A"))
                    .andExpect(jsonPath("$.price").value(1000))
                    .andExpect(jsonPath("$.actualAmountOfTrees").value(10))
                    .andExpect(jsonPath("$.targetAmountOfTrees").value(10));
    }

    @Test
    public void testGetCartWithTwoArticlesFromDifferentProjects() throws Exception {

        dbInjecter.injectTreeType("wood", "desc", 0.5);
        dbInjecter.injectTreeType("doow", "desc", 0.5);

        dbInjecter.injectUser("Adam");

        dbInjecter.injectProject("Project A", "Adam", "adam's project", true, 0, 0);
        dbInjecter.injectProject("Project B", "Adam", "adam's project", true, 0, 0);

        dbInjecter.injectProjectArticle("wood", "Project A", 10, 1.0, 1.0);
        dbInjecter.injectProjectArticle("doow", "Project B", 10, 1.0, 0.5);

        this.mockMvc.perform(get("/simplePlantProposalForTrees/{amountOfTrees}", 10).accept("application/json"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.plantItems[0].amount").value(7))
                    .andExpect(jsonPath("$.plantItems[0].treeType").value("wood"))
                    .andExpect(jsonPath("$.plantItems[0].treePrice").value(100))
                    .andExpect(jsonPath("$.plantItems[0].projectName").value("Project A"))
                    .andExpect(jsonPath("$.plantItems[1].amount").value(3))
                    .andExpect(jsonPath("$.plantItems[1].treeType").value("doow"))
                    .andExpect(jsonPath("$.plantItems[1].treePrice").value(100))
                    .andExpect(jsonPath("$.plantItems[1].projectName").value("Project B"))
                    .andExpect(jsonPath("$.price").value(1000))
                    .andExpect(jsonPath("$.actualAmountOfTrees").value(10))
                    .andExpect(jsonPath("$.targetAmountOfTrees").value(10));
    }

    @Test
    public void testGetCartWithFourArticlesFromDifferentProjects() throws Exception {

        dbInjecter.injectTreeType("wood", "desc", 0.5);
        dbInjecter.injectTreeType("doow", "desc", 0.5);

        dbInjecter.injectUser("Adam");

        dbInjecter.injectProject("Project A", "Adam", "adam's project", true, 0, 0);
        dbInjecter.injectProject("Project B", "Adam", "adam's project", true, 0, 0);

        dbInjecter.injectProjectArticle("wood", "Project A", 10, 3.0, 2.0);
        dbInjecter.injectProjectArticle("doow", "Project A", 10, 2.0, 1.0);
        dbInjecter.injectProjectArticle("wood", "Project B", 10, 2.0, 1.0);
        dbInjecter.injectProjectArticle("doow", "Project B", 10, 2.0, 0.5);

        this.mockMvc.perform(get("/simplePlantProposalForTrees/{amountOfTrees}", 10).accept("application/json"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.plantItems[0].amount").value(7))
                    .andExpect(jsonPath("$.plantItems[0].treeType").value("wood"))
                    .andExpect(jsonPath("$.plantItems[0].treePrice").value(300))
                    .andExpect(jsonPath("$.plantItems[0].projectName").value("Project A"))
                    .andExpect(jsonPath("$.plantItems[1].amount").value(1))
                    .andExpect(jsonPath("$.plantItems[1].treeType").value("doow"))
                    .andExpect(jsonPath("$.plantItems[1].treePrice").value(200))
                    .andExpect(jsonPath("$.plantItems[1].projectName").value("Project A"))
                    .andExpect(jsonPath("$.plantItems[2].amount").value(1))
                    .andExpect(jsonPath("$.plantItems[2].treeType").value("wood"))
                    .andExpect(jsonPath("$.plantItems[2].treePrice").value(200))
                    .andExpect(jsonPath("$.plantItems[2].projectName").value("Project B"))
                    .andExpect(jsonPath("$.plantItems[3].amount").value(1))
                    .andExpect(jsonPath("$.plantItems[3].treeType").value("doow"))
                    .andExpect(jsonPath("$.plantItems[3].treePrice").value(200))
                    .andExpect(jsonPath("$.plantItems[3].projectName").value("Project B"))
                    .andExpect(jsonPath("$.price").value(2700))
                    .andExpect(jsonPath("$.actualAmountOfTrees").value(10))
                    .andExpect(jsonPath("$.targetAmountOfTrees").value(10));
    }

    @Test
    public void testGetCartWithFourArticlesThreeArticlesAveraged() throws Exception {

        dbInjecter.injectTreeType("wood", "desc", 0.5);
        dbInjecter.injectTreeType("doow", "desc", 0.5);
        dbInjecter.injectTreeType("wodo", "desc", 0.5);
        dbInjecter.injectTreeType("dowo", "desc", 0.5);

        dbInjecter.injectUser("Adam");

        dbInjecter.injectProject("Project A", "Adam", "adam's project", true, 0, 0);

        dbInjecter.injectProjectArticle("wood", "Project A", 1000, 1.0, 0.8);
        dbInjecter.injectProjectArticle("doow", "Project A", 500, 1.0, 0.5);
        dbInjecter.injectProjectArticle("wodo", "Project A", 500, 1.0, 0.5);
        dbInjecter.injectProjectArticle("dowo", "Project A", 500, 1.0, 0.5);

        this.mockMvc.perform(get("/simplePlantProposalForTrees/{amountOfTrees}", 1000).accept("application/json"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.plantItems[0].amount").value(700))
                    .andExpect(jsonPath("$.plantItems[0].treeType").value("wood"))
                    .andExpect(jsonPath("$.plantItems[0].treePrice").value(100))
                    .andExpect(jsonPath("$.plantItems[0].projectName").value("Project A"))
                    .andExpect(jsonPath("$.plantItems[1].amount").value(100))
                    .andExpect(jsonPath("$.plantItems[1].treeType").value("doow"))
                    .andExpect(jsonPath("$.plantItems[1].treePrice").value(100))
                    .andExpect(jsonPath("$.plantItems[1].projectName").value("Project A"))
                    .andExpect(jsonPath("$.plantItems[2].amount").value(100))
                    .andExpect(jsonPath("$.plantItems[2].treeType").value("wodo"))
                    .andExpect(jsonPath("$.plantItems[2].treePrice").value(100))
                    .andExpect(jsonPath("$.plantItems[2].projectName").value("Project A"))
                    .andExpect(jsonPath("$.plantItems[3].amount").value(100))
                    .andExpect(jsonPath("$.plantItems[3].treeType").value("dowo"))
                    .andExpect(jsonPath("$.plantItems[3].treePrice").value(100))
                    .andExpect(jsonPath("$.plantItems[3].projectName").value("Project A"))
                    .andExpect(jsonPath("$.price").value(100000))
                    .andExpect(jsonPath("$.actualAmountOfTrees").value(1000))
                    .andExpect(jsonPath("$.targetAmountOfTrees").value(1000));
    }

    @Test
    public void testGetCartWithFourArticlesTwoArticlesAveragedOneNotEnough() throws Exception {

        dbInjecter.injectTreeType("wood", "desc", 0.5);
        dbInjecter.injectTreeType("doow", "desc", 0.5);
        dbInjecter.injectTreeType("wodo", "desc", 0.5);
        dbInjecter.injectTreeType("dowo", "desc", 0.5);

        dbInjecter.injectUser("Adam");

        dbInjecter.injectProject("Project A", "Adam", "adam's project", true, 0, 0);

        dbInjecter.injectProjectArticle("wood", "Project A", 1000, 1.0, 0.8);
        dbInjecter.injectProjectArticle("doow", "Project A", 500, 1.0, 0.5);
        dbInjecter.injectProjectArticle("wodo", "Project A", 500, 1.0, 0.5);
        dbInjecter.injectProjectArticle("dowo", "Project A", 100, 1.0, 0.5);

        dbInjecter.injectTreeToProject("dowo", "Adam", 50, System.currentTimeMillis(), "Project A");

        this.mockMvc.perform(get("/simplePlantProposalForTrees/{amountOfTrees}", 1000).accept("application/json"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.plantItems[0].amount").value(700))
                    .andExpect(jsonPath("$.plantItems[0].treeType").value("wood"))
                    .andExpect(jsonPath("$.plantItems[0].treePrice").value(100))
                    .andExpect(jsonPath("$.plantItems[0].projectName").value("Project A"))
                    .andExpect(jsonPath("$.plantItems[1].amount").value(125))
                    .andExpect(jsonPath("$.plantItems[1].treeType").value("doow"))
                    .andExpect(jsonPath("$.plantItems[1].treePrice").value(100))
                    .andExpect(jsonPath("$.plantItems[1].projectName").value("Project A"))
                    .andExpect(jsonPath("$.plantItems[2].amount").value(125))
                    .andExpect(jsonPath("$.plantItems[2].treeType").value("wodo"))
                    .andExpect(jsonPath("$.plantItems[2].treePrice").value(100))
                    .andExpect(jsonPath("$.plantItems[2].projectName").value("Project A"))
                    .andExpect(jsonPath("$.plantItems[3].amount").value(50))
                    .andExpect(jsonPath("$.plantItems[3].treeType").value("dowo"))
                    .andExpect(jsonPath("$.plantItems[3].treePrice").value(100))
                    .andExpect(jsonPath("$.plantItems[3].projectName").value("Project A"))
                    .andExpect(jsonPath("$.price").value(100000))
                    .andExpect(jsonPath("$.actualAmountOfTrees").value(1000))
                    .andExpect(jsonPath("$.targetAmountOfTrees").value(1000));
    }

    @Test
    public void testGetCartWithTwoArticlesLowerMargeNotEnoughRemaining() throws Exception {
        dbInjecter.injectTreeType("wood", "desc", 0.5);
        dbInjecter.injectTreeType("doow", "desc", 0.5);

        dbInjecter.injectUser("Adam");

        dbInjecter.injectProject("Project A", "Adam", "adam's project", true, 0, 0);

        dbInjecter.injectProjectArticle("wood", "Project A", 1000, 3.0, 2.0);
        dbInjecter.injectProjectArticle("doow", "Project A", 100, 1.0, 0.5);

        this.mockMvc.perform(get("/simplePlantProposalForTrees/{amountOfTrees}", 1000).accept("application/json"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.plantItems[0].amount").value(900))
                    .andExpect(jsonPath("$.plantItems[0].treeType").value("wood"))
                    .andExpect(jsonPath("$.plantItems[0].treePrice").value(300))
                    .andExpect(jsonPath("$.plantItems[0].projectName").value("Project A"))
                    .andExpect(jsonPath("$.plantItems[1].amount").value(100))
                    .andExpect(jsonPath("$.plantItems[1].treeType").value("doow"))
                    .andExpect(jsonPath("$.plantItems[1].treePrice").value(100))
                    .andExpect(jsonPath("$.plantItems[1].projectName").value("Project A"))
                    .andExpect(jsonPath("$.price").value(280000))
                    .andExpect(jsonPath("$.actualAmountOfTrees").value(1000))
                    .andExpect(jsonPath("$.targetAmountOfTrees").value(1000));
    }

    @Test
    public void testGetCartWithFourArticlesTwoArticlesAveragedOneNoRemainingTrees() throws Exception {

        dbInjecter.injectTreeType("wood", "desc", 0.5);
        dbInjecter.injectTreeType("doow", "desc", 0.5);
        dbInjecter.injectTreeType("wodo", "desc", 0.5);
        dbInjecter.injectTreeType("dowo", "desc", 0.5);

        dbInjecter.injectUser("Adam");

        dbInjecter.injectProject("Project A", "Adam", "adam's project", true, 0, 0);

        dbInjecter.injectProjectArticle("wood", "Project A", 1000, 1.0, 0.8);
        dbInjecter.injectProjectArticle("doow", "Project A", 500, 1.0, 0.5);
        dbInjecter.injectProjectArticle("wodo", "Project A", 500, 1.0, 0.5);
        dbInjecter.injectProjectArticle("dowo", "Project A", 100, 1.0, 0.5);

        dbInjecter.injectTreeToProject("dowo", "Adam", 100, System.currentTimeMillis(), "Project A");

        this.mockMvc.perform(get("/simplePlantProposalForTrees/{amountOfTrees}", 1000).accept("application/json"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.plantItems[0].amount").value(700))
                    .andExpect(jsonPath("$.plantItems[0].treeType").value("wood"))
                    .andExpect(jsonPath("$.plantItems[0].treePrice").value(100))
                    .andExpect(jsonPath("$.plantItems[0].projectName").value("Project A"))
                    .andExpect(jsonPath("$.plantItems[1].amount").value(150))
                    .andExpect(jsonPath("$.plantItems[1].treeType").value("doow"))
                    .andExpect(jsonPath("$.plantItems[1].treePrice").value(100))
                    .andExpect(jsonPath("$.plantItems[1].projectName").value("Project A"))
                    .andExpect(jsonPath("$.plantItems[2].amount").value(150))
                    .andExpect(jsonPath("$.plantItems[2].treeType").value("wodo"))
                    .andExpect(jsonPath("$.plantItems[2].treePrice").value(100))
                    .andExpect(jsonPath("$.plantItems[2].projectName").value("Project A"))
                    .andExpect(jsonPath("$.price").value(100000))
                    .andExpect(jsonPath("$.actualAmountOfTrees").value(1000))
                    .andExpect(jsonPath("$.targetAmountOfTrees").value(1000));
    }

}
