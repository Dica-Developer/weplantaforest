package org.dicadeveloper.weplantaforest.services;

import org.dicadeveloper.weplantaforest.persist.TreeType;
import org.dicadeveloper.weplantaforest.persist.dto.TreeTypeDto;

public interface TreeTypeService extends GenericService<TreeType, TreeTypeDto, Long> {

    @Override
    void save(TreeTypeDto treeTypeDto);

    TreeTypeDto findByName(String name);
}
