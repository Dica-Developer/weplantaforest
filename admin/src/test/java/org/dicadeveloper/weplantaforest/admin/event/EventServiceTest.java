package org.dicadeveloper.weplantaforest.admin.event;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.fail;

import java.util.ArrayList;
import java.util.List;

import org.dicadeveloper.weplantaforest.admin.cart.Cart;
import org.dicadeveloper.weplantaforest.admin.cart.CartRepository;
import org.dicadeveloper.weplantaforest.admin.code.Code;
import org.dicadeveloper.weplantaforest.admin.code.CodeRepository;
import org.dicadeveloper.weplantaforest.admin.project.Project;
import org.dicadeveloper.weplantaforest.admin.team.Team;
import org.dicadeveloper.weplantaforest.admin.testSupport.DbInjecter;
import org.dicadeveloper.weplantaforest.admin.treeType.TreeType;
import org.dicadeveloper.weplantaforest.admin.user.User;
import org.dicadeveloper.weplantaforest.admin.user.UserRepository;
import org.dicadeveloper.weplantaforest.common.errorhandling.IpatException;
import org.junit.FixMethodOrder;
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

    @Autowired
    private EventService _eventService;

    @Autowired
    private EventRepository _eventRepository;

    @Autowired
    private CodeRepository _codeRepository;

    @Autowired
    private CartRepository _cartRepository;

    @Autowired
    private UserRepository _userRepository;

    @Autowired
    private DbInjecter _dbInjecter;

    @Test
    public void testACreateEvent() {
        User user = _dbInjecter.injectUser("EventUser");
        Team team = _dbInjecter.injectTeam("EventTeam", "EventUser");
        Event event = new Event();
        event.setName("Event");
        event.setUser(user);
        event.setTeam(team);

        try {
            _eventService.create(event);
        } catch (IpatException e) {
            fail(String.format("Error when creating Event\nerrorCode: %s", e.getErrorInfos().get(0).getErrorCode()));
        }

        assertEquals(1L, _eventRepository.count());
    }

    @Test
    public void testBUpdateEvent() {
        String updatedEventName = "Event update";
        Event eventToUpdate = _eventRepository.findById(1L).orElse(null);
        eventToUpdate.setName(updatedEventName);
        try {
            _eventService.update(eventToUpdate);
        } catch (IpatException e) {
            fail(String.format("Error when updating event\nerrorCode: %s", e.getErrorInfos().get(0).getErrorCode()));
        }
        assertEquals(1L, _eventRepository.count());
        Event updatedEvent = _eventRepository.findById(1L).orElse(null);
        assertEquals(updatedEventName, updatedEvent.getName());
    }

    @Test
    public void testCGenerateCodesForEvent() {
        User projectOwner = _dbInjecter.injectUser("project User");
        User eventUser = _userRepository.findByName("EventUser");
        Project project = _dbInjecter.injectProject("Event project", projectOwner, "Event project description", true, 1.0f, 1.0f);
        TreeType treeType = _dbInjecter.injectTreeType("eventTree", "eventtree description", 0.5);
        _dbInjecter.injectProjectArticle(treeType, project, 1.0);
        List<Long> cartIds = new ArrayList<Long>();
        for (int i = 0; i < 100; i++) {
            Long treeId = _dbInjecter.injectTreeToProject(treeType, eventUser, 1, System.currentTimeMillis(), project);
            Long cartId = _dbInjecter.injectCart(eventUser, treeId);
            cartIds.add(cartId);
        }
        try {
            _eventService.generateCodes(1L, cartIds);
        } catch (IpatException e) {
            fail(String.format("Error while creating Codes for Event\nerrorCode: %s", e.getErrorInfos().get(0).getErrorCode()));
        }
        assertEquals(100, _codeRepository.count());
        for (Code code : _codeRepository.findAll()) {
            assertEquals(1L, code.getEvent().getId().longValue());
        }
        for (Cart cart : _cartRepository.findAll()) {
            assertNotNull(cart.getCode());
            assertEquals(1L, cart.getEvent().getId().longValue());
        }
    }

    @Test
    public void testDDeleteEvent() {
        try {
            _eventService.delete(1L);
        } catch (IpatException e) {
            fail(String.format("Error in deleting event\nerrorCode: %s", e.getErrorInfos().get(0).getErrorCode()));
        }

        assertNull(_eventRepository.findById(1L));
        assertEquals(0, _cartRepository.count());
        assertEquals(0, _codeRepository.count());
    }

}
