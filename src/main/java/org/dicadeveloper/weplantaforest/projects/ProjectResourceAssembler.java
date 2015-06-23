package org.dicadeveloper.weplantaforest.projects;

import java.util.List;

import jersey.repackaged.com.google.common.collect.Lists;

import org.dicadeveloper.weplantaforest.controller.TreeController;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
import org.springframework.hateoas.mvc.ResourceAssemblerSupport;
import org.springframework.stereotype.Service;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;

// FIXME specify also the type for resource
@Service
public class ProjectResourceAssembler extends ResourceAssemblerSupport<ProjectDto, Resource> {

    public ProjectResourceAssembler() {
        super(ProjectResourceAssembler.class, Resource.class);
    }

    @Override
    public List<Resource> toResources(Iterable<? extends ProjectDto> projectDtos) {
        List<Resource> resources = Lists.newArrayList();
        projectDtos.forEach((projectDto) -> {
            Link selfLink = linkTo(ProjectController.class).slash("/rest/v1/projects/" + projectDto.getDtoId()).withRel("self");
            resources.add(new Resource<ProjectDto>(projectDto, selfLink));
        });
        return resources;
    }

    @Override
    public Resource<ProjectDto> toResource(ProjectDto projectDto) {
        ControllerLinkBuilder treeLink = linkTo(TreeController.class);
        Link selfLinkTree = treeLink.slash("/rest/v1/trees/" + projectDto.getDtoId()).withRel("self");
        return new Resource<ProjectDto>(projectDto, selfLinkTree);
    }

}
