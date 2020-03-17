package org.dicadeveloper.weplantaforest.admin.dev;

import javax.annotation.PostConstruct;

import org.dicadeveloper.weplantaforest.admin.treeType.TreeTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Component
@Profile("dev")
@Slf4j
public class DataInjector {

    protected DatabasePopulator databasePopulator;

    private TreeTypeRepository treeTypeRepository;

    @Autowired
    public DataInjector(TreeTypeRepository treeTypeRepository, DatabasePopulator databasePopulator) {
        this.treeTypeRepository = treeTypeRepository;
        this.databasePopulator = databasePopulator;
    }

    @PostConstruct
    private void inject() {
        Runnable treeInjector = new Runnable() {

            @Override
            public void run() {
                // TODO jz: Thinking about giving this an extra state table in
                // the db (like db.populates=v23)
                if (!treeTypeRepository.existsAtAll()) {
                    int treeCount = 15000;
                    databasePopulator.insertUsers().insertDefaultTreeTypes().insertProjects().insertProjectArticles().insertCarts().insertProjectImages().addMainImagesToProjectFolder()
                            .addProjectImages().createMainSliderImages();
                    ;
                    LOG.info("Finished injecting {} trees ", treeCount);
                } else {
                    LOG.info("No entities will be injected.");
                }
            }
        };
        Thread thread = new Thread(treeInjector);
        thread.start();
    }
}
