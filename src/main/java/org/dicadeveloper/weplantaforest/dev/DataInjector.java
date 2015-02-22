package org.dicadeveloper.weplantaforest.dev;

import javax.annotation.PostConstruct;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.services.DatabasePopulator;
import org.dicadeveloper.weplantaforest.services.TreeTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("dev")
public class DataInjector {

    private final Log LOG = LogFactory.getLog(DataInjector.class);

    @Autowired
    private TreeTypeService _treeTypeService;
    @Autowired
    private DatabasePopulator _databasePopulator;

    public DataInjector() {
    }

    @PostConstruct
    private void inject() {
        // TODO jz: Thinking about giving this an extra state table in the db
        // (like db.populates=v23)
        if (!_treeTypeService.existsAtAll()) {
            int treeCount = 5000;
            _databasePopulator.insertDefaultTreeTypes().insertTrees(treeCount);
            LOG.info("Finished injecting " + treeCount + " trees ");
        } else {
            LOG.info("No entities will be injected.");
        }
    }
}
