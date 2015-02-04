package org.dicadeveloper.weplantaforest.services;

import org.dicadeveloper.weplantaforest.persist.TreeType;
import org.dicadeveloper.weplantaforest.persist.TreeTypeRepository;
import org.dicadeveloper.weplantaforest.persist.dto.TreeTypeDto;
import org.springframework.stereotype.Service;

@Service
public class TreeTypeServiceImpl extends GenericServiceImpl<TreeType, TreeTypeDto, Long> implements TreeTypeService {

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

}
