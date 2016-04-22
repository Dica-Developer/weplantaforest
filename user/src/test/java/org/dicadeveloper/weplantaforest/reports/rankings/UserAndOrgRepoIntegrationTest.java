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
public class UserAndOrgRepoIntegrationTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    public DbInjecter _dbInjecter;

    @Autowired
    private UserAndOrgRankingRepository userAndOrgRankingRepo;

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

        Page<RankedUser> ruList = userAndOrgRankingRepo.getBestUser(System.currentTimeMillis(), new PageRequest(0, 5));

        assertThat(ruList).isNotNull();
        assertThat(ruList.getTotalElements()).isEqualTo(4);
        assertThat(ruList.getTotalPages()).isEqualTo(1);
        assertThat(ruList.getContent().size()).isEqualTo(4);
        assertThat(ruList.getContent().get(0).getName()).isEqualTo("Adam");
        assertThat(ruList.getContent().get(0).getAmount()).isEqualTo(100);
        assertThat(ruList.getContent().get(0).getCo2Saved()).isGreaterThan(0);
    }
}
