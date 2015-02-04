package org.dicadeveloper.weplantaforest.services;

import static org.fest.assertions.Assertions.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import org.dicadeveloper.weplantaforest.Application;
import org.dicadeveloper.weplantaforest.persist.dto.TreeTypeDto;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@IntegrationTest("server.port=0")
@WebAppConfiguration
public class TreeTypeServiceImplIntegrationTest {

    @Autowired
    private TreeTypeService _treeTypeService;

    @Test
    public void testSaveTreeType_UniqueConstraint() {
        // setup
        final String treeTypeName = "Ahorn";
        TreeTypeDto treeType = _treeTypeService.findByName(treeTypeName);
        if (treeType.equals(TreeTypeDto.NO_TREE_TYPE)) {
            treeType = new TreeTypeDto(treeTypeName,
                    "Die Ahorne (Acer) bilden eine Pflanzengattung in der Unterfamilie der Rosskastaniengewächse (Hippocastanoideae) innerhalb der Familie der Seifenbaumgewächse (Sapindaceae). ");
            treeType.setInfoPath("http://de.wikipedia.org/wiki/Ahorne");
            try {
                _treeTypeService.save(treeType);
                assertThat(_treeTypeService.findByName(treeTypeName).getInfoPath()).isEqualTo("http://de.wikipedia.org/wiki/Ahorne");
            } catch (Exception e) {
                System.out.println(e.getMessage());
                fail();
            }
        }
        // change system
        try {
            _treeTypeService.save(treeType);
        } catch (DataIntegrityViolationException e) {
            // assertion
            assertTrue(true);
        }
    }
}
