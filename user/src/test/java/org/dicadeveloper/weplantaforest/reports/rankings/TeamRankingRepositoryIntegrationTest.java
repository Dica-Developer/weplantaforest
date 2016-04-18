package org.dicadeveloper.weplantaforest.reports.rankings;

import static org.assertj.core.api.Assertions.assertThat;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.admin.codes.Team;
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
public class TeamRankingRepositoryIntegrationTest {
    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private DbInjecter dbInjecter;

    @Autowired
    private TeamRankingRepository _teamRankingRepository;

    @Test
    public void testGetTeamsOrderedByTimeStampDesc() {
        dbInjecter.injectUser("Bert");
        dbInjecter.injectUser("Horst");

        dbInjecter.injectTeam("Bert's Team", "Bert's desc", "Bert", 30000L);
        dbInjecter.injectTeam("Horst's Team", "Horst's desc", "Horst", 50000L);

        final PageRequest page1 = new PageRequest(0, 20);
        Page<Team> projects = _teamRankingRepository.findLastCreatedTeams(page1);

        assertThat(projects).isNotNull();
        assertThat(projects.getTotalElements()).isEqualTo(2);
        assertThat(projects.getContent().get(0).getName()).isEqualTo("Horst's Team");
        assertThat(projects.getContent().get(1).getName()).isEqualTo("Bert's Team");

    }
}
