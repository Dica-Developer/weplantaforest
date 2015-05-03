package org.dicadeveloper.weplantaforest.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.fail;

import org.dicadeveloper.weplantaforest.Application;
import org.dicadeveloper.weplantaforest.dev.inject.DatabasePopulator;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@SpringApplicationConfiguration(classes = Application.class)
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class DatabasePopulatorTest {

    @Autowired
    private DatabasePopulator _databasePopulator;
    @Autowired
    private TreeTypeService _treeTypeService;
    @Autowired
    private TreeService _treeService;

    @Test
    public void testInsertDefaultTreeTypes() throws Exception {
        _databasePopulator.insertDefaultTreeTypes();
        assertThat(_treeTypeService.findAll()).hasSize(11);
    }

    @Test
    public void testInsertTrees_noTypes() throws Exception {
        try {
            _databasePopulator.insertTrees(10);
            fail("should throw exception");
        } catch (Exception e) {
            assertThat(e.getMessage()).isEqualTo("No TreeTypes set up!");
        }
    }

    @Test
    public void testInsertTrees() throws Exception {
        _databasePopulator.insertDefaultTreeTypes();
        _databasePopulator.insertTrees(1000);
        assertThat(_treeService.count()).isEqualTo(1000);
    }
}
