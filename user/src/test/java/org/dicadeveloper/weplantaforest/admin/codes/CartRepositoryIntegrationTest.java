package org.dicadeveloper.weplantaforest.admin.codes;

import static org.assertj.core.api.Assertions.assertThat;

import java.math.BigDecimal;
import java.util.List;

import javax.transaction.Transactional;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.cart.CartItem;
import org.dicadeveloper.weplantaforest.cart.CartRepository;
import org.dicadeveloper.weplantaforest.code.Code;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.dev.inject.DatabasePopulator;
import org.dicadeveloper.weplantaforest.gift.Gift.Status;
import org.dicadeveloper.weplantaforest.projects.ProjectArticleRepository;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.dicadeveloper.weplantaforest.trees.Tree;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.dicadeveloper.weplantaforest.treetypes.TreeTypeRepository;
import org.dicadeveloper.weplantaforest.user.UserRepository;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class CartRepositoryIntegrationTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    public DatabasePopulator _databasePopulator;

    @Autowired
    public DbInjecter _dbInjecter;

    @Autowired
    private CartRepository _cartRepository;

    @Autowired
    private UserRepository _userRepository;

    @Autowired
    private TreeRepository _treeRepository;

    @Autowired
    private TreeTypeRepository _treeTypeRepository;

    @Autowired
    private ProjectArticleRepository _projectArticleRepository;

    @Test
    @Transactional
    public void testSaveCartWithCartItem() {
        long timeOfPlanting = System.currentTimeMillis();

        _dbInjecter.injectUser("Adam");
        _dbInjecter.injectTreeType("wood", "wood desc", 0.5);
        _dbInjecter.injectProject("Project A", "Adam", "desc", true, 1.0f, 2.0f);
        _dbInjecter.injectProjectArticle("wood", "Project A", 100, 1.0, 0.5);

        Cart cart = new Cart();
        cart.setBuyer(_userRepository.findByName("Adam"));

        Tree tree = new Tree();
        tree.setAmount(2);
        tree.setPlantedOn(timeOfPlanting);
        tree.setProjectArticle(_projectArticleRepository.findOne(1L));
        tree.setTreeType(_treeTypeRepository.findOne(1L));

        CartItem cartItem = new CartItem();
        cartItem.setTree(tree);
        cart.addCartItem(cartItem);
        _cartRepository.save(cart);

        Cart savedCart = _cartRepository.findOne(1L);

        assertThat(savedCart.getCartItems()
                            .size()).isEqualTo(1);

        assertThat(savedCart.getTrees()
                            .size()).isEqualTo(1);
        assertThat(savedCart.getCartItems()
                            .get(0)
                            .getCart()
                            .getId()).isEqualTo(1L);

        CartItem cartItemInCart = savedCart.getCartItems()
                                           .get(0);
        assertThat(cartItemInCart.getAmount()).isEqualTo(2);
        assertThat(cartItemInCart.getBasePricePerPiece()
                                 .doubleValue()).isEqualTo(1.0);
        assertThat(cartItemInCart.getFundingPerPiece()
                                 .doubleValue()).isEqualTo(0.0);
        assertThat(cartItemInCart.getProjectArticleId()).isEqualTo(1);
        assertThat(cartItemInCart.getScontoPerPiece()
                                 .doubleValue()).isEqualTo(0.0);
        assertThat(cartItemInCart.getTotalPrice()
                                 .doubleValue()).isEqualTo(2.0);
    }

    @Test
    public void testGetCartsByCartIds() {
        _dbInjecter.injectUser("Adam");

        Cart cart = new Cart();
        cart.setBuyer(_userRepository.findByName("Adam"));

        _cartRepository.save(cart);

        Cart cart2 = new Cart();
        cart2.setBuyer(_userRepository.findByName("Adam"));

        _cartRepository.save(cart2);

        Long[] cartIds = { 1L, 2L };

        List<Cart> carts = _cartRepository.findCartsByIdIn(cartIds);

        assertThat(carts.size()).isEqualTo(2);
    }

    @Test
    public void testFindCartByCode() {
        _dbInjecter.injectUser("Adam");
        Code code = _dbInjecter.injectGiftWithCode("Adam", Status.UNREDEEMED);

        Cart cart = new Cart();
        cart.setCode(code);
        cart.setBuyer(_userRepository.findByName("Adam"));
        _cartRepository.save(cart);

        Cart savedCart = _cartRepository.findCartByCode(code.getCode());

        assertThat(savedCart).isNotNull();
        assertThat(savedCart.getBuyer()
                            .getName()).isEqualTo("Adam");
    }

    @Test
    @Transactional
    public void testDeleteCart() {
        long timeOfPlanting = System.currentTimeMillis();

        _dbInjecter.injectUser("Adam");
        _dbInjecter.injectTreeType("wood", "wood desc", 0.5);
        _dbInjecter.injectProject("Project A", "Adam", "desc", true, 1.0f, 2.0f);
        _dbInjecter.injectProjectArticle("wood", "Project A", 100, 1.0, 0.5);

        Cart cart = new Cart();
        cart.setBuyer(_userRepository.findByName("Adam"));

        Tree tree = new Tree();
        tree.setAmount(1);
        tree.setPlantedOn(timeOfPlanting);
        tree.setSubmittedOn(timeOfPlanting);
        tree.setTreeType(_treeTypeRepository.findOne(1L));
        tree.setProjectArticle(_projectArticleRepository.findOne(1L));

        CartItem cartItem = new CartItem();
        cartItem.setBasePricePerPiece(new BigDecimal(1.0));
        cartItem.setTotalPrice(new BigDecimal(1.0));
        cartItem.setTree(tree);
        cart.addCartItem(cartItem);
        _cartRepository.save(cart);

        assertThat(_cartRepository.count()).isEqualTo(1);
        assertThat(_treeRepository.count()).isEqualTo(1);

        _cartRepository.delete(cart);
        assertThat(_cartRepository.count()).isEqualTo(0);
        assertThat(_treeRepository.count()).isEqualTo(0);

    }

}
