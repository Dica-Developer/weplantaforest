package org.dicadeveloper.weplantaforest.trees;

import org.dicadeveloper.weplantaforest.Application;
import org.dicadeveloper.weplantaforest.testsupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.trees.TreeDto;
import org.dicadeveloper.weplantaforest.trees.TreeService;
import org.dicadeveloper.weplantaforest.treetypes.TreeTypeDto;
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
import org.springframework.test.context.web.WebAppConfiguration;

import static org.fest.assertions.Assertions.assertThat;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@SpringApplicationConfiguration(classes = Application.class)
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class TreeServiceImplIntegrationTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private TreeService _treeService;

    @Autowired
    private TreeTypeService _treeTypeService;

    @Test
    public void testFindTreeTypeIdByTreeId_Find() {
        TreeTypeDto treeType = new TreeTypeDto("Ahorn2",
                "Die Ahorne (Acer) bilden eine Pflanzengattung in der Unterfamilie der Rosskastaniengewächse (Hippocastanoideae) innerhalb der Familie der Seifenbaumgewächse (Sapindaceae). ");
        treeType.setInfoLink("http://de.wikipedia.org/wiki/Ahorne");
        _treeTypeService.save(treeType);
        TreeDto treeDto = new TreeDto(0, 0, 0);
        treeDto.setTreeType(treeType);
        _treeService.save(treeDto);

        Long treeTypeId = _treeService.findTreeTypeIdByTreeId(treeDto.getDtoId());
        assertThat(treeTypeId).isEqualTo(treeType.getId());
    }

    @Test
    public void testFindTreeTypeIdByTreeId_DoNotFind_NoTree() {
        Long treeTypeId = _treeService.findTreeTypeIdByTreeId(353464L);
        assertThat(treeTypeId).isNull();
    }

    @Test
    public void testFindTreeTypeIdByTreeId_DoNotFind_NoTreeType() {
        TreeTypeDto treeType = new TreeTypeDto("Ahorn2",
                "Die Ahorne (Acer) bilden eine Pflanzengattung in der Unterfamilie der Rosskastaniengewächse (Hippocastanoideae) innerhalb der Familie der Seifenbaumgewächse (Sapindaceae). ");
        treeType.setInfoLink("http://de.wikipedia.org/wiki/Ahorne");
        _treeTypeService.save(treeType);
        TreeDto treeDto = new TreeDto(0, 0, 0);
        _treeService.save(treeDto);

        Long treeTypeId = _treeService.findTreeTypeIdByTreeId(treeDto.getDtoId());
        assertThat(treeTypeId).isEqualTo(null);
    }

}
