package org.dicadeveloper.weplantaforest.planting.self;

import javax.validation.Valid;

import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.trees.Tree;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class SelfPlantController {

    private @NonNull SelfPlantDataToTreeConverter _selfPlantDataToTreeConverter;

    private @NonNull TreeRepository _treeRepository;

    @RequestMapping(value = Uris.PLANT_SELF, method = RequestMethod.POST)
    public ResponseEntity<?> plantTreesByMyself(@Valid @RequestBody SelfPlantData selfPlantedTree, BindingResult bindingResult) {
        if (!bindingResult.hasErrors()) {
            Tree tree = _selfPlantDataToTreeConverter.convertSelfPlantDataToTree(selfPlantedTree);
            _treeRepository.save(tree);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
