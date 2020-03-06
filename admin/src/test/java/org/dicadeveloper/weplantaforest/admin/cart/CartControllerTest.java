package org.dicadeveloper.weplantaforest.admin.cart;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.dicadeveloper.weplantaforest.admin.project.Project;
import org.dicadeveloper.weplantaforest.admin.security.TokenAuthenticationService;
import org.dicadeveloper.weplantaforest.admin.support.Uris;
import org.dicadeveloper.weplantaforest.admin.testSupport.DbInjecter;
import org.dicadeveloper.weplantaforest.admin.tree.TreeRepository;
import org.dicadeveloper.weplantaforest.admin.treeType.TreeType;
import org.dicadeveloper.weplantaforest.admin.user.User;
import org.dicadeveloper.weplantaforest.admin.user.UserRepository;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.common.testSupport.TestUtil;
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

    @Autowired
    private TokenAuthenticationService _tokenAuthenticationService;

    @Autowired
    private UserRepository _userRepository;

    @Before
    public void setup() {
        mockMvc = webAppContextSetup(this.webApplicationContext).build();
    }

    @Test
    @Transactional
    public void testGetAllCarts() throws Exception {
        long timeOfPlanting = System.currentTimeMillis();

        User adam = _dbInjecter.injectUser("Adam");
        TreeType treeType = _dbInjecter.injectTreeType("wood", "wood desc", 0.5);

        Project project = _dbInjecter.injectProject("project", adam, "project desc", true, 1.0f, 1.0f);
        _dbInjecter.injectProjectArticle(treeType, project, 1.0);

        _dbInjecter.injectTreeToProject(treeType, adam, 1, timeOfPlanting, project);
        String userToken = _tokenAuthenticationService.getTokenFromUser(_userRepository.findById(1L).orElse(null));

        List<Long> treeIdList = new ArrayList<>();
        treeIdList.add(1L);

        _dbInjecter.injectCart("Adam", treeIdList);
        CartRequest cartRequest = new CartRequest();
        mockMvc.perform(
                post(Uris.CARTS).header("X-AUTH-TOKEN", userToken).content(TestUtil.convertObjectToJsonBytes(cartRequest)).contentType(TestUtil.APPLICATION_JSON_UTF8).accept("application/json"))
                .andExpect(status().isOk()).andExpect(jsonPath("$.[0].buyer.name").value("Adam"));
    }

    @Test
    @Transactional
    public void testChangeCartStateToVerfied() throws Exception {
        long timeOfPlanting = System.currentTimeMillis();

        User adam = _dbInjecter.injectUser("Adam");
        TreeType treeType = _dbInjecter.injectTreeType("wood", "wood desc", 0.5);

        Project project = _dbInjecter.injectProject("project", adam, "project desc", true, 1.0f, 1.0f);
        _dbInjecter.injectProjectArticle(treeType, project, 1.0);

        _dbInjecter.injectTreeToProject(treeType, adam, 1, timeOfPlanting, project);
        String userToken = _tokenAuthenticationService.getTokenFromUser(_userRepository.findById(1L).orElse(null));

        List<Long> treeIdList = new ArrayList<>();
        treeIdList.add(1L);

        _dbInjecter.injectCart("Adam", treeIdList);

        Cart cartBeforeChangedState = _cartRepository.findById(1L).orElse(null);

        assertThat(cartBeforeChangedState.getCartState()).isNull();

        mockMvc.perform(post(Uris.CHANGE_CART_STATE).header("X-AUTH-TOKEN", userToken).contentType(TestUtil.APPLICATION_JSON_UTF8).param("cartId", "1").param("cartState", "VERIFIED"))
                .andExpect(status().isOk());

        Cart cartAfterChangedState = _cartRepository.findById(1L).orElse(null);

        assertThat(_cartRepository.count()).isEqualTo(1);
        assertThat(cartAfterChangedState.getCartState()).isEqualTo(CartState.VERIFIED);

    }

    @Test
    @Transactional
    public void testChangeCartStateToDiscarded() throws Exception {
        long timeOfPlanting = System.currentTimeMillis();

        User adam = _dbInjecter.injectUser("Adam");
        TreeType treeType = _dbInjecter.injectTreeType("wood", "wood desc", 0.5);

        Project project = _dbInjecter.injectProject("project", adam, "project desc", true, 1.0f, 1.0f);
        _dbInjecter.injectProjectArticle(treeType, project, 1.0);

        _dbInjecter.injectTreeToProject(treeType, adam, 1, timeOfPlanting, project);

        List<Long> treeIdList = new ArrayList<>();
        treeIdList.add(1L);

        _dbInjecter.injectCart("Adam", treeIdList);

        Cart cartBeforeChangedState = _cartRepository.findById(1L).orElse(null);

        assertThat(cartBeforeChangedState.getCartState()).isNull();

        assertThat(_treeRepository.count()).isEqualTo(1);
        String userToken = _tokenAuthenticationService.getTokenFromUser(_userRepository.findById(1L).orElse(null));

        mockMvc.perform(post(Uris.CHANGE_CART_STATE).header("X-AUTH-TOKEN", userToken).contentType(TestUtil.APPLICATION_JSON_UTF8).param("cartId", "1").param("cartState", "DISCARDED"))
                .andExpect(status().isOk());

        Cart cartAfterChangedState = _cartRepository.findById(1L).orElse(null);

        assertThat(_cartRepository.count()).isEqualTo(1);
        assertThat(cartAfterChangedState.getCartState()).isEqualTo(CartState.DISCARDED);
        assertThat(_treeRepository.count()).isEqualTo(0);
    }

    @Test
    public void testChangeCartStateBadRequestCauseOfNonExistingCartId() throws Exception {
        _dbInjecter.injectUser("Adam");
        String userToken = _tokenAuthenticationService.getTokenFromUser(_userRepository.findById(1L).orElse(null));

        mockMvc.perform(post(Uris.CHANGE_CART_STATE).header("X-AUTH-TOKEN", userToken).contentType(TestUtil.APPLICATION_JSON_UTF8).param("cartId", "1").param("cartState", "VERIFIED"))
                .andExpect(status().isBadRequest());
    }

}
