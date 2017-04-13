package org.dicadeveloper.weplantaforest.admin.event;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.admin.errorhandling.IpatException;
import org.dicadeveloper.weplantaforest.views.Views;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
@RestController(value = EventController.REQUEST_URL)
public class EventController {

    protected final Log LOG = LogFactory.getLog(EventController.class.getName());

    public final static String REQUEST_URL = "/events";

    private @NonNull EventService eventService;

    private @NonNull EventRepository eventRepository;

    @PostMapping
    public ResponseEntity<?> createEvent(@RequestBody Event event) throws IpatException {
        Event createdEvent = eventService.create(event);
        return new ResponseEntity<>(createdEvent, HttpStatus.OK);
    }

    @GetMapping
    @JsonView(Views.Event.class)
    public Iterable<?> getEvents() {
        return eventRepository.findAll();
    }

    @DeleteMapping(value = "/{eventId}")
    public void deleteEvent(@PathVariable Long eventId) throws IpatException {
        eventService.delete(eventId);
    }
}
