package org.dicadeveloper.weplantaforest.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.fail;

import org.dicadeveloper.weplantaforest.Application;
import org.dicadeveloper.weplantaforest.dev.inject.DatabasePopulator;
import org.dicadeveloper.weplantaforest.testsupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.trees.TreeService;
import org.dicadeveloper.weplantaforest.trees.UserService;
import org.dicadeveloper.weplantaforest.treetypes.TreeTypeRepository;
import org.dicadeveloper.weplantaforest.treetypes.TreeTypeService;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class DatabasePopulatorTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private DatabasePopulator _databasePopulator;
    @Autowired
    private UserService _userService;
    @Autowired
    private TreeTypeService _treeTypeService;
    @Autowired
    private TreeService _treeService;

    @Autowired
    private TreeTypeRepository _treeTypeRepository;

    @Test
    public void testInsertUsers() throws Exception {
        _databasePopulator.insertUsers();
        assertThat(_userService.findAll()).hasSize(4);
    }

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
        _databasePopulator.insertUsers();
        _databasePopulator.insertDefaultTreeTypes();
        _databasePopulator.insertTrees(1000);
        assertThat(_treeService.count()).isEqualTo(1000);
    }
}
