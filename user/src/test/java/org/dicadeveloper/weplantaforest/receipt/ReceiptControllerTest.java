package org.dicadeveloper.weplantaforest.receipt;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.cart.CartRepository;
import org.dicadeveloper.weplantaforest.common.testsupport.CleanDbRule;
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
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@SpringBootTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class ReceiptControllerTest {

    private MockMvc mockMvc;

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private DbInjecter _dbInjecter;

    @Autowired
    private CartRepository _cartRepository;

    @Autowired
    private TokenAuthenticationService _tokenAuthenticationService;

    @Autowired
    private UserRepository _userRepository;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Before
    public void setup() {
        mockMvc = webAppContextSetup(this.webApplicationContext).build();
    }

    @Test
    public void testGetReceiptsForUserId() throws Exception {
        long createAndSentDate = System.currentTimeMillis();

        _dbInjecter.injectUser("Adam");
        _dbInjecter.injectReceipt("Adam", createAndSentDate, createAndSentDate, "12345");

        String userToken = _tokenAuthenticationService.getTokenFromUser(_userRepository.findById(1L).orElse(null));

        mockMvc.perform(get((Uris.RECEIPTS)).accept("application/json").header("X-AUTH-TOKEN", userToken)).andExpect(status().isOk()).andExpect(jsonPath("$.[0].receiptId").value(1))
                .andExpect(jsonPath("$.[0].invoiceNumber").value("12345")).andExpect(jsonPath("$.[0].createdOn").exists());
    }

    @Test
    @Transactional
    public void testGetReceiptPdfForReceiptId() throws Exception {
        long createAndSentDate = System.currentTimeMillis();

        _dbInjecter.injectUser("Adam");

        _dbInjecter.injectTreeType("wood", "wood desc", 0.5);
        _dbInjecter.injectProject("project", "Adam", "desc", true, 1.0f, 1.0f);
        _dbInjecter.injectProjectArticle("wood", "project", 10, 2.0, 1.0);
        Tree tree = _dbInjecter.injectTreeToProject("wood", "Adam", 1, createAndSentDate, "project");

        Cart cart = _dbInjecter.injectCartWithTrees("Adam", tree);

        cart.setCallBackFirma("0815 Company");
        cart.setCallBackVorname("Hans");
        cart.setCallBackNachname("Wurst");
        cart.setCallBackPlz("123456");
        cart.setCallBackOrt("Musterstadt");
        cart.setTimeStamp(System.currentTimeMillis());

        _cartRepository.save(cart);

        List<Cart> carts = new ArrayList<>();
        carts.add(cart);

        _dbInjecter.injectReceipt("Adam", createAndSentDate, createAndSentDate, "12345", carts);

        mockMvc.perform(get((Uris.RECEIPT_PDF)).accept("application/pdf").param("receiptId", "1")).andExpect(status().isOk());
    }

}
