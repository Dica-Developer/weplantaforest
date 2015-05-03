package org.dicadeveloper.weplantaforest.reports.co2;

import static org.fest.assertions.Assertions.assertThat;

import java.util.Date;
import java.util.concurrent.TimeUnit;

import org.dicadeveloper.weplantaforest.Application;
import org.dicadeveloper.weplantaforest.persist.dto.TreeDto;
import org.dicadeveloper.weplantaforest.persist.dto.TreeTypeDto;
import org.dicadeveloper.weplantaforest.services.TreeService;
import org.dicadeveloper.weplantaforest.services.TreeTypeService;
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
public class Co2ServiceIntegrationTest {

    @Autowired
    private TreeService _treeService;

    @Autowired
    private TreeTypeService _treeTypeService;

    @Autowired
    private Co2Service _co2Service;

    @Test
    public void testGetCo2OfAllTrees_NoTimeForSavingCo2() {
        TreeTypeDto treeTypeDto = new TreeTypeDto("wood", "description");
        treeTypeDto.setAnnualCo2SavingInTons(0.5);
        _treeTypeService.save(treeTypeDto);
        TreeDto tree = new TreeDto(0, 0, 10);
        tree.setTreeType(treeTypeDto);
        tree.setPlantedOn(new Date());
        tree.setSubmittedOn(new Date());
        _treeService.save(tree);

        Co2Dto co2Dto = _co2Service.getGetCo2OfAllTrees();
        assertThat(co2Dto.getCo2()).isEqualTo(0.0);
        assertThat(co2Dto.getTreesCount()).isEqualTo(10);
    }

    @Test
    public void testGetCo2OfAllTrees_1YearForSavingCo2() {
        TreeTypeDto treeTypeDto = new TreeTypeDto("wood", "description");
        treeTypeDto.setAnnualCo2SavingInTons(0.5);
        _treeTypeService.save(treeTypeDto);
        TreeDto tree = new TreeDto(0, 0, 10);
        tree.setTreeType(treeTypeDto);
        tree.setPlantedOn(new Date(System.currentTimeMillis() - TimeUnit.MILLISECONDS.convert(365, TimeUnit.DAYS)));
        tree.setSubmittedOn(new Date());
        _treeService.save(tree);

        Co2Dto co2Dto = _co2Service.getGetCo2OfAllTrees();
        assertThat(co2Dto.getCo2()).isEqualTo(5.787037037037037E-8);
        assertThat(co2Dto.getTreesCount()).isEqualTo(10);
    }
}
