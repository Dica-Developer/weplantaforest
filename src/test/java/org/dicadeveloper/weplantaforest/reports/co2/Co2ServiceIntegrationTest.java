package org.dicadeveloper.weplantaforest.reports.co2;

import static org.fest.assertions.Assertions.assertThat;

import java.util.Date;

import org.dicadeveloper.weplantaforest.Application;
import org.dicadeveloper.weplantaforest.persist.dto.TreeDto;
import org.dicadeveloper.weplantaforest.persist.dto.TreeTypeDto;
import org.dicadeveloper.weplantaforest.persist.dto.UserDto;
import org.dicadeveloper.weplantaforest.services.TreeService;
import org.dicadeveloper.weplantaforest.services.TreeTypeService;
import org.dicadeveloper.weplantaforest.services.UserService;
import org.dicadeveloper.weplantaforest.testsupport.CleanDbRule;
import org.fest.assertions.Delta;
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

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@SpringApplicationConfiguration(classes = Application.class)
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class Co2ServiceIntegrationTest {

    /**
     * For performance reasons we shifted calculation of co2 from java to the
     * database query. There is a slight but neglectable difference in the
     * results. The expected test results are matching the java version.
     */
    private static final Delta OK_DELTA_FOR_CO2_SAVING = Delta.delta(0.000001D);

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private UserService _userService;
    @Autowired
    private TreeTypeService _treeTypeService;
    @Autowired
    private TreeService _treeService;

    @Autowired
    private Co2Service _co2Service;

    @Test
    public void testGetCo2OfAllTrees_NoTimeForSavingCo2() {
        TreeTypeDto treeTypeDto = new TreeTypeDto("wood", "description");
        treeTypeDto.setAnnualCo2SavingInTons(0.5);
        _treeTypeService.save(treeTypeDto);

        UserDto userDto = new UserDto("Bert");
        _userService.save(userDto);

        long timeOfPlanting = System.currentTimeMillis();
        TreeDto tree = new TreeDto(0, 0, 10);
        tree.setTreeType(treeTypeDto);
        tree.setPlantedOn(new Date(timeOfPlanting));
        tree.setSubmittedOn(new Date(timeOfPlanting));
        tree.setOwner(userDto);
        _treeService.save(tree);

        Co2Dto co2Dto = _co2Service.getGetCo2OfAllTrees(timeOfPlanting);
        assertThat(co2Dto.getCo2()).isEqualTo(0.0);
        assertThat(co2Dto.getTreesCount()).isEqualTo(10);
    }

    /**
     * Same test as in TreeDaoImplTest.getCo2SavingByPlantingForPointInTime().
     */
    @Test
    public void testGetCo2SavingByPlantingForPointInTime() {
        TreeTypeDto treeTypeDto = new TreeTypeDto("wood", "description");
        treeTypeDto.setAnnualCo2SavingInTons(0.1);
        _treeTypeService.save(treeTypeDto);

        UserDto userDto = new UserDto("Bert");
        _userService.save(userDto);

        TreeDto tree = new TreeDto();
        tree.setAmount(1);
        tree.setTreeType(treeTypeDto);
        tree.setPlantedOn(new Date(0));
        tree.setSubmittedOn(new Date(0));
        tree.setOwner(userDto);
        _treeService.save(tree);

        Co2Dto co2Dto = _co2Service.getGetCo2OfAllTrees(1207077022876l);
        assertThat(co2Dto.getCo2()).isEqualTo(3.8276161874139056D, OK_DELTA_FOR_CO2_SAVING);
        assertThat(co2Dto.getTreesCount()).isEqualTo(1);
    }
}
