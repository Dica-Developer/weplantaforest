package org.dicadeveloper.weplantaforest.admin.team;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.admin.views.Views;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@RestController
public class TeamController {

    protected final Log LOG = LogFactory.getLog(TeamController.class.getName());

    public final static String REQUEST_URL = "/team";

    private @NonNull TeamRepository _teamRepository;

    @GetMapping(value = REQUEST_URL + "s")
    @JsonView(Views.TeamOverview.class)
    public List<Team> getAllUser() {
        return _teamRepository.findAllByOrderByNameAsc();
    }
}
