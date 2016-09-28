package org.dicadeveloper.weplantaforest.certificate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.common.testSupport.TestUtil;
import org.dicadeveloper.weplantaforest.security.TokenAuthenticationService;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.dicadeveloper.weplantaforest.trees.Tree;
import org.dicadeveloper.weplantaforest.user.UserRepository;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@SpringApplicationConfiguration(classes = WeplantaforestApplication.class)
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_CLASS)
@Transactional
public class CertificateControllerTest {

    private static MockMvc mockMvc;

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private DbInjecter _dbInjecter;

    @Autowired
    private CertificateRepository _certificateRepository;

    @Autowired
    private WebApplicationContext webApplicationContext;

    static boolean entitiesInjected = false;
    static long timeOfPlanting;

    static String certNumberForOneTree;
    static String certNumberForThreeTrees;
    static String certNumberForTwoCarts;

    @Before
    public void setup() {
        if (!entitiesInjected) {
            mockMvc = webAppContextSetup(this.webApplicationContext).build();
            timeOfPlanting = System.currentTimeMillis();

            _dbInjecter.injectUser("Adam");

            _dbInjecter.injectTreeType("wood", "wood desc", 0.5);
            _dbInjecter.injectTreeType("doow", "wood desc", 0.5);
            _dbInjecter.injectTreeType("wodo", "wood desc", 0.5);

            _dbInjecter.injectProject("Project A", "Adam", "desc", true, 1.0f, 2.0f);

            _dbInjecter.injectProjectArticle("wood", "Project A", 100, 1.0, 0.5);
            _dbInjecter.injectProjectArticle("doow", "Project A", 100, 1.0, 0.5);
            _dbInjecter.injectProjectArticle("wodo", "Project A", 100, 1.0, 0.5);

            Tree tree = _dbInjecter.injectTreeToProject("wood", "Adam", 1, timeOfPlanting, "Project A");

            Tree tree1 = _dbInjecter.injectTreeToProject("wood", "Adam", 1, timeOfPlanting, "Project A");
            Tree tree2 = _dbInjecter.injectTreeToProject("doow", "Adam", 2, timeOfPlanting, "Project A");
            Tree tree3 = _dbInjecter.injectTreeToProject("wodo", "Adam", 3, timeOfPlanting, "Project A");

            Cart cart1 = _dbInjecter.injectCartWithTrees("Adam", tree);
            Cart cart2 = _dbInjecter.injectCartWithTrees("Adam", tree1, tree2, tree3);

            List<Cart> carts = new ArrayList<>();
            carts.add(cart1);
            carts.add(cart2);

            certNumberForOneTree = _dbInjecter.injectCertificateWithTreesForOneCart("Adam", tree);
            certNumberForThreeTrees = _dbInjecter.injectCertificateWithTreesForOneCart("Adam", tree1, tree2, tree3);
            certNumberForTwoCarts = _dbInjecter.injectCertificateWithCarts("Adam", carts);

            entitiesInjected = true;
        }
    }

