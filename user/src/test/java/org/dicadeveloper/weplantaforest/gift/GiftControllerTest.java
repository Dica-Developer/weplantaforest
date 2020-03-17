package org.dicadeveloper.weplantaforest.gift;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import javax.transaction.Transactional;

import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.cart.CartRepository;
import org.dicadeveloper.weplantaforest.cart.CartState;
import org.dicadeveloper.weplantaforest.code.Code;
import org.dicadeveloper.weplantaforest.code.CodeRepository;
import org.dicadeveloper.weplantaforest.common.testsupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.common.testsupport.TestUtil;
import org.dicadeveloper.weplantaforest.gift.Gift.Status;
import org.dicadeveloper.weplantaforest.projects.ProjectArticleRepository;
import org.dicadeveloper.weplantaforest.security.TokenAuthenticationService;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.dicadeveloper.weplantaforest.trees.Tree;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.dicadeveloper.weplantaforest.treetypes.TreeTypeRepository;
import org.dicadeveloper.weplantaforest.user.UserRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Ignore;
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
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@SpringBootTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_CLASS)
@Transactional
public class GiftControllerTest {
    private static MockMvc mockMvc;

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private DbInjecter _dbInjecter;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private CartRepository _cartRepository;

    @Autowired
    private CodeRepository _codeRepository;

    @Autowired
    private GiftRepository _giftRepository;

    @Autowired
    private TreeRepository _treeRepository;

    @Autowired
    private UserRepository _userRepository;

    @Autowired
    private TreeTypeRepository _treeTypeRepository;

    @Autowired
    private ProjectArticleRepository _projectArticleRepository;

    @Autowired
    private TokenAuthenticationService _tokenAuthenticationService;

    static boolean entitiesInjected = false;

    static String codeString1;
    static String codeString2;
    static String codeString3;

    @Before
    public void setup() {
        if (!entitiesInjected) {
            mockMvc = webAppContextSetup(this.webApplicationContext).build();

            _dbInjecter.injectUser("Consignore");
            _dbInjecter.injectUser("Recipient");
            _dbInjecter.injectUser("otherUser");
            _dbInjecter.injectUser("Adam");

            codeString1 = _dbInjecter.injectGiftWithCode("Consignore", Status.NEW).getCode();
            codeString2 = _dbInjecter.injectGiftWithCode("Consignore", Status.UNREDEEMED).getCode();
            codeString3 = _dbInjecter.injectGiftWithCode("Consignore", "Recipient", Status.REDEEMED);
            _dbInjecter.injectGiftWithCode("otherUser", Status.UNREDEEMED);

            _dbInjecter.injectTreeType("wood", "desc", 0.5);
            _dbInjecter.injectProject("Project A", "Adam", "adam's project", true, 0, 0);
            _dbInjecter.injectProjectArticle("wood", "Project A", 10, 3.0, 1.0);
            Tree tree = _dbInjecter.injectTreeToProject("wood", "Adam", 5, 10000, "Project A");
            Cart cart = _dbInjecter.injectCartWithTrees("Adam", tree);
            Code code = _codeRepository.findByCode(codeString1);
            cart.setCartState(CartState.GENERATED);
            cart.setCode(code);
            cart = _cartRepository.save(cart);
            code.setCart(cart);
            _codeRepository.save(code);
            entitiesInjected = true;
        }
    }

    @After
    public void clear() {
        // _cartRepository.deleteAll();
        // _treeRepository.deleteAll();
    }

    // Test will be ignored: The DbInjecter has to be extended by creating also
    // carts to the injected codes

    @Test
    @Rollback(false)
    @Ignore
    public void testFindGiftsByConsignor() throws Exception {
        mockMvc.perform(get(Uris.GIFTS_BY_CONSIGNOR).param("userName", "Consignore").accept("application/json")).andExpect(status().isOk())
                .andExpect(jsonPath("$.[0].consignor.name").value("Consignore")).andExpect(jsonPath("$.[0].recipient").isEmpty()).andExpect(jsonPath("$.[0].code.code").value(codeString2))
                .andExpect(jsonPath("$.[0].status").value("UNREDEEMED")).andExpect(jsonPath("$.[1].consignor.name").value("Consignore")).andExpect(jsonPath("$.[1].recipient.name").value("Recipient"))
                .andExpect(jsonPath("$.[1].code.code").value(codeString3)).andExpect(jsonPath("$.[1].status").value("REDEEMED"));
    }

    @Test
    @Rollback(false)
    @Ignore
    public void testFindGiftsByRecipient() throws Exception {
        mockMvc.perform(get((Uris.GIFTS_BY_RECIPIENT)).param("userName", "Recipient").accept("application/json")).andExpect(status().isOk())
                .andExpect(jsonPath("$.[0].consignor.name").value("Consignore")).andExpect(jsonPath("$.[0].recipient.name").value("Recipient"))
                .andExpect(jsonPath("$.[0].code.code").value(codeString3)).andExpect(jsonPath("$.[0].status").value("REDEEMED"));
    }

    // @Test
    // @Rollback(false)
    // public void testCreateGiftBadRequestCauseOfNoTreesRemaining() throws
    // Exception {
    // String userToken =
    // _tokenAuthenticationService.getTokenFromUser(_userRepository.findOne(1L));
    //
    // PlantBag plantPageData = PlantPageDataCreater.initializePlantPageData();
    // plantPageData =
    // PlantPageDataCreater.initializeProjectDataAndAddToPlantPageData(plantPageData,
    // "Project A");
    // plantPageData =
    // PlantPageDataCreater.createPlantItemAndAddToPlantPageData(3, 300, "wood",
    // "Project A", plantPageData);
    //
    // _dbInjecter.injectTreeToProject("wood", "Adam", 10,
    // System.currentTimeMillis(), "Project A");
    //
    // mockMvc.perform(post(Uris.GIFT_CREATE).contentType(TestUtil.APPLICATION_JSON_UTF8)
    // .header("X-AUTH-TOKEN", userToken)
    // .content(TestUtil.convertObjectToJsonBytes(plantPageData)))
    // .andExpect(status().isBadRequest());
    // }

    @Test
    @Rollback(false)
    public void testCreateGiftPdf() throws Exception {
        mockMvc.perform(get(Uris.GIFT_PDF).contentType(TestUtil.APPLICATION_JSON_UTF8).param("giftId", "1").accept("application/pdf")).andExpect(status().isOk());
    }

}
