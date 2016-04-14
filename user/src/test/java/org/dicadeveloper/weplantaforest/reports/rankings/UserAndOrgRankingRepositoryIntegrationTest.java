package org.dicadeveloper.weplantaforest.reports.rankings;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Date;

import org.assertj.core.data.Offset;
import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.testsupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.dicadeveloper.weplantaforest.trees.User;
import org.dicadeveloper.weplantaforest.trees.UserRepository;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = WeplantaforestApplication.class)
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class UserAndOrgRankingRepositoryIntegrationTest {

    private static final Offset<Double> OK_DELTA_FOR_CO2_SAVING = Offset.offset(0.000001D);

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private UserAndOrgRankingRepository _rankingRepository;

    @Autowired
    private UserRepository _userRepository;

    @Autowired
    private DbInjecter dbInjecter;

    @Test
    public void testGetBestUser() {
        long timeOfPlanting = System.currentTimeMillis();

        dbInjecter.injectUser("Bert");
        dbInjecter.injectUser("Horst");
        dbInjecter.injectUser("Franz");

        dbInjecter.injectTreeType("wood", "desc", 0.5);

        dbInjecter.injectTree("wood", "Bert", 10, timeOfPlanting);
        dbInjecter.injectTree("wood", "Horst", 5, timeOfPlanting);
        dbInjecter.injectTree("wood", "Franz", 1, timeOfPlanting);

        final PageRequest page1 = new PageRequest(0, 20);
        Page<User> bestUser = _rankingRepository.findBestUser(page1);

        assertThat(bestUser).isNotNull();
        assertThat(bestUser.getContent().get(0).getName()).isEqualTo("Bert");
        assertThat(bestUser.getContent().get(1).getName()).isEqualTo("Horst");
        assertThat(bestUser.getContent().get(2).getName()).isEqualTo("Franz");

    }

    @Test
    public void testGetLastCreatedUser() {
        dbInjecter.injectUser("Bert", 30000L);
        dbInjecter.injectUser("Horst", 20000L);
        dbInjecter.injectUser("Franz", 10000L);

        final PageRequest page1 = new PageRequest(0, 20);
        Page<User> user = _rankingRepository.findLastCreatedUser(page1);

        assertThat(user).isNotNull();
        assertThat(user.getTotalElements()).isEqualTo(3);
        assertThat(user.getContent().get(0).getName()).isEqualTo("Bert");
        assertThat(user.getContent().get(1).getName()).isEqualTo("Horst");
        assertThat(user.getContent().get(2).getName()).isEqualTo("Franz");
    }

    @Test
    public void testGetAmountOfTreesFromUser() {
        long timeOfPlanting = System.currentTimeMillis();

        dbInjecter.injectUser("Bert");
        dbInjecter.injectUser("Horst");
        dbInjecter.injectUser("Franz");

        dbInjecter.injectTreeType("wood", "desc", 0.5);

        dbInjecter.injectTree("wood", "Bert", 10, timeOfPlanting);
        dbInjecter.injectTree("wood", "Horst", 5, timeOfPlanting);
        dbInjecter.injectTree("wood", "Franz", 1, timeOfPlanting);

        Long amount1 = _rankingRepository.getAmountOfTrees(_userRepository.findByName("Bert"));
        Long amount2 = _rankingRepository.getAmountOfTrees(_userRepository.findByName("Horst"));
        Long amount3 = _rankingRepository.getAmountOfTrees(_userRepository.findByName("Franz"));

        assertThat(amount1).isNotNull();
        assertThat(amount1).isEqualTo(10);
        assertThat(amount2).isEqualTo(5);
        assertThat(amount3).isEqualTo(1);
    }

    @Test
    public void testGetC02SavingFromUser() {
        long timeOfPlanting = new Date(0).getTime();
        dbInjecter.injectUser("Bert");
        dbInjecter.injectUser("Horst");
        dbInjecter.injectUser("Franz");

        dbInjecter.injectTreeType("wood", "desc", 0.1);

        dbInjecter.injectTree("wood", "Bert", 10, timeOfPlanting);
        dbInjecter.injectTree("wood", "Horst", 5, timeOfPlanting);
        dbInjecter.injectTree("wood", "Franz", 1, timeOfPlanting);

        Double co2DtoFranz = _rankingRepository.getCo2SavingFromUser(1207077022876l, _userRepository.findByName("Franz"));
        Double co2DtoHorst = _rankingRepository.getCo2SavingFromUser(1207077022876l, _userRepository.findByName("Horst"));
        Double co2DtoBert = _rankingRepository.getCo2SavingFromUser(1207077022876l, _userRepository.findByName("Bert"));

        assertThat(co2DtoFranz).isEqualTo(3.8276161874139056D, OK_DELTA_FOR_CO2_SAVING);
        assertThat(co2DtoHorst).isEqualTo(5 * 3.8276161874139056D, OK_DELTA_FOR_CO2_SAVING);
        assertThat(co2DtoBert).isEqualTo(10 * 3.8276161874139056D, OK_DELTA_FOR_CO2_SAVING);
    }

}
