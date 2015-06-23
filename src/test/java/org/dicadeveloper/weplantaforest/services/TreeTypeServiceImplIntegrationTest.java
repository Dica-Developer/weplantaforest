package org.dicadeveloper.weplantaforest.services;

import org.dicadeveloper.weplantaforest.Application;
import org.dicadeveloper.weplantaforest.dev.inject.DatabasePopulator;
import org.dicadeveloper.weplantaforest.persist.dto.TreeTypeDto;
import org.dicadeveloper.weplantaforest.testsupport.CleanDbRule;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import static org.junit.Assert.fail;

import static org.fest.assertions.Assertions.assertThat;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@SpringApplicationConfiguration(classes = Application.class)
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class TreeTypeServiceImplIntegrationTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;
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
        treeType.setInfoLink("http://de.wikipedia.org/wiki/Ahorne");
        _treeTypeService.save(treeType);
        assertThat(_treeTypeService.findByName(treeType.getName()).getInfoLink()).isEqualTo("http://de.wikipedia.org/wiki/Ahorne");
    }

    @Test
    public void testSaveTreeType_UniqueConstraint() {
        TreeTypeDto treeType = new TreeTypeDto("Ahorn2",
                "Die Ahorne (Acer) bilden eine Pflanzengattung in der Unterfamilie der Rosskastaniengewächse (Hippocastanoideae) innerhalb der Familie der Seifenbaumgewächse (Sapindaceae). ");
        treeType.setInfoLink("http://de.wikipedia.org/wiki/Ahorne");
        _treeTypeService.save(treeType);

        try {
            TreeTypeDto treeTypeWithSameName = new TreeTypeDto(treeType.getName(), treeType.getDescription());
            _treeTypeService.save(treeTypeWithSameName);
            fail("should throw exception");
        } catch (DataIntegrityViolationException e) {
            assertThat(e)
                    .hasMessage(
                            "could not execute statement; SQL [n/a]; constraint [\"UK_TNKFFNPMDERWBF406D8POUK89_INDEX_8 ON PUBLIC.TREETYPE(_NAME) VALUES ('Ahorn2', 1)\"; SQL statement:\ninsert into TreeType (treeTypeId, _annualCo2SavingInTons, _description, _imageFile, _infoLink, _name) values (null, ?, ?, ?, ?, ?) [23505-186]]; nested exception is org.hibernate.exception.ConstraintViolationException: could not execute statement");
        }
    }

    @Test
    public void testDeleteTreeType() {
        TreeTypeDto treeType = new TreeTypeDto("Ahorn2",
                "Die Ahorne (Acer) bilden eine Pflanzengattung in der Unterfamilie der Rosskastaniengewächse (Hippocastanoideae) innerhalb der Familie der Seifenbaumgewächse (Sapindaceae). ");
        treeType.setInfoLink("http://de.wikipedia.org/wiki/Ahorne");
        _treeTypeService.save(treeType);
        assertThat(_treeTypeService.findByName(treeType.getName()).getInfoLink()).isEqualTo("http://de.wikipedia.org/wiki/Ahorne");
        _treeTypeService.delete(treeType);
        assertThat(_treeTypeService.existsAtAll()).isFalse();
    }

    @Test
    public void testFindOne() {
        TreeTypeDto treeType = new TreeTypeDto("Ahorn2",
                "Die Ahorne (Acer) bilden eine Pflanzengattung in der Unterfamilie der Rosskastaniengewächse (Hippocastanoideae) innerhalb der Familie der Seifenbaumgewächse (Sapindaceae). ");
        treeType.setInfoLink("http://de.wikipedia.org/wiki/Ahorne");
        _treeTypeService.save(treeType);
        assertThat(_treeTypeService.findOne(treeType.getId()).getInfoLink()).isEqualTo("http://de.wikipedia.org/wiki/Ahorne");
    }
}
