package org.dicadeveloper.weplantaforest.reports.rankings;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.dicadeveloper.weplantaforest.common.support.TimeConstants;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.dicadeveloper.weplantaforest.user.OrganizationType;
import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_CLASS)
public class RankingRepositoryIntegrationTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    public DbInjecter _dbInjecter;

    @Autowired
    private RankingRepository _rankingRepository;

    @Autowired
    private TreeRepository _treeRepository;

    static boolean entitiesInjected = false;
    static long timeOfPlanting;

    @Before
    public void setup() {
        if (!entitiesInjected) {
            timeOfPlanting = System.currentTimeMillis();

            _dbInjecter.injectTreeType("wood", "desc", 0.5);

            _dbInjecter.injectUser("Adam", 90000L);
            _dbInjecter.injectUser("Bert", 70000L);
            _dbInjecter.injectUser("Claus", 60000L);
            _dbInjecter.injectUser("Dirk", 50000L);
            _dbInjecter.injectUser("Adam2", 40000L);
            _dbInjecter.injectUser("Bert2", 30000L);
            _dbInjecter.injectUser("Claus2", 20000L);
            _dbInjecter.injectUser("Dirk2", 10000L);
            _dbInjecter.injectUser("Adam3", 10000L);
            _dbInjecter.injectUser("Bert3", 10000L);
            _dbInjecter.injectUser("Claus3", 10000L);
            _dbInjecter.injectUser("Dirk3", 10000L);

            _dbInjecter.injectUser("money company", 10000L, OrganizationType.COMMERCIAL);
            _dbInjecter.injectUser("no money company", 10000L, OrganizationType.NONPROFIT);
            _dbInjecter.injectUser("hogwarts", 10000L, OrganizationType.EDUCATIONAL);

            _dbInjecter.injectProject("Project", "Adam", "very n1 project", true, 0, 0);

            _dbInjecter.injectProjectArticle("wood", "Project", 3.0);

            entitiesInjected = true;
        }
    }

    @After
    public void clearTreeTable() {
        _treeRepository.deleteAll();
    }

    @Test
    public void testGetBestUserRanking() {
        _dbInjecter.injectTree("wood", "Adam", 100, timeOfPlanting);
        _dbInjecter.injectTree("wood", "Bert", 80, timeOfPlanting);
        _dbInjecter.injectTree("wood", "Claus", 50, timeOfPlanting);
        _dbInjecter.injectTree("wood", "Dirk", 10, timeOfPlanting);

        Page<TreeRankedUserData> ruList = _rankingRepository.getBestUser(timeOfPlanting + TimeConstants.YEAR_IN_MILLISECONDS, new PageRequest(0, 5));

        assertThat(ruList).isNotNull();
        assertThat(ruList.getTotalElements()).isEqualTo(4);
        assertThat(ruList.getTotalPages()).isEqualTo(1);
        assertThat(ruList.getContent()
                         .size()).isEqualTo(4);
        assertThat(ruList.getContent()
                         .get(0)
                         .getName()).isEqualTo("Adam");
        assertThat(ruList.getContent()
                         .get(0)
                         .getAmount()).isEqualTo(100);
        assertThat(ruList.getContent()
                         .get(0)
                         .getCo2Saved()).isEqualTo(50);
    }

    @Test
    public void testGetLastUserRanking() {
        List<TimeRankedUserData> ruList = _rankingRepository.getLastCreatedUser(new PageRequest(0, 10));

        assertThat(ruList).isNotNull();
        assertThat(ruList.size()).isEqualTo(10);
        assertThat(ruList.get(0)
                         .getName()).isEqualTo("Adam");
        assertThat(ruList.get(0)
                         .getDate()).isEqualTo("01.01.1970");
        assertThat(ruList.get(0)
                         .getTime()).isEqualTo("00:01:30");
    }

    @Test
    public void testGetBestOrganizationTypeRanking() {
        _dbInjecter.injectTree("wood", "Adam", 100, timeOfPlanting);
        _dbInjecter.injectTree("wood", "Bert", 80, timeOfPlanting);
        _dbInjecter.injectTree("wood", "money company", 50, timeOfPlanting);
        _dbInjecter.injectTree("wood", "no money company", 10, timeOfPlanting);
        _dbInjecter.injectTree("wood", "hogwarts", 10, timeOfPlanting);

        Page<TreeRankedUserData> privateList = _rankingRepository.getBestUserFromOrganizationType(timeOfPlanting + TimeConstants.YEAR_IN_MILLISECONDS, OrganizationType.PRIVATE, new PageRequest(0, 5));

        assertThat(privateList).isNotNull();
        assertThat(privateList.getTotalElements()).isEqualTo(2);
        assertThat(privateList.getTotalPages()).isEqualTo(1);
        assertThat(privateList.getContent()
                              .size()).isEqualTo(2);
        assertThat(privateList.getContent()
                              .get(0)
                              .getName()).isEqualTo("Adam");
        assertThat(privateList.getContent()
                              .get(0)
                              .getAmount()).isEqualTo(100);
        assertThat(privateList.getContent()
                              .get(0)
                              .getCo2Saved()).isEqualTo(50);
    }

    @Test
    public void testGetLastPlantedTrees() {
        _dbInjecter.injectTreeToProject("wood", "Adam", 9, 900000L, "Project");
        _dbInjecter.injectTreeToProject("wood", "Bert", 8, 800000L, "Project");
        _dbInjecter.injectTreeToProject("wood", "Claus", 7, 700000L, "Project");
        _dbInjecter.injectTreeToProject("wood", "Adam", 6, 600000L, "Project");
        _dbInjecter.injectTreeToProject("wood", "Bert", 5, 500000L, "Project");
        _dbInjecter.injectTreeToProject("wood", "Claus", 4, 400000L, "Project");
        _dbInjecter.injectTreeToProject("wood", "Adam", 3, 300000L, "Project");
        _dbInjecter.injectTreeToProject("wood", "Bert", 2, 200000L, "Project");
        _dbInjecter.injectTreeToProject("wood", "Claus", 1, 100000L, "Project");
        _dbInjecter.injectTreeToProject("wood", "Adam", 1, 100000L, "Project");
        _dbInjecter.injectTreeToProject("wood", "Bert", 1, 100000L, "Project");
        _dbInjecter.injectTreeToProject("wood", "Claus", 1, 100000L, "Project");

        Page<TimeRankedTreeData> treeList = _rankingRepository.getLastPlantedTrees(new PageRequest(0, 10));

        assertThat(treeList).isNotNull();
        assertThat(treeList.getContent().size()).isEqualTo(10);
        assertThat(treeList.getContent().get(0)
                           .getName()).isEqualTo("Adam");
        assertThat(treeList.getContent().get(0)
                           .getAmount()).isEqualTo(9);
        assertThat(treeList.getContent().get(0)
                           .getPlantedOn()).isEqualTo(900000L);
    }

    @Test
    public void testGetBestTeams() {
        _dbInjecter.injectTeam("avengers", "Adam");

        _dbInjecter.addUserToTeam("avengers", "Bert");

        _dbInjecter.injectTree("wood", "Adam", 100, timeOfPlanting);
        _dbInjecter.injectTree("wood", "Bert", 80, timeOfPlanting);
        _dbInjecter.injectTree("wood", "Claus", 80, timeOfPlanting);

        Page<TreeRankedUserData> treeList = _rankingRepository.getBestTeams(timeOfPlanting + TimeConstants.YEAR_IN_MILLISECONDS, new PageRequest(0, 5));

        assertThat(treeList).isNotNull();
        assertThat(treeList.getTotalElements()).isEqualTo(1);
        assertThat(treeList.getTotalPages()).isEqualTo(1);
        assertThat(treeList.getContent()
                           .size()).isEqualTo(1);
        assertThat(treeList.getContent()
                           .get(0)
                           .getName()).isEqualTo("avengers");
        assertThat(treeList.getContent()
                           .get(0)
                           .getAmount()).isEqualTo(180);
        assertThat(treeList.getContent()
                           .get(0)
                           .getCo2Saved()).isEqualTo(90);

    }

    @Test
    public void testGetBestUserFromTimeRange() {
        long timeOfPlantingTwoWeeksBefore = timeOfPlanting - (2 * TimeConstants.WEEK_IN_MILLISECONDS);

        long timeOfOneWeekBefore = timeOfPlanting - TimeConstants.WEEK_IN_MILLISECONDS;
        long timeOfOneYearBefore = timeOfPlanting - TimeConstants.YEAR_IN_MILLISECONDS;

        _dbInjecter.injectTreeToProject("wood", "Adam", 3, timeOfPlanting, "Project");
        _dbInjecter.injectTreeToProject("wood", "Bert", 1, timeOfPlanting, "Project");
        _dbInjecter.injectTreeToProject("wood", "Bert", 1, timeOfPlanting, "Project");
        _dbInjecter.injectTreeToProject("wood", "Adam", 1, timeOfPlantingTwoWeeksBefore, "Project");
        _dbInjecter.injectTreeToProject("wood", "Claus", 1, timeOfPlantingTwoWeeksBefore, "Project");

        List<TreeRankedUserData> lastWeekList = _rankingRepository.getBestUserFromTimeRange(timeOfOneWeekBefore, timeOfPlanting, new PageRequest(0, 5));

        assertThat(lastWeekList).isNotNull();
        assertThat(lastWeekList.size()).isEqualTo(2);
        assertThat(lastWeekList.get(0)
                               .getName()).isEqualTo("Adam");
        assertThat(lastWeekList.get(0)
                               .getAmount()).isEqualTo(3);
        assertThat(lastWeekList.get(1)
                               .getName()).isEqualTo("Bert");
        assertThat(lastWeekList.get(1)
                               .getAmount()).isEqualTo(2);

        List<TreeRankedUserData> lastYearList = _rankingRepository.getBestUserFromTimeRange(timeOfOneYearBefore, timeOfPlanting, new PageRequest(0, 5));

        assertThat(lastYearList).isNotNull();
        assertThat(lastYearList.size()).isEqualTo(3);
        assertThat(lastYearList.get(0)
                               .getName()).isEqualTo("Adam");
        assertThat(lastYearList.get(0)
                               .getAmount()).isEqualTo(4);
        assertThat(lastYearList.get(1)
                               .getName()).isEqualTo("Bert");
        assertThat(lastYearList.get(1)
                               .getAmount()).isEqualTo(2);

    }

}
