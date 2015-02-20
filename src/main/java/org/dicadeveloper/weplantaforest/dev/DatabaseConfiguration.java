package org.dicadeveloper.weplantaforest.dev;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.annotation.PostConstruct;

import org.dicadeveloper.weplantaforest.persist.dto.TreeDto;
import org.dicadeveloper.weplantaforest.persist.dto.TreeTypeDto;
import org.dicadeveloper.weplantaforest.services.TreeService;
import org.dicadeveloper.weplantaforest.services.TreeTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("dev")
public class DatabaseConfiguration {

    @Autowired
    private TreeTypeService _treeTypeService;

    @Autowired
    private TreeService _treeService;

    public DatabaseConfiguration() {
    }

    @PostConstruct
    private void inject() {
        Random treeCountRandom = new Random(System.currentTimeMillis());
        if (!_treeTypeService.existsAtAll()) {
            List<String> treeTypeNames = new ArrayList<String>();
            treeTypeNames.add("Buche");
            treeTypeNames.add("Kiefer");
            treeTypeNames.add("Birke");
            treeTypeNames.add("Ahorn");
            treeTypeNames.add("Eiche");
            treeTypeNames.add("Esche");
            treeTypeNames.add("Linde");
            treeTypeNames.add("Wildapfel");
            treeTypeNames.add("Robin");
            treeTypeNames.add("Espe");
            treeTypeNames.add("Default");
            System.out.println("Start injecting " + treeTypeNames.size() + " tree types");
            for (String treeTypeName : treeTypeNames) {
                final String description = "Die " + treeTypeName
                        + " bilden eine Pflanzengattung in der Unterfamilie der Rosskastaniengewächse (Hippocastanoideae) innerhalb der Familie der Seifenbaumgewächse (Sapindaceae). ";
                TreeTypeDto treeType = new TreeTypeDto(treeTypeName, description);
                _treeTypeService.save(treeType);
                for (int i = 0; i < treeCountRandom.nextInt(100) + 100; i++) {
                    TreeDto treeDto = new TreeDto(0.0f, 0.0f, treeCountRandom.nextInt(10) + 1);
                    treeDto.setTreeType(treeType);
                    _treeService.save(treeDto);
                }
            }
            System.out.println("Finished injecting " + treeTypeNames.size() + " tree types");
        } else {
            System.out.println("hat sebastian gesagt!!!! blame him!!!!");
        }
    }
}
