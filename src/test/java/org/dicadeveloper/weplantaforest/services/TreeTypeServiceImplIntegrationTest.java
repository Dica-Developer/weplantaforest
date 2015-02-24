package org.dicadeveloper.weplantaforest.services;

import static org.fest.assertions.Assertions.assertThat;

import static org.junit.Assert.fail;

import org.dicadeveloper.weplantaforest.Application;
import org.dicadeveloper.weplantaforest.dev.inject.DatabasePopulator;
import org.dicadeveloper.weplantaforest.persist.dto.TreeTypeDto;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class TreeTypeServiceImplIntegrationTest {

    @Autowired
    private DatabasePopulator _databasePopulator;
    @Autowired
    private TreeTypeService _treeTypeService;

    @Test
    public void testName() throws Exception {
        _databasePopulator.insertDefaultTreeTypes();
    }

    @Test
    public void testSaveTreeType() {
        TreeTypeDto treeType = new TreeTypeDto("Ahorn2",
                "Die Ahorne (Acer) bilden eine Pflanzengattung in der Unterfamilie der Rosskastaniengewächse (Hippocastanoideae) innerhalb der Familie der Seifenbaumgewächse (Sapindaceae). ");
        treeType.setInfoPath("http://de.wikipedia.org/wiki/Ahorne");
        _treeTypeService.save(treeType);
        assertThat(_treeTypeService.findByName(treeType.getName()).getInfoPath()).isEqualTo("http://de.wikipedia.org/wiki/Ahorne");
    }

    @Test
    public void testSaveTreeType_UniqueConstraint() {
        TreeTypeDto treeType = new TreeTypeDto("Ahorn2",
                "Die Ahorne (Acer) bilden eine Pflanzengattung in der Unterfamilie der Rosskastaniengewächse (Hippocastanoideae) innerhalb der Familie der Seifenbaumgewächse (Sapindaceae). ");
        treeType.setInfoPath("http://de.wikipedia.org/wiki/Ahorne");
        _treeTypeService.save(treeType);

        try {
            TreeTypeDto treeTypeWithSameName = new TreeTypeDto(treeType.getName(), treeType.getDescription());
            _treeTypeService.save(treeTypeWithSameName);
            fail("should throw exception");
        } catch (DataIntegrityViolationException e) {
            // should happen since name already exists
        }
    }
}
