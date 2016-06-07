package org.dicadeveloper.weplantaforest.trees;

import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.views.Views;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class TreeController {

    @Autowired
    private @NonNull TreeRepository _treeRepository;

    @RequestMapping(value = Uris.TREE + "{id}", method = RequestMethod.GET)
    @JsonView(Views.PlantedTree.class)
    public Tree list(@PathVariable("id") long id) {
        return _treeRepository.findOne(id);
    }

    @RequestMapping(value = Uris.TREES, method = RequestMethod.GET)
    @JsonView(Views.PlantedTree.class)
    public Page<Tree> list(@Param("page") int page, @Param("size") int size) {
        return _treeRepository.findAll(new PageRequest(page, size, new Sort(new Order(Direction.DESC, "plantedOn"))));
    }

    @RequestMapping(value = Uris.TREES + "/{ownerId}", method = RequestMethod.GET)
    @JsonView(Views.PlantedTree.class)
    public Page<Tree> findTreesByOwnerId(@PathVariable("ownerId") long ownerId, @Param("page") int page, @Param("size") int size) {
        return _treeRepository.findTreesByUserId(ownerId, new PageRequest(page, size, new Sort(new Order(Direction.DESC, "plantedOn"))));
    }

}
