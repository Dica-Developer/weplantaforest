package org.dicadeveloper.weplantaforest.trees;

import org.dicadeveloper.weplantaforest.base.GenericService;

public interface TreeService extends GenericService<Tree, TreeDto, Long> {

    @Override
    void save(TreeDto treeDto);

    Long findTreeTypeIdByTreeId(Long treeId);

    boolean exists(Long treeId);
}
