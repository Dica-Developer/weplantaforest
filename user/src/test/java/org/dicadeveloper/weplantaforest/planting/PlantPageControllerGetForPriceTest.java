package org.dicadeveloper.weplantaforest.planting;

import static org.hamcrest.Matchers.isOneOf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.projects.ProjectArticleRepository;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.junit.After;
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
@DirtiesContext(classMode = ClassMode.AFTER_CLASS)
public class PlantPageControllerGetForPriceTest {

    private static MockMvc mockMvc;

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private DbInjecter dbInjecter;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private ProjectArticleRepository _projectArticleRepository;

    @Autowired
    private TreeRepository _treeRepository;

    static long timeOfPlanting;
    static boolean entitiesInjected = false;

    @Before
    public void setup() {
        if (!entitiesInjected) {
            mockMvc = webAppContextSetup(this.webApplicationContext).build();
            timeOfPlanting = System.currentTimeMillis();

            dbInjecter.injectTreeType("wood", "desc", 0.5);
            dbInjecter.injectTreeType("doow", "desc", 0.5);
            dbInjecter.injectTreeType("wodo", "desc", 0.5);
            dbInjecter.injectTreeType("dowo", "desc", 0.5);

            dbInjecter.injectUser("Adam");

            dbInjecter.injectProject("Project A", "Adam", "adam's project", true, 0, 0);
            dbInjecter.injectProject("Project B", "Adam", "adam's project", true, 0, 0);

            entitiesInjected = true;
        }
    }

    @After
    public void clear() {
        _treeRepository.deleteAll();
        _projectArticleRepository.deleteAll();
    }

    @Test
    public void testGetCartWithOneArticle() throws Exception {
        dbInjecter.injectProjectArticle("wood", "Project A", 10, 1.0, 1.0);

        mockMvc.perform(get(Uris.COMPLEX_PROPOSAL_FOR_PRICE + "{targetedPrice}", 1000).accept("application/json"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.projects['Project A'].plantItems['wood'].amount").value(10))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['wood'].treePrice").value(100))
               .andExpect(jsonPath("$.actualPrice").value(1000))
               .andExpect(jsonPath("$.targetPrice").value(1000));
    }

