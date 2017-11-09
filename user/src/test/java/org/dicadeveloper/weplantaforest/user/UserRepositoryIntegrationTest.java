package org.dicadeveloper.weplantaforest.user;

import static org.assertj.core.api.Assertions.assertThat;

import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.team.Team;
import org.dicadeveloper.weplantaforest.team.TeamRepository;
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
public class UserRepositoryIntegrationTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    public DbInjecter _dbInjecter;

    @Autowired
    private UserRepository _userRepository;

    @Autowired
    private TeamRepository _teamRepository;

    @Test
    public void testIfUserExistsToFalse() {
        long exists = _userRepository.userExists("Adam");
        assertThat(exists).isEqualTo(0);
    }

    @Test
    public void testIfUserExistsToTrue() {
        _dbInjecter.injectUser("Adam");
        long exists = _userRepository.userExists("Adam");
        assertThat(exists).isEqualTo(1);
    }

    @Test
    public void testGetUserDetailsWithTeam() {
        _dbInjecter.injectUser("Adam", 100000L, OrganizationType.PRIVATE);
        _dbInjecter.injectUser("Bert");

        User adam = _userRepository.findOne(1L);

        Team team = new Team();
        team.setName("team");
        team.setAdmin(_userRepository.findOne(2L));
        _teamRepository.save(team);
        adam.setTeam(team);
        _userRepository.save(adam);

        UserReportData userDetails = _userRepository.getUserDetails("Adam");
        assertThat(userDetails.userName).isEqualTo("Adam");
        assertThat(userDetails.teamName).isEqualTo("team");
    }
    
    @Test
    public void testGetUserDetailsWithoutTeam() {
        _dbInjecter.injectUser("Adam", 100000L, OrganizationType.PRIVATE);

        UserReportData userDetails = _userRepository.getUserDetails("Adam");
        assertThat(userDetails.userName).isEqualTo("Adam");
        assertThat(userDetails.teamName).isEqualTo("");
    }

}
