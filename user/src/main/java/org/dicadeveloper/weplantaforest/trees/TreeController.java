package org.dicadeveloper.weplantaforest.trees;

import org.dicadeveloper.weplantaforest.views.Views;
import org.springframework.beans.factory.annotation.Autowired;
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

    @RequestMapping(value = "/tree/{id}", method = RequestMethod.GET)
    @JsonView(Views.PlantedTree.class)
    public Tree list(@PathVariable("id") int id) {
        return _treeRepository.findOne((long) id);
    }

}
