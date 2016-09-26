package org.dicadeveloper.weplantaforest.gift;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import java.util.List;

import javax.transaction.Transactional;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.cart.CartItem;
import org.dicadeveloper.weplantaforest.cart.CartRepository;
import org.dicadeveloper.weplantaforest.code.Code;
import org.dicadeveloper.weplantaforest.code.CodeGenerator;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.common.testSupport.TestUtil;
import org.dicadeveloper.weplantaforest.gift.Gift.Status;
import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBag;
import org.dicadeveloper.weplantaforest.projects.ProjectArticleRepository;
import org.dicadeveloper.weplantaforest.security.TokenAuthenticationService;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.dicadeveloper.weplantaforest.testsupport.PlantPageDataCreater;
import org.dicadeveloper.weplantaforest.trees.Tree;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.dicadeveloper.weplantaforest.treetypes.TreeTypeRepository;
import org.dicadeveloper.weplantaforest.user.User;
import org.dicadeveloper.weplantaforest.user.UserRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
    private GiftRepository _giftRepository;

    @Autowired
    private TreeRepository _treeRepository;

    @Autowired
    private CodeGenerator _codeGenerator;

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

            codeString1 = _dbInjecter.injectGiftWithCode("Consignore", Status.NEW)
                                     .getCode();
            codeString2 = _dbInjecter.injectGiftWithCode("Consignore", Status.UNREDEEMED)
                                     .getCode();
            codeString3 = _dbInjecter.injectGiftWithCode("Consignore", "Recipient", Status.REDEEMED);
            _dbInjecter.injectGiftWithCode("otherUser", Status.UNREDEEMED);

            _dbInjecter.injectTreeType("wood", "desc", 0.5);
            _dbInjecter.injectProject("Project A", "Adam", "adam's project", true, 0, 0);
            _dbInjecter.injectProjectArticle("wood", "Project A", 10, 3.0, 1.0);

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
    public void testFindGiftsByConsignor() throws Exception {
        mockMvc.perform(get(Uris.GIFTS_BY_CONSIGNOR).param("userName", "Consignore").accept("application/json"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.[0].consignor.name").value("Consignore"))
               .andExpect(jsonPath("$.[0].recipient").isEmpty())
               .andExpect(jsonPath("$.[0].code.code").value(codeString1))
               .andExpect(jsonPath("$.[0].status").value("NEW"))
               .andExpect(jsonPath("$.[1].consignor.name").value("Consignore"))
               .andExpect(jsonPath("$.[1].recipient").isEmpty())
               .andExpect(jsonPath("$.[1].code.code").value(codeString2))
               .andExpect(jsonPath("$.[1].status").value("UNREDEEMED"))
               .andExpect(jsonPath("$.[2].consignor.name").value("Consignore"))
               .andExpect(jsonPath("$.[2].recipient.name").value("Recipient"))
               .andExpect(jsonPath("$.[2].code.code").value(codeString3))
               .andExpect(jsonPath("$.[2].status").value("REDEEMED"));
    }

    @Test
    @Rollback(false)
    public void testFindGiftsByRecipient() throws Exception {
        mockMvc.perform(get((Uris.GIFTS_BY_RECIPIENT)).param("userName", "Recipient").accept("application/json"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.[0].consignor.name").value("Consignore"))
               .andExpect(jsonPath("$.[0].recipient.name").value("Recipient"))
               .andExpect(jsonPath("$.[0].code.code").value(codeString3))
               .andExpect(jsonPath("$.[0].status").value("REDEEMED"));
    }

    @Test
    @Rollback(false)
    public void testCreateGift() throws Exception {
        String userToken = _tokenAuthenticationService.getTokenFromUser(_userRepository.findByName("Adam"));

        PlantBag plantPageData = PlantPageDataCreater.initializePlantPageData();
        plantPageData = PlantPageDataCreater.initializeProjectDataAndAddToPlantPageData(plantPageData, "Project A");
        plantPageData = PlantPageDataCreater.createPlantItemAndAddToPlantPageData(3, 300, "wood", "Project A", plantPageData);

        mockMvc.perform(post(Uris.GIFT_CREATE).contentType(TestUtil.APPLICATION_JSON_UTF8)
                                              .header("X-AUTH-TOKEN", userToken)
                                              .content(TestUtil.convertObjectToJsonBytes(plantPageData)))
               .andExpect(status().isOk());

        List<Cart> createdCarts = _cartRepository.findCartsByUserId(4);
        Page<Tree> createdTrees = _treeRepository.findTreesByUserId(4L, new PageRequest(0, 1));
        List<Gift> createdGifts = _giftRepository.findGiftsByConsignor("Adam");

        assertThat(createdCarts.get(0)
                               .getBuyer()
                               .getName()).isEqualTo("Adam");
        assertThat(createdCarts.get(0)
                               .getTotalPrice()
                               .doubleValue()).isEqualTo(9.0);
        assertThat(createdCarts.get(0)
                               .isGift()).isEqualTo(true);

        assertThat(createdTrees.getContent()
                               .get(0)
                               .getAmount()).isEqualTo(3);
        assertThat(createdTrees.getContent()
                               .get(0)
                               .getOwner()
                               .getName()).isEqualTo("Adam");
        assertThat(createdTrees.getContent()
                               .get(0)
                               .getProjectArticle()
                               .getArticleId()).isEqualTo(1L);

        String codeFromCart = createdCarts.get(0)
                                          .getCode()
                                          .getCode();
        String codeFromGift = createdCarts.get(0)
                                          .getCode()
                                          .getCode();

        assertThat(codeFromCart).isEqualTo(codeFromGift);

        assertThat(_codeGenerator.isValid(codeFromGift)).isTrue();

        assertThat(createdGifts.get(0)
                               .getStatus()).isEqualTo(Status.NEW);
        assertThat(createdGifts.get(0)
                               .getRecipient()).isNull();
    }

    @Test
    @Rollback(false)
    public void testCreateGiftBadRequestCauseOfNoTreesRemaining() throws Exception {
        String userToken = _tokenAuthenticationService.getTokenFromUser(_userRepository.findOne(1L));

        PlantBag plantPageData = PlantPageDataCreater.initializePlantPageData();
        plantPageData = PlantPageDataCreater.initializeProjectDataAndAddToPlantPageData(plantPageData, "Project A");
        plantPageData = PlantPageDataCreater.createPlantItemAndAddToPlantPageData(3, 300, "wood", "Project A", plantPageData);

        _dbInjecter.injectTreeToProject("wood", "Adam", 10, System.currentTimeMillis(), "Project A");

        mockMvc.perform(post(Uris.GIFT_CREATE).contentType(TestUtil.APPLICATION_JSON_UTF8)
                                              .header("X-AUTH-TOKEN", userToken)
                                              .content(TestUtil.convertObjectToJsonBytes(plantPageData)))
               .andExpect(status().isBadRequest());
    }

    @Test
    @Rollback(false)
    public void testCreateGiftPdf() throws Exception {
        mockMvc.perform(get(Uris.GIFT_PDF).contentType(TestUtil.APPLICATION_JSON_UTF8)
                                          .param("giftId", "1")
                                          .accept("application/pdf"))
               .andExpect(status().isOk());
    }

    @Test
    @Rollback(false)
    public void testRedeemGiftCode() throws Exception {
        Code code = _dbInjecter.injectGiftWithCode("Consignore", Status.UNREDEEMED);

        User buyer = _userRepository.findByName("Adam");

        Cart cart = new Cart();
        cart.setBuyer(buyer);
        cart.setCode(code);

        Tree tree = new Tree();
        tree.setOwner(buyer);
        tree.setAmount(1);
        tree.setTreeType(_treeTypeRepository.findByName("wood"));
        tree.setProjectArticle(_projectArticleRepository.findOne(1L));

        CartItem cartItem = new CartItem();
        cartItem.setTree(tree);

        cart.addCartItem(cartItem);

        _cartRepository.save(cart);

        mockMvc.perform(get(Uris.GIFT_REDEEM).contentType(TestUtil.APPLICATION_JSON_UTF8)
                                             .param("giftCode", code.getCode())
                                             .param("userId", "3")
                                             .accept("application/json"))
               .andExpect(status().isOk());

        Page<Tree> savedTreeAfterRedeem = _treeRepository.findTreesByUserId(3L, new PageRequest(0, 5));
        assertThat(savedTreeAfterRedeem.getContent()
                                       .get(0)
                                       .getOwner()
                                       .getName()).isEqualTo("otherUser");

        List<Gift> savedGiftAfterRedeem = _giftRepository.findGiftsByRecipient("otherUser");
        assertThat(savedGiftAfterRedeem.get(0)
                                       .getStatus()).isEqualTo(Status.REDEEMED);

    }

    @Test
    @Rollback(false)
    public void testRedeemGiftCodeBadRequestCauseOfNonValidCode() throws Exception {
        Code code = _dbInjecter.injectGiftWithCode("Consignore", Status.UNREDEEMED);

        User buyer = _userRepository.findByName("Adam");

        Cart cart = new Cart();
        cart.setBuyer(buyer);
        cart.setCode(code);

        Tree tree = new Tree();
        tree.setOwner(buyer);
        tree.setAmount(1);
        tree.setTreeType(_treeTypeRepository.findByName("wood"));
        tree.setProjectArticle(_projectArticleRepository.findOne(1L));

        CartItem cartItem = new CartItem();
        cartItem.setTree(tree);

        cart.addCartItem(cartItem);

        _cartRepository.save(cart);

        mockMvc.perform(get(Uris.GIFT_REDEEM).contentType(TestUtil.APPLICATION_JSON_UTF8)
                                             .param("giftCode", "NON VALID CODE")
                                             .param("userId", "2")
                                             .accept("application/json"))
               .andExpect(status().isBadRequest());
    }

    @Test
    @Rollback(false)
    public void testRedeemGiftCodeBadRequestCauseOfAlreadyRedeemed() throws Exception {
        Code code = _dbInjecter.injectGiftWithCode("Consignore", Status.UNREDEEMED);

        User buyer = _userRepository.findByName("Adam");

        Cart cart = new Cart();
        cart.setBuyer(buyer);
        cart.setCode(code);

        Tree tree = new Tree();
        tree.setOwner(buyer);
        tree.setAmount(1);
        tree.setTreeType(_treeTypeRepository.findByName("wood"));
        tree.setProjectArticle(_projectArticleRepository.findOne(1L));

        CartItem cartItem = new CartItem();
        cartItem.setTree(tree);

        cart.addCartItem(cartItem);

        _cartRepository.save(cart);

        mockMvc.perform(get(Uris.GIFT_REDEEM).contentType(TestUtil.APPLICATION_JSON_UTF8)
                                             .param("giftCode", code.getCode())
                                             .param("userId", "2")
                                             .accept("application/json"))
               .andExpect(status().isOk());
        mockMvc.perform(get(Uris.GIFT_REDEEM).contentType(TestUtil.APPLICATION_JSON_UTF8)
                                             .param("giftCode", code.getCode())
                                             .param("userId", "2")
                                             .accept("application/json"))
               .andExpect(status().isBadRequest());
    }

}
