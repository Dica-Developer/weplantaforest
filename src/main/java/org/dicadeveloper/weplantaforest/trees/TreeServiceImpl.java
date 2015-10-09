package org.dicadeveloper.weplantaforest.trees;

import org.dicadeveloper.weplantaforest.base.GenericServiceImpl;
import org.dozer.DozerBeanMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class TreeServiceImpl extends GenericServiceImpl<Tree, TreeDto, Long> implements TreeService {

    @Autowired
    public TreeServiceImpl(DozerBeanMapper mapper, @Qualifier("treeRepository") TreeRepository repository) {
        super(mapper, repository);
    }

    @Override
    public void save(TreeDto treeDto) {
        super.save(treeDto);
    }

    @Override
    public Long findTreeTypeIdByTreeId(Long treeId) {
        return ((TreeRepository) _repository).findTreeTypeIdByTreeId(treeId);
    }

    @Override
    public boolean exists(Long treeId) {
        return ((TreeRepository) _repository).exists(treeId);
    }
}