    @Test
    @Rollback(false)
    public void testGetTreeByCertificateId() throws Exception {
        mockMvc.perform(get(Uris.CERTIFICATE_SEARCH + "{certificateNumber}", certNumberForOneTree).accept("application/json"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.[0].id").value(1))
               .andExpect(jsonPath("$.[0].amount").value(1))
               .andExpect(jsonPath("$.[0].submittedOn").value(timeOfPlanting))
               .andExpect(jsonPath("$.[0].plantedOn").value(timeOfPlanting))
               .andExpect(jsonPath("$.[0].owner.name").value("Adam"))
               .andExpect(jsonPath("$.[0].treeType.name").value("wood"));
    }

    @Test
    @Rollback(false)
    public void testGetTreeByCertificateIdWithHashInFront() throws Exception {
        certNumberForOneTree = "#" + certNumberForOneTree;

        mockMvc.perform(get(Uris.CERTIFICATE_SEARCH + "{certificateNumber}", certNumberForOneTree).accept("application/json"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.[0].id").value(1))
               .andExpect(jsonPath("$.[0].amount").value(1))
               .andExpect(jsonPath("$.[0].submittedOn").value(timeOfPlanting))
               .andExpect(jsonPath("$.[0].plantedOn").value(timeOfPlanting))
               .andExpect(jsonPath("$.[0].owner.name").value("Adam"))
               .andExpect(jsonPath("$.[0].treeType.name").value("wood"));
    }

    @Test
    @Rollback(false)
    public void testGetTreesByCertificateId() throws Exception {
        mockMvc.perform(get(Uris.CERTIFICATE_SEARCH + "{certificateNumber}", certNumberForThreeTrees).accept("application/json"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.[0].amount").value(1))
               .andExpect(jsonPath("$.[0].submittedOn").value(timeOfPlanting))
               .andExpect(jsonPath("$.[0].plantedOn").value(timeOfPlanting))
               .andExpect(jsonPath("$.[0].owner.name").value("Adam"))
               .andExpect(jsonPath("$.[0].treeType.name").value("wood"))
               .andExpect(jsonPath("$.[1].amount").value(2))
               .andExpect(jsonPath("$.[1].submittedOn").value(timeOfPlanting))
               .andExpect(jsonPath("$.[1].plantedOn").value(timeOfPlanting))
               .andExpect(jsonPath("$.[1].owner.name").value("Adam"))
               .andExpect(jsonPath("$.[1].treeType.name").value("doow"))
               .andExpect(jsonPath("$.[2].amount").value(3))
               .andExpect(jsonPath("$.[2].submittedOn").value(timeOfPlanting))
               .andExpect(jsonPath("$.[2].plantedOn").value(timeOfPlanting))
               .andExpect(jsonPath("$.[2].owner.name").value("Adam"))
               .andExpect(jsonPath("$.[2].treeType.name").value("wodo"));
    }

    @Test
    @Rollback(false)
    public void testGetTreesByCertificateIdWithMultipleCarts() throws Exception {
        mockMvc.perform(get(Uris.CERTIFICATE_SEARCH + "{certificateNumber}", certNumberForTwoCarts).accept("application/json"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.[0].id").value(1))
               .andExpect(jsonPath("$.[0].amount").value(1))
               .andExpect(jsonPath("$.[0].submittedOn").value(timeOfPlanting))
               .andExpect(jsonPath("$.[0].plantedOn").value(timeOfPlanting))
               .andExpect(jsonPath("$.[0].owner.name").value("Adam"))
               .andExpect(jsonPath("$.[0].treeType.name").value("wood"))
               .andExpect(jsonPath("$.[1].id").value(2))
               .andExpect(jsonPath("$.[1].amount").value(1))
               .andExpect(jsonPath("$.[1].submittedOn").value(timeOfPlanting))
               .andExpect(jsonPath("$.[1].plantedOn").value(timeOfPlanting))
               .andExpect(jsonPath("$.[1].owner.name").value("Adam"))
               .andExpect(jsonPath("$.[1].treeType.name").value("wood"))
               .andExpect(jsonPath("$.[2].id").value(3))
               .andExpect(jsonPath("$.[2].amount").value(2))
               .andExpect(jsonPath("$.[2].submittedOn").value(timeOfPlanting))
               .andExpect(jsonPath("$.[2].plantedOn").value(timeOfPlanting))
               .andExpect(jsonPath("$.[2].owner.name").value("Adam"))
               .andExpect(jsonPath("$.[2].treeType.name").value("doow"))
               .andExpect(jsonPath("$.[3].id").value(4))
               .andExpect(jsonPath("$.[3].amount").value(3))
               .andExpect(jsonPath("$.[3].submittedOn").value(timeOfPlanting))
               .andExpect(jsonPath("$.[3].plantedOn").value(timeOfPlanting))
               .andExpect(jsonPath("$.[3].owner.name").value("Adam"))
               .andExpect(jsonPath("$.[3].treeType.name").value("wodo"));
    }

    @Test
    @Rollback(false)
    public void testGetTreeByCertificateIdBadRequestCauseOfWrongNumber() throws Exception {
        String wrongCertNumber = "wrong cert number";

        mockMvc.perform(get(Uris.CERTIFICATE_SEARCH + "{certificateNumber}", wrongCertNumber).accept("application/json"))
               .andExpect(status().isBadRequest());
    }

    @Test
    @Rollback(false)
    public void testCreateCertificatePdf() throws Exception {
        String certNumber = _certificateRepository.findOne(1L)
                                                  .getNumber();

        mockMvc.perform(get(Uris.CERTIFICATE_PDF + certNumber).contentType(TestUtil.APPLICATION_JSON_UTF8)
                                                              .accept("application/pdf"))
               .andExpect(status().isOk());

    }
}
