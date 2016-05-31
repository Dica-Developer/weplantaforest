package org.dicadeveloper.weplantaforest.projects;

import org.dicadeveloper.weplantaforest.Views;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ProjectController {
    
    @Autowired
    private @NonNull ProjectRepository _projectRepository;

    @RequestMapping(value = "/projects", method = RequestMethod.GET)
    @JsonView(Views.Project.class)
    public Iterable<Project> list() {
        return _projectRepository.findAll();
    }
}
