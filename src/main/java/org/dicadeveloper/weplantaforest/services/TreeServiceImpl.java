package org.dicadeveloper.weplantaforest.services;

import org.dicadeveloper.weplantaforest.persist.Tree;
import org.dicadeveloper.weplantaforest.persist.dto.TreeDto;
import org.springframework.stereotype.Service;

@Service
public class TreeServiceImpl extends GenericServiceImpl<Tree, TreeDto, Long> implements TreeService {

    @Override
    public void save(TreeDto treeDto) {
        super.save(treeDto);
    }
}
