package org.dicadeveloper.weplantaforest.dev.inject;

import javax.annotation.PostConstruct;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("dev")
public class DataInjector {

    protected final Log LOG = LogFactory.getLog(DataInjector.class.getName());

    protected DatabasePopulator _databasePopulator;

    @Autowired
    public DataInjector(DatabasePopulator databasePopulator) {
        _databasePopulator = databasePopulator;
    }

    @PostConstruct
    private void inject() {
        Runnable treeInjector = new Runnable() {

            @Override
            public void run() {
                _databasePopulator.insertUsers()
                                  .insertArticles()
                                  .insertParagraphsToArticles();
            }
        };
        Thread thread = new Thread(treeInjector);
        thread.start();
    }
}
