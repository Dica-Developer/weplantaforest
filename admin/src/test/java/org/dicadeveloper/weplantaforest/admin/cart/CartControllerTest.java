package org.dicadeveloper.weplantaforest.admin.cart;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.dicadeveloper.weplantaforest.admin.WeplantaforestAdminApplication;
import org.dicadeveloper.weplantaforest.admin.support.Uris;
import org.dicadeveloper.weplantaforest.admin.testSupport.DbInjecter;
import org.dicadeveloper.weplantaforest.admin.tree.TreeRepository;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.common.testSupport.TestUtil;
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
@SpringApplicationConfiguration(classes = WeplantaforestAdminApplication.class)
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class CartControllerTest {

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private DbInjecter _dbInjecter;
    
    @Autowired
    private CartRepository _cartRepository;
    
    @Autowired
    private TreeRepository _treeRepository;

    @Before
    public void setup() {
        mockMvc = webAppContextSetup(this.webApplicationContext).build();
    }

    @Test
    @Transactional
    public void testGetAllCarts() throws Exception {
        long timeOfPlanting = System.currentTimeMillis();

        _dbInjecter.injectUser("Adam");
        _dbInjecter.injectTreeType("wood", "wood desc", 0.5);

        _dbInjecter.injectProject("project", "Adam", "project desc", true, 1.0f, 1.0f);
        _dbInjecter.injectProjectArticle("wood", "project", 1.0);

        _dbInjecter.injectTreeToProject("wood", "Adam", 1, timeOfPlanting, "project");

        List<Long> treeIdList = new ArrayList<>();
        treeIdList.add(1L);

        _dbInjecter.injectCart("Adam", treeIdList);

        mockMvc.perform(get(Uris.CARTS).accept("application/json"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.[0].buyer.name").value("Adam"));
    }

    @Test
    @Transactional
    public void testChangeCartStateToVerfied() throws Exception {
        long timeOfPlanting = System.currentTimeMillis();

        _dbInjecter.injectUser("Adam");
        _dbInjecter.injectTreeType("wood", "wood desc", 0.5);

        _dbInjecter.injectProject("project", "Adam", "project desc", true, 1.0f, 1.0f);
        _dbInjecter.injectProjectArticle("wood", "project", 1.0);

        _dbInjecter.injectTreeToProject("wood", "Adam", 1, timeOfPlanting, "project");

        List<Long> treeIdList = new ArrayList<>();
        treeIdList.add(1L);

        _dbInjecter.injectCart("Adam", treeIdList);
        
        Cart cartBeforeChangedState = _cartRepository.findOne(1L);
        
        assertThat(cartBeforeChangedState.getCartState()).isNull();

        mockMvc.perform(post(Uris.CHANGE_CART_STATE).contentType(TestUtil.APPLICATION_JSON_UTF8)
                                                    .param("cartId", "1")
                                                    .param("cartState", "VERIFIED"))
               .andExpect(status().isOk());
        
        Cart cartAfterChangedState = _cartRepository.findOne(1L);
        
        assertThat(_cartRepository.count()).isEqualTo(1);
        assertThat(cartAfterChangedState.getCartState()).isEqualTo(CartState.VERIFIED);

    }
    
    @Test
    @Transactional
    public void testChangeCartStateToDiscarded() throws Exception {
        long timeOfPlanting = System.currentTimeMillis();

        _dbInjecter.injectUser("Adam");
        _dbInjecter.injectTreeType("wood", "wood desc", 0.5);

        _dbInjecter.injectProject("project", "Adam", "project desc", true, 1.0f, 1.0f);
        _dbInjecter.injectProjectArticle("wood", "project", 1.0);

        _dbInjecter.injectTreeToProject("wood", "Adam", 1, timeOfPlanting, "project");

        List<Long> treeIdList = new ArrayList<>();
        treeIdList.add(1L);

        _dbInjecter.injectCart("Adam", treeIdList);
        
        Cart cartBeforeChangedState = _cartRepository.findOne(1L);
        
        assertThat(cartBeforeChangedState.getCartState()).isNull();
        
        assertThat(_treeRepository.count()).isEqualTo(1);

        mockMvc.perform(post(Uris.CHANGE_CART_STATE).contentType(TestUtil.APPLICATION_JSON_UTF8)
                                                    .param("cartId", "1")
                                                    .param("cartState", "DISCARDED"))
               .andExpect(status().isOk());
        
        Cart cartAfterChangedState = _cartRepository.findOne(1L);
        
        assertThat(_cartRepository.count()).isEqualTo(1);
        assertThat(cartAfterChangedState.getCartState()).isEqualTo(CartState.DISCARDED);
        assertThat(_treeRepository.count()).isEqualTo(0);
    }
    
    @Test
    public void testChangeCartStateBadRequestCauseOfNonExistingCartId() throws Exception {
     mockMvc.perform(post(Uris.CHANGE_CART_STATE).contentType(TestUtil.APPLICATION_JSON_UTF8)
                                                    .param("cartId", "1")
                                                    .param("cartState", "VERIFIED"))
               .andExpect(status().isBadRequest());
    }

}
