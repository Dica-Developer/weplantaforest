package org.dicadeveloper.weplantaforest.dev.inject;

import javax.annotation.PostConstruct;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("dev")
@DependsOn(value = "fileSystemInjector")
public class DataInjectorForArticleManager {

    protected final Log LOG = LogFactory.getLog(DataInjectorForArticleManager.class.getName());

    protected DatabasePopulatorForArticleManager _databasePopulator;

    @Autowired
    public DataInjectorForArticleManager(DatabasePopulatorForArticleManager databasePopulator) {
        _databasePopulator = databasePopulator;
    }

    @PostConstruct
    private void inject() {
        Runnable treeInjector = new Runnable() {

            @Override
            public void run() {
                _databasePopulator.insertUsers()
                                  .insertArticles()
                                  .insertParagraphsToArticles()
                                  .createArticleImageFoldersAndAddImage()
                                  ;
            }
        };
        Thread thread = new Thread(treeInjector);
        thread.start();
    }
}
