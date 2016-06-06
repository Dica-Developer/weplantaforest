package org.dicadeveloper.weplantaforest.planting.self;

import org.dicadeveloper.weplantaforest.trees.Tree;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class SelfPlantController {

    private @NonNull SelfPlantDataToTreeConverter _selfPlantDataToTreeConverter;

    private @NonNull SelfPlantValidator _selfPlantValidator;

    private @NonNull TreeRepository _treeRepository;

    @RequestMapping(value = "/plantSelf", method = RequestMethod.POST)
    public ResponseEntity<?> plantTreesByMyself(@RequestBody SelfPlantData selfPlantData) {
        if (_selfPlantValidator.isSelfPlantDataValid(selfPlantData)) {
            Tree tree = _selfPlantDataToTreeConverter.convertSelfPlantDataToTree(selfPlantData);
            _treeRepository.save(tree);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
