package org.dicadeveloper.weplantaforest.services;

import org.dicadeveloper.weplantaforest.persist.Tree;
import org.dicadeveloper.weplantaforest.persist.TreeRepository;
import org.dicadeveloper.weplantaforest.persist.dto.TreeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TreeServiceImpl extends GenericServiceImpl<Tree, TreeDto, Long> implements TreeService {

    @Autowired
    private TreeRepository _treeRepository;

    @Override
    public void save(TreeDto treeDto) {
        super.save(treeDto);
    }

    @Override
    public Long findTreeTypeIdById(Long id) {
        return _treeRepository.findTreeTypeIdById(id);
    }

}
