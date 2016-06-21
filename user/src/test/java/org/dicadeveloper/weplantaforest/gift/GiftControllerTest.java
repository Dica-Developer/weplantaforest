package org.dicadeveloper.weplantaforest.gift;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

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
import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.dicadeveloper.weplantaforest.testsupport.PlantPageDataCreater;
import org.dicadeveloper.weplantaforest.trees.Tree;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.dicadeveloper.weplantaforest.treetypes.TreeTypeRepository;
import org.dicadeveloper.weplantaforest.user.User;
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
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@SpringApplicationConfiguration(classes = WeplantaforestApplication.class)
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class GiftControllerTest {
    private MockMvc mockMvc;

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

    @Before
    public void setup() {
        this.mockMvc = webAppContextSetup(this.webApplicationContext).build();
    }

    @Test
    public void testFindGiftsByConsignor() throws Exception {
        _dbInjecter.injectUser("Consignore");
        _dbInjecter.injectUser("otherUser");

        Code code1 = _dbInjecter.injectGiftWithCode("Consignore", Status.NEW);
        String code2 = _dbInjecter.injectGiftWithCode("Consignore", "otherUser", Status.REDEEMED);
        Code code3 = _dbInjecter.injectGiftWithCode("Consignore", Status.UNREDEEMED);

        _dbInjecter.injectGiftWithCode("otherUser", Status.UNREDEEMED);

        this.mockMvc.perform(get((Uris.GIFTS_BY_CONSIGNOR + "{id}"), 1).accept("application/json"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.[0].consignor.name").value("Consignore"))
                    .andExpect(jsonPath("$.[0].recipient").isEmpty())
                    .andExpect(jsonPath("$.[0].code.code").value(code1.getCode()))
                    .andExpect(jsonPath("$.[0].status").value("NEW"))
                    .andExpect(jsonPath("$.[1].consignor.name").value("Consignore"))
                    .andExpect(jsonPath("$.[1].recipient.name").value("otherUser"))
                    .andExpect(jsonPath("$.[1].code.code").value(code2))
                    .andExpect(jsonPath("$.[1].status").value("REDEEMED"))
                    .andExpect(jsonPath("$.[2].consignor.name").value("Consignore"))
                    .andExpect(jsonPath("$.[2].recipient").isEmpty())
                    .andExpect(jsonPath("$.[2].code.code").value(code3.getCode()))
                    .andExpect(jsonPath("$.[2].status").value("UNREDEEMED"));
    }

    @Test
    public void testFindGiftsByRecipient() throws Exception {
        _dbInjecter.injectUser("Consignore");
        _dbInjecter.injectUser("otherUser");

        String code1 = _dbInjecter.injectGiftWithCode("Consignore", "otherUser", Status.REDEEMED);

        _dbInjecter.injectGiftWithCode("Consignore", Status.NEW);
        _dbInjecter.injectGiftWithCode("Consignore", Status.UNREDEEMED);
        _dbInjecter.injectGiftWithCode("otherUser", Status.UNREDEEMED);

        this.mockMvc.perform(get((Uris.GIFTS_BY_RECIPIENT + "{id}"), 2).accept("application/json"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.[0].consignor.name").value("Consignore"))
                    .andExpect(jsonPath("$.[0].recipient.name").value("otherUser"))
                    .andExpect(jsonPath("$.[0].code.code").value(code1))
                    .andExpect(jsonPath("$.[0].status").value("REDEEMED"));
    }

    @Test
    @Transactional
    public void testCreateGift() throws Exception {
        _dbInjecter.injectTreeType("wood", "desc", 0.5);

        _dbInjecter.injectUser("Adam");

        _dbInjecter.injectProject("Project A", "Adam", "adam's project", true, 0, 0);

        _dbInjecter.injectProjectArticle("wood", "Project A", 10, 3.0, 1.0);

        PlantBag plantPageData = PlantPageDataCreater.initializePlantPageData();
        plantPageData = PlantPageDataCreater.initializeProjectDataAndAddToPlantPageData(plantPageData, "Project A");
        plantPageData = PlantPageDataCreater.createPlantItemAndAddToPlantPageData(3, 300, "wood", "Project A", plantPageData);
        plantPageData.setUserId(1);

        this.mockMvc.perform(post(Uris.GIFT_CREATE).contentType(TestUtil.APPLICATION_JSON_UTF8)
                                                   .content(TestUtil.convertObjectToJsonBytes(plantPageData)))
                    .andExpect(status().isOk());

        assertThat(_cartRepository.count()).isEqualTo(1);
        assertThat(_treeRepository.count()).isEqualTo(1);
        assertThat(_giftRepository.count()).isEqualTo(1);

        Cart createdCart = _cartRepository.findOne(1L);
        Tree createdTree = _treeRepository.findOne(1L);
        Gift createdGift = _giftRepository.findOne(1L);

        assertThat(createdCart.getBuyer()
                              .getName()).isEqualTo("Adam");
        assertThat(createdCart.getTotalPrice()
                              .doubleValue()).isEqualTo(9.0);
        assertThat(createdCart.isGift()).isEqualTo(true);

        assertThat(createdTree.getAmount()).isEqualTo(3);
        assertThat(createdTree.getOwner()
                              .getName()).isEqualTo("Adam");
        assertThat(createdTree.getProjectArticle()
                              .getArticleId()).isEqualTo(1L);

        String codeFromCart = createdCart.getCode()
                                         .getCode();
        String codeFromGift = createdCart.getCode()
                                         .getCode();

        assertThat(codeFromCart).isEqualTo(codeFromGift);

        assertThat(_codeGenerator.isValid(codeFromGift)).isTrue();

        assertThat(createdGift.getStatus()).isEqualTo(Status.NEW);
        assertThat(createdGift.getRecipient()).isNull();
    }

    @Test
    @Transactional
    public void testCreateGiftBadRequestCauseOfNoTreesRemaining() throws Exception {
        _dbInjecter.injectTreeType("wood", "desc", 0.5);

        _dbInjecter.injectUser("Adam");

        _dbInjecter.injectProject("Project A", "Adam", "adam's project", true, 0, 0);

        _dbInjecter.injectProjectArticle("wood", "Project A", 10, 3.0, 1.0);

        PlantBag plantPageData = PlantPageDataCreater.initializePlantPageData();
        plantPageData = PlantPageDataCreater.initializeProjectDataAndAddToPlantPageData(plantPageData, "Project A");
        plantPageData = PlantPageDataCreater.createPlantItemAndAddToPlantPageData(3, 300, "wood", "Project A", plantPageData);
        plantPageData.setUserId(1);

        _dbInjecter.injectTreeToProject("wood", "Adam", 10, System.currentTimeMillis(), "Project A");

        this.mockMvc.perform(post(Uris.GIFT_CREATE).contentType(TestUtil.APPLICATION_JSON_UTF8)
                                                   .content(TestUtil.convertObjectToJsonBytes(plantPageData)))
                    .andExpect(status().isBadRequest());
    }

    @Test
    public void testCreateGiftPdf() throws Exception {
        _dbInjecter.injectUser("Adam");
        _dbInjecter.injectGiftWithCode("Adam", Status.UNREDEEMED);

        this.mockMvc.perform(get(Uris.GIFT_PDF).contentType(TestUtil.APPLICATION_JSON_UTF8)
                                               .param("giftId", "1")
                                               .accept("application/pdf"))
                    .andExpect(status().isOk());
    }

    @Test
    @Transactional
    public void testRedeemGiftCode() throws Exception {
        _dbInjecter.injectUser("Consignor");
        _dbInjecter.injectUser("Receiver");
        _dbInjecter.injectTreeType("wood", "a wood", 0.5);

        User consignor = _userRepository.findByName("Consignor");

        Code code = _dbInjecter.injectGiftWithCode("Consignor", Status.UNREDEEMED);

        Cart cart = new Cart();
        cart.setBuyer(_userRepository.findByName("Adam"));
        cart.setCode(code);

        Tree tree = new Tree();
        tree.setOwner(consignor);
        tree.setAmount(1);
        tree.setTreeType(_treeTypeRepository.findByName("wood"));

        CartItem cartItem = new CartItem();
        cartItem.setTree(tree);

        cart.addCartItem(cartItem);

        _cartRepository.save(cart);

        Gift savedGiftBeforeRedeem = _giftRepository.findOne(1L);
        assertThat(savedGiftBeforeRedeem.getStatus()).isEqualTo(Status.UNREDEEMED);
        Tree savedTreeBeforeRedeem = _treeRepository.findOne(1L);
        assertThat(savedTreeBeforeRedeem.getOwner()
                                        .getName()).isEqualTo("Consignor");

        this.mockMvc.perform(get(Uris.GIFT_REDEEM).contentType(TestUtil.APPLICATION_JSON_UTF8)
                                                  .param("giftCode", code.getCode())
                                                  .param("userId", "2")
                                                  .accept("application/json"))
                    .andExpect(status().isOk());

        Tree savedTreeAfterRedeem = _treeRepository.findOne(1L);
        assertThat(savedTreeAfterRedeem.getOwner()
                                       .getName()).isEqualTo("Receiver");

        Gift savedGiftAfterRedeem = _giftRepository.findOne(1L);
        assertThat(savedGiftAfterRedeem.getStatus()).isEqualTo(Status.REDEEMED);

    }

    @Test
    @Transactional
    public void testRedeemGiftCodeBadRequestCauseOfNonValidCode() throws Exception {
        _dbInjecter.injectUser("Consignor");
        _dbInjecter.injectUser("Receiver");
        _dbInjecter.injectTreeType("wood", "a wood", 0.5);

        User consignor = _userRepository.findByName("Consignor");

        Code code = _dbInjecter.injectGiftWithCode("Consignor", Status.UNREDEEMED);

        Cart cart = new Cart();
        cart.setBuyer(_userRepository.findByName("Adam"));
        cart.setCode(code);

        Tree tree = new Tree();
        tree.setOwner(consignor);
        tree.setAmount(1);
        tree.setTreeType(_treeTypeRepository.findByName("wood"));

        CartItem cartItem = new CartItem();
        cartItem.setTree(tree);

        cart.addCartItem(cartItem);

        _cartRepository.save(cart);

        this.mockMvc.perform(get(Uris.GIFT_REDEEM).contentType(TestUtil.APPLICATION_JSON_UTF8)
                                                  .param("giftCode", "NON VALID CODE")
                                                  .param("userId", "2")
                                                  .accept("application/json"))
                    .andExpect(status().isBadRequest());
    }

    @Test
    @Transactional
    public void testRedeemGiftCodeBadRequestCauseOfAlreadyRedeemed() throws Exception {
        _dbInjecter.injectUser("Consignor");
        _dbInjecter.injectUser("Receiver");
        _dbInjecter.injectTreeType("wood", "a wood", 0.5);

        User consignor = _userRepository.findByName("Consignor");

        Code code = _dbInjecter.injectGiftWithCode("Consignor", Status.UNREDEEMED);

        Cart cart = new Cart();
        cart.setBuyer(_userRepository.findByName("Adam"));
        cart.setCode(code);

        Tree tree = new Tree();
        tree.setOwner(consignor);
        tree.setAmount(1);
        tree.setTreeType(_treeTypeRepository.findByName("wood"));

        CartItem cartItem = new CartItem();
        cartItem.setTree(tree);

        cart.addCartItem(cartItem);

        _cartRepository.save(cart);

        this.mockMvc.perform(get(Uris.GIFT_REDEEM).contentType(TestUtil.APPLICATION_JSON_UTF8)
                                                  .param("giftCode", code.getCode())
                                                  .param("userId", "2")
                                                  .accept("application/json"))
                    .andExpect(status().isOk());
        this.mockMvc.perform(get(Uris.GIFT_REDEEM).contentType(TestUtil.APPLICATION_JSON_UTF8)
                                                  .param("giftCode", code.getCode())
                                                  .param("userId", "2")
                                                  .accept("application/json"))
                    .andExpect(status().isBadRequest());
    }

}
