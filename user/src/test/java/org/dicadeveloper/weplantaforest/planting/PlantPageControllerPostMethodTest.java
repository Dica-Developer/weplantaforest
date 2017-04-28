package org.dicadeveloper.weplantaforest.planting;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import java.util.List;

import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.cart.CartRepository;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.common.testSupport.TestUtil;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBag;
import org.dicadeveloper.weplantaforest.projects.ProjectArticle;
import org.dicadeveloper.weplantaforest.projects.ProjectArticleRepository;
import org.dicadeveloper.weplantaforest.security.TokenAuthenticationService;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.dicadeveloper.weplantaforest.testsupport.PlantBagBuilder;
import org.dicadeveloper.weplantaforest.trees.Tree;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.dicadeveloper.weplantaforest.user.UserRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@SpringBootTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_CLASS)
@Transactional
public class PlantPageControllerPostMethodTest {

    private static MockMvc mockMvc;

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

    @Autowired
    private ProjectArticleRepository _projectArticleRepository;

    @Autowired
    private TokenAuthenticationService _tokenAuthenticationService;

    @Autowired
    private UserRepository _userRepository;

    static boolean entitiesInjected = false;

    PlantBagBuilder plantBagBuilder = new PlantBagBuilder();

    @Before
    public void setup() {
        if (!entitiesInjected) {
            mockMvc = webAppContextSetup(this.webApplicationContext).build();

            dbInjecter.injectTreeType("wood", "desc", 0.5);
            dbInjecter.injectTreeType("doow", "desc", 0.5);
            dbInjecter.injectTreeType("wodo", "desc", 0.5);

            dbInjecter.injectUser("Adam");
            dbInjecter.injectUser("Bert");

            dbInjecter.injectProject("Project A", "Adam", "adam's project", true, 0, 0);

            dbInjecter.injectProjectArticle("wood", "Project A", 10, 3.0, 1.0);
            dbInjecter.injectProjectArticle("doow", "Project A", 10, 3.0, 1.0);
            dbInjecter.injectProjectArticle("wodo", "Project A", 10, 3.0, 1.0);

            entitiesInjected = true;
        }
    }

    @After
    public void clear() {
        _cartRepository.deleteAll();
        _treeRepository.deleteAll();
    }

    @Test
    @Rollback(false)
    public void testDonateTreesSatusOk() throws Exception {
        String userToken = _tokenAuthenticationService.getTokenFromUser(_userRepository.findOne(1L));

        PlantBag plantPageData = plantBagBuilder.initializeProjectDataAndAddToPlantBag("Project A")
                                                .createPlantItemAndAddToPlantBag(3, 300, "wood", "Project A")
                                                .build();

        mockMvc.perform(post(Uris.COMPLEX_DONATION).contentType(TestUtil.APPLICATION_JSON_UTF8)
                                                   .header("X-AUTH-TOKEN", userToken)
                                                   .content(TestUtil.convertObjectToJsonBytes(plantPageData)))
               .andExpect(status().isOk());

        assertThat(_cartRepository.count()).isEqualTo(1L);

        List<Cart> carts = _cartRepository.findCartsByUserId(1L);
        assertThat(carts.get(0)
                        .getTotalPrice()
                        .doubleValue()).isEqualTo(9.0);
        assertThat(carts.get(0)
                        .getCartItems()
                        .get(0)
                        .getProjectArticleId()).isEqualTo(1);
        assertThat(carts.get(0)
                        .getCartItems()
                        .get(0)
                        .getTree()
                        .getTreeType()
                        .getName()).isEqualTo("wood");
        assertThat(carts.get(0)
                        .getBuyer()
                        .getName()).isEqualTo("Adam");

        assertThat(_treeRepository.count()).isEqualTo(1L);

        ProjectArticle projectArticle = _projectArticleRepository.findOne(1L);
        long amountOfTreesPlantedByProjectArticle = _treeRepository.countAlreadyPlantedTreesByProjectArticle(projectArticle);
        assertThat(amountOfTreesPlantedByProjectArticle).isEqualTo(3);

        long createdTreeId = carts.get(0)
                                  .getTrees()
                                  .get(0)
                                  .getId();
        Tree createdTree = _treeRepository.findOne(createdTreeId);
        assertThat(createdTree.getAmount()).isEqualTo(3);
        assertThat(createdTree.getOwner()
                              .getName()).isEqualTo("Adam");
        assertThat(createdTree.getProjectArticle()
                              .getArticleId()).isEqualTo(1L);
    }

    @Test
    @Rollback(false)
    public void testDonateTreesWithMultipleEntriesSatusOk() throws Exception {
        String userToken = _tokenAuthenticationService.getTokenFromUser(_userRepository.findOne(2L));

        PlantBag plantPageData = plantBagBuilder.initializeProjectDataAndAddToPlantBag("Project A")
                                                .createPlantItemAndAddToPlantBag(3, 300, "wood", "Project A")
                                                .createPlantItemAndAddToPlantBag(3, 300, "wodo", "Project A")
                                                .createPlantItemAndAddToPlantBag(3, 300, "doow", "Project A")
                                                .build();

        mockMvc.perform(post(Uris.COMPLEX_DONATION).contentType(TestUtil.APPLICATION_JSON_UTF8)
                                                   .header("X-AUTH-TOKEN", userToken)
                                                   .content(TestUtil.convertObjectToJsonBytes(plantPageData)))
               .andExpect(status().isOk());

        assertThat(_cartRepository.count()).isEqualTo(1L);

        List<Cart> carts = _cartRepository.findCartsByUserId(2L);
        assertThat(carts.get(0)
                        .getTotalPrice()
                        .doubleValue()).isEqualTo(27.0);
        assertThat(carts.get(0)
                        .getPlantArticleIds()).contains(1L, 2L, 3L);
        assertThat(carts.get(0)
                        .getBuyer()
                        .getName()).isEqualTo("Bert");

        assertThat(_treeRepository.count()).isEqualTo(3L);

        for (int i = 1; i <= 3; i++) {
            ProjectArticle projectArticle = _projectArticleRepository.findOne((long) i);
            long amountOfTreesPlantedByProjectArticle = _treeRepository.countAlreadyPlantedTreesByProjectArticle(projectArticle);
            assertThat(amountOfTreesPlantedByProjectArticle).isEqualTo(3);

            long createdTreeId = carts.get(0)
                                      .getTrees()
                                      .get(i - 1)
                                      .getId();
            Tree tree = _treeRepository.findOne(createdTreeId);
            assertThat(tree.getOwner()
                           .getName()).isEqualTo("Bert");
        }
    }

    @Test
    public void testDonateTreesSatusBadRequest() throws Exception {
        PlantBag plantPageData = plantBagBuilder.initializeProjectDataAndAddToPlantBag("Project A")
                                                .createPlantItemAndAddToPlantBag(11, 300, "wood", "Project A")
                                                .build();

        mockMvc.perform(post(Uris.COMPLEX_DONATION).contentType(TestUtil.APPLICATION_JSON_UTF8)
                                                   .content(TestUtil.convertObjectToJsonBytes(plantPageData)))
               .andExpect(status().isBadRequest());

        assertThat(_cartRepository.count()).isEqualTo(0);

    }

}