    @Test
    public void testGetCartWithTwoArticles() throws Exception {
        dbInjecter.injectProjectArticle("doow", "Project A", 10, 1.0, 0.8);
        dbInjecter.injectProjectArticle("wood", "Project A", 10, 1.0, 0.5);

        mockMvc.perform(get(Uris.COMPLEX_PROPOSAL_FOR_PRICE + "{targetedPrice}", 1000).accept("application/json"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.projects['Project A'].plantItems['doow'].amount").value(7))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['doow'].treePrice").value(100))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['wood'].amount").value(3))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['wood'].treePrice").value(100))
               .andExpect(jsonPath("$.actualPrice").value(1000))
               .andExpect(jsonPath("$.targetPrice").value(1000));
    }

    @Test
    public void testGetCartWithThreeArticles() throws Exception {
        dbInjecter.injectProjectArticle("wood", "Project A", 10, 1.0, 0.8);
        dbInjecter.injectProjectArticle("doow", "Project A", 10, 1.0, 0.5);
        dbInjecter.injectProjectArticle("wodo", "Project A", 10, 1.0, 0.3);

        mockMvc.perform(get(Uris.COMPLEX_PROPOSAL_FOR_PRICE + "{targetedPrice}", 1000).accept("application/json"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.projects['Project A'].plantItems['wood'].amount").value(7))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['wood'].treePrice").value(100))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['doow'].amount").value(isOneOf(1, 2)))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['doow'].treePrice").value(100))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['wodo'].amount").value(isOneOf(1, 2)))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['wodo'].treePrice").value(100))
               .andExpect(jsonPath("$.actualPrice").value(1000))
               .andExpect(jsonPath("$.targetPrice").value(1000));

    }

    @Test
    public void testGetCartWithFourArticles() throws Exception {
        dbInjecter.injectProjectArticle("wood", "Project A", 10, 1.0, 0.8);
        dbInjecter.injectProjectArticle("doow", "Project A", 10, 1.0, 0.5);
        dbInjecter.injectProjectArticle("wodo", "Project A", 10, 1.0, 0.3);
        dbInjecter.injectProjectArticle("dowo", "Project A", 10, 1.0, 0.3);

        mockMvc.perform(get(Uris.COMPLEX_PROPOSAL_FOR_PRICE + "{targetedPrice}", 1000).accept("application/json"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.projects['Project A'].plantItems['wood'].amount").value(7))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['wood'].treePrice").value(100))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['doow'].amount").value(1))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['doow'].treePrice").value(100))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['wodo'].amount").value(1))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['wodo'].treePrice").value(100))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['dowo'].amount").value(1))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['dowo'].treePrice").value(100))
               .andExpect(jsonPath("$.actualPrice").value(1000))
               .andExpect(jsonPath("$.targetPrice").value(1000));

    }

    @Test
    public void testGetCartWithOneArticleNotEnoughTreesRemaining() throws Exception {
        dbInjecter.injectProjectArticle("wood", "Project A", 10, 1.0, 1.0);

        dbInjecter.injectTreeToProject("wood", "Adam", 5, timeOfPlanting, "Project A");

        mockMvc.perform(get(Uris.COMPLEX_PROPOSAL_FOR_PRICE + "{targetedPrice}", 1000).accept("application/json"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.projects['Project A'].plantItems['wood'].amount").value(5))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['wood'].treePrice").value(100))
               .andExpect(jsonPath("$.actualPrice").value(500))
               .andExpect(jsonPath("$.targetPrice").value(1000));
    }

    @Test
    public void testGetCartWithTwoArticlesNotEnoughTreesRemainingForHighestMarge() throws Exception {
        dbInjecter.injectProjectArticle("wood", "Project A", 10, 1.0, 1.0);
        dbInjecter.injectProjectArticle("doow", "Project A", 10, 1.0, 0.5);

        dbInjecter.injectTreeToProject("wood", "Adam", 5, timeOfPlanting, "Project A");

        mockMvc.perform(get(Uris.COMPLEX_PROPOSAL_FOR_PRICE + "{targetedPrice}", 1000).accept("application/json"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.projects['Project A'].plantItems['wood'].amount").value(5))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['wood'].treePrice").value(100))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['doow'].amount").value(5))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['doow'].treePrice").value(100))
               .andExpect(jsonPath("$.actualPrice").value(1000))
               .andExpect(jsonPath("$.targetPrice").value(1000));
    }

    @Test
    public void testGetCartWithTwoArticlesNoTreesRemainingForHighestMarge() throws Exception {
        dbInjecter.injectProjectArticle("wood", "Project A", 10, 1.0, 1.0);
        dbInjecter.injectProjectArticle("doow", "Project A", 10, 1.0, 0.5);

        dbInjecter.injectTreeToProject("wood", "Adam", 10, timeOfPlanting, "Project A");

        mockMvc.perform(get(Uris.COMPLEX_PROPOSAL_FOR_PRICE + "{targetedPrice}", 1000).accept("application/json"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.projects['Project A'].plantItems['doow'].amount").value(10))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['doow'].treePrice").value(100))
               .andExpect(jsonPath("$.actualPrice").value(1000))
               .andExpect(jsonPath("$.targetPrice").value(1000));
    }

    @Test
    public void testGetCartWithTwoArticlesNoTreesRemainingFromLowerMarge() throws Exception {
        dbInjecter.injectProjectArticle("wood", "Project A", 10, 1.0, 1.0);
        dbInjecter.injectProjectArticle("doow", "Project A", 10, 1.0, 0.5);

        dbInjecter.injectTreeToProject("doow", "Adam", 10, timeOfPlanting, "Project A");

        mockMvc.perform(get(Uris.COMPLEX_PROPOSAL_FOR_PRICE + "{targetedPrice}", 1000).accept("application/json"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.projects['Project A'].plantItems['wood'].amount").value(10))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['wood'].treePrice").value(100))
               .andExpect(jsonPath("$.actualPrice").value(1000))
               .andExpect(jsonPath("$.targetPrice").value(1000));
    }

    @Test
    public void testGetCartWithTwoArticlesWherePriceTenCantBeReached() throws Exception {
        dbInjecter.injectProjectArticle("wood", "Project A", 10, 3.0, 1.0);
        dbInjecter.injectProjectArticle("doow", "Project A", 10, 1.5, 0.5);

        mockMvc.perform(get(Uris.COMPLEX_PROPOSAL_FOR_PRICE + "{targetedPrice}", 1000).accept("application/json"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.projects['Project A'].plantItems['wood'].amount").value(2))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['wood'].treePrice").value(300))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['doow'].amount").value(2))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['doow'].treePrice").value(150))
               .andExpect(jsonPath("$.actualPrice").value(900))
               .andExpect(jsonPath("$.targetPrice").value(1000));
    }

    @Test
    public void testGetCartWithTwoArticlesFromDifferentProjects() throws Exception {
        dbInjecter.injectProjectArticle("wood", "Project A", 10, 1.0, 1.0);
        dbInjecter.injectProjectArticle("doow", "Project B", 10, 1.0, 0.5);

        mockMvc.perform(get(Uris.COMPLEX_PROPOSAL_FOR_PRICE + "{targetedPrice}", 1000).accept("application/json"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.projects['Project A'].plantItems['wood'].amount").value(7))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['wood'].treePrice").value(100))
               .andExpect(jsonPath("$.projects['Project B'].plantItems['doow'].amount").value(3))
               .andExpect(jsonPath("$.projects['Project B'].plantItems['doow'].treePrice").value(100))
               .andExpect(jsonPath("$.actualPrice").value(1000))
               .andExpect(jsonPath("$.targetPrice").value(1000));
    }

    @Test
    public void testGetCartWithFourArticlesFromDifferentProjects() throws Exception {
        dbInjecter.injectProjectArticle("wood", "Project A", 10, 3.0, 2.0);
        dbInjecter.injectProjectArticle("doow", "Project A", 10, 2.0, 1.0);
        dbInjecter.injectProjectArticle("wood", "Project B", 10, 2.0, 1.0);
        dbInjecter.injectProjectArticle("doow", "Project B", 10, 2.0, 0.5);

        mockMvc.perform(get(Uris.COMPLEX_PROPOSAL_FOR_PRICE + "{targetedPrice}", 1000).accept("application/json"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.projects['Project A'].plantItems['wood'].amount").value(2))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['wood'].treePrice").value(300))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['doow'].amount").value(isOneOf(0, 1)))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['doow'].treePrice").value(200))
               .andExpect(jsonPath("$.projects['Project B'].plantItems['wood'].amount").value(isOneOf(0, 1)))
               .andExpect(jsonPath("$.projects['Project B'].plantItems['wood'].treePrice").value(200))
               .andExpect(jsonPath("$.projects['Project B'].plantItems['doow'].amount").value(isOneOf(0, 1)))
               .andExpect(jsonPath("$.projects['Project B'].plantItems['doow'].treePrice").value(200))
               .andExpect(jsonPath("$.actualPrice").value(1000))
               .andExpect(jsonPath("$.targetPrice").value(1000));
    }

    @Test
    public void testGetCartWithFourArticlesFromDifferentProjectsWithOtherTargetedPrice() throws Exception {
        dbInjecter.injectProjectArticle("wood", "Project A", 10, 3.0, 2.0);
        dbInjecter.injectProjectArticle("doow", "Project A", 10, 2.0, 1.0);
        dbInjecter.injectProjectArticle("wood", "Project B", 10, 2.0, 1.0);
        dbInjecter.injectProjectArticle("doow", "Project B", 10, 2.0, 0.5);

        mockMvc.perform(get(Uris.COMPLEX_PROPOSAL_FOR_PRICE + "{targetedPrice}", 3000).accept("application/json"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.projects['Project A'].plantItems['wood'].amount").value(7))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['wood'].treePrice").value(300))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['doow'].amount").value(isOneOf(1, 2)))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['doow'].treePrice").value(200))
               .andExpect(jsonPath("$.projects['Project B'].plantItems['wood'].amount").value(isOneOf(1, 2)))
               .andExpect(jsonPath("$.projects['Project B'].plantItems['wood'].treePrice").value(200))
               .andExpect(jsonPath("$.projects['Project B'].plantItems['doow'].amount").value(isOneOf(1, 2)))
               .andExpect(jsonPath("$.projects['Project B'].plantItems['doow'].treePrice").value(200))
               .andExpect(jsonPath("$.actualPrice").value(2900))
               .andExpect(jsonPath("$.targetPrice").value(3000));
    }

    @Test
    public void testGetCartWithFourArticlesThreeArticlesAveraged() throws Exception {
        dbInjecter.injectProjectArticle("wood", "Project A", 500, 3.5, 2.0);
        dbInjecter.injectProjectArticle("doow", "Project A", 500, 1.0, 0.5);
        dbInjecter.injectProjectArticle("wodo", "Project A", 500, 1.0, 0.5);
        dbInjecter.injectProjectArticle("dowo", "Project A", 500, 1.0, 0.5);

        mockMvc.perform(get(Uris.COMPLEX_PROPOSAL_FOR_PRICE + "{targetedPrice}", 100000).accept("application/json"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.projects['Project A'].plantItems['wood'].amount").value(200))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['wood'].treePrice").value(350))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['doow'].amount").value(100))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['doow'].treePrice").value(100))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['wodo'].amount").value(100))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['wodo'].treePrice").value(100))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['dowo'].amount").value(100))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['dowo'].treePrice").value(100))
               .andExpect(jsonPath("$.actualPrice").value(100000))
               .andExpect(jsonPath("$.targetPrice").value(100000));
    }

    @Test
    public void testGetCartWithFourArticlesTwoArticlesAveragedOneNotEnough() throws Exception {
        dbInjecter.injectProjectArticle("wood", "Project A", 500, 3.5, 2.0);
        dbInjecter.injectProjectArticle("doow", "Project A", 500, 1.0, 0.5);
        dbInjecter.injectProjectArticle("wodo", "Project A", 500, 1.0, 0.5);
        dbInjecter.injectProjectArticle("dowo", "Project A", 100, 1.0, 0.5);

        dbInjecter.injectTreeToProject("dowo", "Adam", 50, System.currentTimeMillis(), "Project A");

        mockMvc.perform(get(Uris.COMPLEX_PROPOSAL_FOR_PRICE + "{targetedPrice}", 100000).accept("application/json"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.projects['Project A'].plantItems['wood'].amount").value(200))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['wood'].treePrice").value(350))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['doow'].amount").value(125))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['doow'].treePrice").value(100))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['wodo'].amount").value(125))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['wodo'].treePrice").value(100))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['dowo'].amount").value(50))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['dowo'].treePrice").value(100))
               .andExpect(jsonPath("$.actualPrice").value(100000))
               .andExpect(jsonPath("$.targetPrice").value(100000));
    }

    @Test
    public void testGetCartWithTwoArticlesLowerMargeNotEnoughRemaining() throws Exception {
        dbInjecter.injectProjectArticle("wood", "Project A", 500, 3.0, 2.0);
        dbInjecter.injectProjectArticle("doow", "Project A", 100, 1.0, 0.5);

        mockMvc.perform(get(Uris.COMPLEX_PROPOSAL_FOR_PRICE + "{targetedPrice}", 100000).accept("application/json"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.projects['Project A'].plantItems['wood'].amount").value(300))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['wood'].treePrice").value(300))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['doow'].amount").value(100))
               .andExpect(jsonPath("$.projects['Project A'].plantItems['doow'].treePrice").value(100))
               .andExpect(jsonPath("$.actualPrice").value(100000))
               .andExpect(jsonPath("$.targetPrice").value(100000));
    }

}
