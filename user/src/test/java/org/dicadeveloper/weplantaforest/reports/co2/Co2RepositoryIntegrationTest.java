package org.dicadeveloper.weplantaforest.reports.co2;

import static org.assertj.core.api.Assertions.assertThat;

import org.dicadeveloper.weplantaforest.common.support.TimeConstants;
import org.dicadeveloper.weplantaforest.common.testsupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class Co2RepositoryIntegrationTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    public DbInjecter _dbInjecter;

    @Autowired
    private Co2Repository _co2Repository;

    @Test
    public void testGetCo2OfAllTrees_NoTimeForSavingCo2() {
        long timeOfPlanting = System.currentTimeMillis();

        _dbInjecter.injectTreeType("wood", "desc", 0.5);
        _dbInjecter.injectUser("Bert");
        _dbInjecter.injectTree("wood", "Bert", 10, timeOfPlanting);

        Co2Data co2 = _co2Repository.getAllTreesAndCo2Saving(timeOfPlanting);
        assertThat(co2.getTreesCount()).isEqualTo(10);
        assertThat(co2.getCo2()).isEqualTo(0.0);
    }

    /**
     * Same test as in TreeDaoImplTest.getCo2SavingByPlantingForPointInTime().
     */
    @Test
    public void testGetCo2SavingByPlantingForPointInTime() {
        long timeOfPlanting = System.currentTimeMillis();
        _dbInjecter.injectTreeType("wood", "desc", 0.1);
        _dbInjecter.injectUser("Bert");
        _dbInjecter.injectTree("wood", "Bert", 1, timeOfPlanting);

        Co2Data co2 = _co2Repository.getAllTreesAndCo2Saving(timeOfPlanting + TimeConstants.YEAR_IN_MILLISECONDS);

        assertThat(co2.getTreesCount()).isEqualTo(1);
        assertThat(co2.getCo2()).isEqualTo(0.1);
    }

    @Test
    public void testGetCo2SavingByPlantingForPointInTimeForUserName() {
        long timeOfPlanting = System.currentTimeMillis();
        _dbInjecter.injectTreeType("wood", "desc", 0.1);
        _dbInjecter.injectUser("Adam");
        _dbInjecter.injectUser("Bert");

        _dbInjecter.injectTree("wood", "Adam", 1, timeOfPlanting);
        _dbInjecter.injectTree("wood", "Bert", 1, timeOfPlanting);

        Co2Data co2 = _co2Repository.getAllTreesAndCo2SavingForUserName(timeOfPlanting + TimeConstants.YEAR_IN_MILLISECONDS, "Adam");

        assertThat(co2.getTreesCount()).isEqualTo(1);
        assertThat(co2.getCo2()).isEqualTo(0.1);
    }

    @Test
    public void testGetCo2SavingForUserWithoutTrees() {
        long timeOfPlanting = System.currentTimeMillis();
        _dbInjecter.injectUser("Adam");
        Co2Data co2 = _co2Repository.getAllTreesAndCo2SavingForUserName(timeOfPlanting + TimeConstants.YEAR_IN_MILLISECONDS, "Adam");

        assertThat(co2.getTreesCount()).isEqualTo(0);
        assertThat(co2.getCo2()).isEqualTo(0.0);
    }
}
