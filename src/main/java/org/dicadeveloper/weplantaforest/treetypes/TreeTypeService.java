package org.dicadeveloper.weplantaforest.treetypes;

import org.dicadeveloper.weplantaforest.base.GenericService;

public interface TreeTypeService extends GenericService<TreeType, TreeTypeDto, Long> {

    @Override
    void save(TreeTypeDto treeTypeDto);

    TreeTypeDto findByName(String name);

    void delete(TreeTypeDto treeType);
}
