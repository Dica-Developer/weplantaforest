package org.dicadeveloper.weplantaforest.treetypes;

import org.dicadeveloper.weplantaforest.base.GenericServiceImpl;
import org.dozer.DozerBeanMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TreeTypeServiceImpl extends GenericServiceImpl<TreeType, TreeTypeDto, Long> implements TreeTypeService {

    @Autowired
    public TreeTypeServiceImpl(DozerBeanMapper mapper, TreeTypeRepository repository) {
        super(mapper, repository);
    }

    @Override
    public void save(TreeTypeDto treeDto) {
        super.save(treeDto);
    }

    @Override
    public TreeTypeDto findByName(String name) {
        TreeTypeRepository treeRepo = (TreeTypeRepository) _repository;
        TreeType treeType = treeRepo.findByName(name);
        if (treeType == null) {
            return TreeTypeDto.NO_TREE_TYPE;
        }
        return _mapper.map(treeType, _dtoClass);
    }

    @Override
    public void delete(TreeTypeDto treeType) {
        super.delete(treeType.getId());
    }

}
