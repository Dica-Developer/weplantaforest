package org.dicadeveloper.weplantaforest.dev.inject;

import java.util.Iterator;
import java.util.List;

import jersey.repackaged.com.google.common.collect.Iterators;

import org.dicadeveloper.weplantaforest.persist.dto.TreeDto;
import org.dicadeveloper.weplantaforest.persist.dto.TreeTypeDto;
import org.dicadeveloper.weplantaforest.services.TreeService;
import org.dicadeveloper.weplantaforest.services.TreeTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.base.Verify;
import com.google.common.collect.ImmutableList;

/**
 * Provides the functionality to easily populate the database with test data.
 */
@Service
public class DatabasePopulator {

    private final static List<String> DEFAULT_TREE_TYPES = ImmutableList.of("Buche", "Kiefer", "Birke", "Ahorn", "Eiche", "Esche", "Linde", "Wildapfel", "Robin", "Espe");

    @Autowired
    private TreeTypeService _treeTypeService;
    @Autowired
    private TreeService _treeService;

    public DatabasePopulator insertDefaultTreeTypes() {
        DEFAULT_TREE_TYPES.forEach((treeTypeName) -> {
            final String description = "Die " + treeTypeName
                    + " bilden eine Pflanzengattung in der Unterfamilie der Rosskastaniengewächse (Hippocastanoideae) innerhalb der Familie der Seifenbaumgewächse (Sapindaceae). ";
            TreeTypeDto treeType = new TreeTypeDto(treeTypeName, description);
            _treeTypeService.save(treeType);
        });
        return this;
    }

    public DatabasePopulator insertTrees(int count) {
        Iterator<TreeTypeDto> cyclingTreeTypes = Iterators.cycle(loadTreeTypes());
        for (int i = 0; i < count; i++) {
            TreeDto treeDto = new TreeDto(i, i, i % 20);
            treeDto.setTreeType(_treeTypeService.findByName(cyclingTreeTypes.next().getName()));
            _treeService.save(treeDto);
        }
        return this;
    }

    private List<TreeTypeDto> loadTreeTypes() {
        List<TreeTypeDto> allTreeTypes = _treeTypeService.findAll();
        Verify.verify(allTreeTypes.size() > 0, "No TreeTypes set up!");
        return allTreeTypes;
    }
}
