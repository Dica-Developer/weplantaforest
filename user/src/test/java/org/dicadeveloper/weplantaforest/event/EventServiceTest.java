package org.dicadeveloper.weplantaforest.event;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

import javax.transaction.Transactional;

import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.cart.CartRepository;
import org.dicadeveloper.weplantaforest.cart.CartState;
import org.dicadeveloper.weplantaforest.code.Code;
import org.dicadeveloper.weplantaforest.code.CodeRepository;
import org.dicadeveloper.weplantaforest.common.code.CodeHelper;
import org.dicadeveloper.weplantaforest.common.errorHandling.IpatException;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.team.Team;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.dicadeveloper.weplantaforest.trees.Tree;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.dicadeveloper.weplantaforest.user.User;
import org.junit.FixMethodOrder;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest({ "spring.profiles.active=test" })
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
@DirtiesContext(classMode = ClassMode.AFTER_CLASS)
public class EventServiceTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private DbInjecter _dbInjecter;

    @Autowired
    private EventService _eventService;

    @Autowired
    private EventRepository _eventRepository;

    @Autowired
    private CodeRepository _codeRepository;

    @Autowired
    private CartRepository _cartRepository;

    @Autowired
    private TreeRepository _treeRepository;

    @Test
    @Transactional
    public void testRedeemEventCode() {
        String codeString = prepareDbAndReturnCodeString();
        assertEquals(1, _cartRepository.count());
        assertEquals(1, _eventRepository.count());
        assertEquals(1, _codeRepository.count());
        assertEquals(CartState.GENERATED, _cartRepository.findById(1L).orElse(null).getCartState());
        Tree tree = _treeRepository.findById(1L).orElse(null);
        assertEquals(5, tree.getAmount());
        assertEquals("eventUser", tree.getOwner().getName());

        User redeemer = _dbInjecter.injectUser("redeemer");

        try {
            _eventService.redeemEventCode(redeemer, codeString);
        } catch (IpatException e) {
            fail(String.format("No Exception expected, when redeeming a gift code.\nerrorCode: %s", e.getErrorInfos().get(0).getErrorCode()));
        }

        assertEquals(CartState.VERIFIED, _cartRepository.findById(1L).orElse(null).getCartState());
        tree = _treeRepository.findById(1L).orElse(null);
        assertEquals(5, tree.getAmount());
        assertEquals("redeemer", tree.getOwner().getName());

    }

    private String prepareDbAndReturnCodeString() {
        User eventUser = _dbInjecter.injectUser("eventUser");
        Team eventTeam = _dbInjecter.injectTeam("eventTeam", "eventUser");
        Event event = _dbInjecter.injectEvent("event", eventUser, eventTeam);
        _dbInjecter.injectTreeType("wood", "this is a wood", 0.5);
        _dbInjecter.injectProject("Project A", "eventUser", "this is a project", true, 0, 0);
        _dbInjecter.injectProjectArticle("wood", "Project A", 10, 1.0, 0.5);
        Tree tree = _dbInjecter.injectTreeToProject("wood", "eventUser", 5, 10000, "Project A");
        Cart cart = _dbInjecter.injectCartWithTrees("eventUser", tree);
        Code code = generateCode();
        code.setEvent(event);
        code = _codeRepository.save(code);
        cart.setEvent(event);
        cart.setCode(code);
        cart.setCartState(CartState.GENERATED);
        _cartRepository.save(cart);
        code.setCart(cart);
        _codeRepository.save(code);

        return code.getCode();
    }

    private Code generateCode() {
        Code code = new Code();
        // save code or try generate a new one
        boolean codeSaved = false;
        while (!codeSaved) {
            final String codeString = CodeHelper.generateCodeString();
            if (null == _codeRepository.findByCode(codeString)) {
                code.setCode(codeString);
                codeSaved = true;
                return _codeRepository.save(code);
            }
        }
        return null;
    }

}
