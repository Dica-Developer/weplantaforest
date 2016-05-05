package org.dicadeveloper.weplantaforest.reports.rankings;

import static org.assertj.core.api.Assertions.assertThat;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.testsupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
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
public class RankingRepositoryIntegrationTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    public DbInjecter _dbInjecter;

    @Autowired
    private RankingRepository _rankingRepository;

    @Test
    public void testGetBestUserRanking() {
        long timeOfPlanting = System.currentTimeMillis();

        _dbInjecter.injectTreeType("wood", "desc", 0.5);

        _dbInjecter.injectUser("Adam");
        _dbInjecter.injectUser("Bert");
        _dbInjecter.injectUser("Claus");
        _dbInjecter.injectUser("Dirk");

        _dbInjecter.injectTree("wood", "Adam", 100, timeOfPlanting);
        _dbInjecter.injectTree("wood", "Bert", 80, timeOfPlanting);
        _dbInjecter.injectTree("wood", "Claus", 50, timeOfPlanting);
        _dbInjecter.injectTree("wood", "Dirk", 10, timeOfPlanting);

        Page<TreeRankedUserData> ruList = _rankingRepository.getBestUser(System.currentTimeMillis(), new PageRequest(0, 5));

        assertThat(ruList).isNotNull();
        assertThat(ruList.getTotalElements()).isEqualTo(4);
        assertThat(ruList.getTotalPages()).isEqualTo(1);
        assertThat(ruList.getContent().size()).isEqualTo(4);
        assertThat(ruList.getContent().get(0).getName()).isEqualTo("Adam");
        assertThat(ruList.getContent().get(0).getAmount()).isEqualTo(100);
        assertThat(ruList.getContent().get(0).getCo2Saved()).isGreaterThan(0);
    }

    @Test
    public void testGetLastUserRanking() {
        _dbInjecter.injectUser("Adam", 90000L);
        _dbInjecter.injectUser("Bert", 70000L);
        _dbInjecter.injectUser("Claus", 60000L);
        _dbInjecter.injectUser("Dirk", 50000L);

        Page<TimeRankedUserData> ruList = _rankingRepository.getLastCreatedUser(new PageRequest(0, 5));

        assertThat(ruList).isNotNull();
        assertThat(ruList.getTotalElements()).isEqualTo(4);
        assertThat(ruList.getTotalPages()).isEqualTo(1);
        assertThat(ruList.getContent().size()).isEqualTo(4);
        assertThat(ruList.getContent().get(0).getName()).isEqualTo("Adam");
        assertThat(ruList.getContent().get(0).getDate()).isEqualTo("31.12.1969");
        assertThat(ruList.getContent().get(0).getTime()).isEqualTo("16:01:30");
    }

    @Test
    public void testGetBestOrganizationTypeRanking() {
        long timeOfPlanting = System.currentTimeMillis();

        _dbInjecter.injectTreeType("wood", "desc", 0.5);

        _dbInjecter.injectUser("Adam", 10000L, 0);
        _dbInjecter.injectUser("Bert", 10000L, 0);
        _dbInjecter.injectUser("money company", 10000L, 1);
        _dbInjecter.injectUser("no money company", 10000L, 2);
        _dbInjecter.injectUser("hogwarts", 10000L, 3);

        _dbInjecter.injectTree("wood", "Adam", 100, timeOfPlanting);
        _dbInjecter.injectTree("wood", "Bert", 80, timeOfPlanting);
        _dbInjecter.injectTree("wood", "money company", 50, timeOfPlanting);
        _dbInjecter.injectTree("wood", "no money company", 10, timeOfPlanting);
        _dbInjecter.injectTree("wood", "hogwarts", 10, timeOfPlanting);

        Page<TreeRankedUserData> privateList = _rankingRepository.getBestUserFromOrganizationType(System.currentTimeMillis(), 0, new PageRequest(0, 5));

        assertThat(privateList).isNotNull();
        assertThat(privateList.getTotalElements()).isEqualTo(2);
        assertThat(privateList.getTotalPages()).isEqualTo(1);
        assertThat(privateList.getContent().size()).isEqualTo(2);
        assertThat(privateList.getContent().get(0).getName()).isEqualTo("Adam");
        assertThat(privateList.getContent().get(0).getAmount()).isEqualTo(100);
        assertThat(privateList.getContent().get(0).getCo2Saved()).isGreaterThan(0);
    }

    @Test
    public void testGetLastPlantedTrees() {
        _dbInjecter.injectTreeType("wood", "desc", 0.5);
        _dbInjecter.injectTreeType("woood", "desc", 0.5);

        _dbInjecter.injectUser("Adam", 90000L);
        _dbInjecter.injectUser("Bert", 90000L);
        _dbInjecter.injectUser("Claus", 90000L);

        _dbInjecter.injectProject("Project", "Adam", "very n1 project", true, 0, 0);

        _dbInjecter.injectPlantArticle("wood", "Project", 3.0);
        _dbInjecter.injectPlantArticle("woood", "Project", 3.0);

        _dbInjecter.injectTreeToProject("wood", "Adam", 1, 800000L, "Project");
        _dbInjecter.injectTreeToProject("wood", "Bert", 5, 600000L, "Project");
        _dbInjecter.injectTreeToProject("wood", "Claus", 30, 100000L, "Project");

        Page<TimeRankedTreeData> treeList = _rankingRepository.getLastPlantedTrees(new PageRequest(0, 5));

        assertThat(treeList).isNotNull();
        assertThat(treeList.getTotalElements()).isEqualTo(3);
        assertThat(treeList.getTotalPages()).isEqualTo(1);
        assertThat(treeList.getContent().size()).isEqualTo(3);
        assertThat(treeList.getContent().get(0).getName()).isEqualTo("Adam");
        assertThat(treeList.getContent().get(0).getAmount()).isEqualTo(1);
        assertThat(treeList.getContent().get(0).getProjectName()).isEqualTo("Project");
    }
}
