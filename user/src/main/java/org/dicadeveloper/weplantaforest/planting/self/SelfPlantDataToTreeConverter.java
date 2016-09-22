package org.dicadeveloper.weplantaforest.planting.self;

import org.dicadeveloper.weplantaforest.trees.Tree;
import org.dicadeveloper.weplantaforest.treetypes.TreeTypeRepository;
import org.dicadeveloper.weplantaforest.user.User;
import org.dicadeveloper.weplantaforest.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import lombok.NonNull;

@Component
public class SelfPlantDataToTreeConverter {

    private @NonNull UserRepository _userRepository;

    private @NonNull TreeTypeRepository _treeTypeRepository;

    @Autowired
    private SelfPlantDataToTreeConverter(UserRepository userRepository, TreeTypeRepository treeTypeRepository) {
        _userRepository = userRepository;
        _treeTypeRepository = treeTypeRepository;
    }

    protected Tree convertSelfPlantDataToTree(SelfPlantData selfPlantData, User owner) {
        Tree tree = new Tree();
        long submittedOn = System.currentTimeMillis();

        tree.setOwner(owner);
        tree.setPlantedOn(selfPlantData.getPlantedOn());
        tree.setSubmittedOn(submittedOn);
        tree.setAmount(selfPlantData.getAmount());

        tree.setImagePath(selfPlantData.getImageName());
   
        tree.setTreeType(_treeTypeRepository.findByName(selfPlantData.getTreeType()));
        tree.setDescription(selfPlantData.getDescription());
        tree.setLongitude(selfPlantData.getLongitude());
        tree.setLatitude(selfPlantData.getLatitude());

        return tree;
    }

}