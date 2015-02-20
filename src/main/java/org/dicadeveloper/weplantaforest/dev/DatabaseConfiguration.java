package org.dicadeveloper.weplantaforest.dev;

import javax.annotation.PostConstruct;

import org.dicadeveloper.weplantaforest.persist.dto.TreeTypeDto;
import org.dicadeveloper.weplantaforest.services.TreeTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("dev")
public class DatabaseConfiguration {

    @Autowired
    private TreeTypeService _treeTypeService;

    public DatabaseConfiguration() {
    }

    @PostConstruct
    private void inject() {
        if (!_treeTypeService.existsAtAll()) {
            System.out.println("Start injecting 1000 tree types");
            for (int i = 0; i < 1000; i++) {
                final String name = "Ahorn_" + i;
                final String description = "Die Ahorne (Acer) bilden eine Pflanzengattung in der Unterfamilie der Rosskastaniengewächse (Hippocastanoideae) innerhalb der Familie der Seifenbaumgewächse (Sapindaceae). ";
                TreeTypeDto treeType = new TreeTypeDto(name, description);
                _treeTypeService.save(treeType);
            }
            System.out.println("Finished injecting 1000 tree types");
        } else {
            System.out.println("hat sebastian gesagt!!!! blame him!!!!");
        }
    }
}
