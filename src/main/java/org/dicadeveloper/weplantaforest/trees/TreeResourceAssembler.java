package org.dicadeveloper.weplantaforest.trees;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;

import java.util.List;

import jersey.repackaged.com.google.common.collect.Lists;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
import org.springframework.hateoas.mvc.ResourceAssemblerSupport;
import org.springframework.stereotype.Service;

@Service
// FIXME specify also the type for resource
public class TreeResourceAssembler extends ResourceAssemblerSupport<TreeDto, Resource> {

    public TreeResourceAssembler() {
        super(TreeController.class, Resource.class);
    }

    @Override
    public List<Resource> toResources(Iterable<? extends TreeDto> treeDtos) {
        List<Resource> resources = Lists.newArrayList();
        treeDtos.forEach((treeDto) -> {
            Link selfLinkTree = linkTo(TreeController.class).slash("/rest/v1/trees/" + treeDto.getId()).withRel("self");
            resources.add(new Resource<TreeDto>(treeDto, selfLinkTree));
        });
        return resources;
    }

    @Override
    public Resource<TreeDto> toResource(TreeDto treeDto) {
        ControllerLinkBuilder treeLink = linkTo(TreeController.class);
        Link selfLinkTree = treeLink.slash("/rest/v1/trees/" + treeDto.getDtoId()).withRel("self");
        Link treeType = treeLink.slash("/rest/v1/treetypes/" + treeDto.getTreeType().getId()).withRel("treeType");
        return new Resource<TreeDto>(treeDto, selfLinkTree, treeType);
    }

}
