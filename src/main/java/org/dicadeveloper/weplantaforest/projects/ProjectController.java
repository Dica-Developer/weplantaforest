package org.dicadeveloper.weplantaforest.projects;

import java.util.ArrayList;

import javax.annotation.Nullable;
import javax.ws.rs.core.MediaType;

import org.dicadeveloper.weplantaforest.util.UtilConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedResources;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProjectController {

    private ProjectService _projectService;

    private ProjectResourceAssembler _projectResourceAssembler;

    @Autowired
    public ProjectController(ProjectService projectService, ProjectResourceAssembler projectResourceAssembler) {
        _projectService = projectService;
        _projectResourceAssembler = projectResourceAssembler;
    }

    @RequestMapping(value = "/rest/v1/projects", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON })
    public PagedResources<ProjectDto> get(@PageableDefault(size = UtilConstants.DEFAULT_RETURN_RECORD_COUNT, page = 0, sort = { "_name" }) Pageable pageable,
            @Nullable PagedResourcesAssembler assembler) {
        Page<ProjectDto> projects = _projectService.findAll(pageable);
        PagedResources<ProjectDto> pagedResource = null;
        if (null != assembler) {
            pagedResource = assembler.toResource(projects, _projectResourceAssembler);
        } else {
            pagedResource = new PagedResources<ProjectDto>(new ArrayList<ProjectDto>(), null);
        }
        return pagedResource;
    }

    @RequestMapping(value = "/rest/v1/projects/active", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON })
    public PagedResources<ProjectDto> getActive(@PageableDefault(size = UtilConstants.DEFAULT_RETURN_RECORD_COUNT, page = 0, sort = { "_name" }) Pageable pageable,
            @Nullable PagedResourcesAssembler assembler) {
        Page<ProjectDto> projects = _projectService.findAllActive(pageable);
        PagedResources<ProjectDto> pagedResource = null;
        if (null != assembler) {
            pagedResource = assembler.toResource(projects, _projectResourceAssembler);
        } else {
            pagedResource = new PagedResources<ProjectDto>(new ArrayList<ProjectDto>(), null);
        }
        return pagedResource;
    }
}
