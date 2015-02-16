package org.dicadeveloper.weplantaforest.services;

import org.dicadeveloper.weplantaforest.persist.Tree;
import org.dicadeveloper.weplantaforest.persist.dto.TreeDto;

public interface TreeService extends GenericService<Tree, TreeDto, Long> {

    @Override
    void save(TreeDto treeDto);

    Long findTreeTypeIdById(Long id);
}
