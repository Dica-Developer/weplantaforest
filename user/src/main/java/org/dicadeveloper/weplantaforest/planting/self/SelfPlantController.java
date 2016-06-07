package org.dicadeveloper.weplantaforest.planting.self;

import javax.validation.Valid;

import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.trees.Tree;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.dicadeveloper.weplantaforest.trees.User;
import org.dicadeveloper.weplantaforest.trees.UserRepository;
import org.dicadeveloper.weplantaforest.treetypes.TreeType;
import org.dicadeveloper.weplantaforest.treetypes.TreeTypeRepository;
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
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class SelfPlantController {

    private @NonNull TreeRepository _treeRepository;

    private @NonNull UserRepository _userRepository;

    private @NonNull TreeTypeRepository _treeTypeRepository;

    @RequestMapping(value = Uris.PLANT_SELF, method = RequestMethod.POST)
    public ResponseEntity<?> plantTreesByMyself(@Valid @RequestBody Tree selfPlantedTree, BindingResult bindingResult) {
        if (!bindingResult.hasErrors()) {
            User owner = _userRepository.findOne(selfPlantedTree.getOwner()
                                                                .getId());
            TreeType treeType = _treeTypeRepository.findOne(selfPlantedTree.getTreeType()
                                                                           .getId());
            selfPlantedTree.setOwner(owner);
            selfPlantedTree.setTreeType(treeType);
            
            long submittedOn = System.currentTimeMillis();
            selfPlantedTree.setSubmittedOn(submittedOn);

            _treeRepository.save(selfPlantedTree);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
