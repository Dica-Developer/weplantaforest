package org.dicadeveloper.weplantaforest.dev.inject;

import javax.annotation.PostConstruct;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.services.TreeTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("dev")
public class DataInjector {

    protected final Log LOG = LogFactory.getLog(DataInjector.class.getName());

    protected TreeTypeService _treeTypeService;

    protected DatabasePopulator _databasePopulator;

    @Autowired
    public DataInjector(TreeTypeService treeTypeService, DatabasePopulator databasePopulator) {
        _treeTypeService = treeTypeService;
        _databasePopulator = databasePopulator;
    }

    @PostConstruct
    private void inject() {
        Runnable treeInjector = new Runnable() {

            @Override
            public void run() {
                // TODO jz: Thinking about giving this an extra state table in
                // the db
                // (like db.populates=v23)
                if (!_treeTypeService.existsAtAll()) {
                    int treeCount = 15000;
                    _databasePopulator.insertUsers().insertDefaultTreeTypes().insertTrees(treeCount);
                    LOG.info("Finished injecting " + treeCount + " trees ");
                } else {
                    LOG.info("No entities will be injected.");
                }
            }
        };
        Thread thread = new Thread(treeInjector);
        thread.start();
    }
}
