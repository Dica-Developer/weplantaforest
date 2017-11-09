package org.dicadeveloper.weplantaforest.team;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import static org.assertj.core.api.Assertions.assertThat;

import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.common.testSupport.TestUtil;
import org.dicadeveloper.weplantaforest.security.TokenAuthenticationService;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.dicadeveloper.weplantaforest.user.User;
import org.dicadeveloper.weplantaforest.user.UserRepository;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@SpringBootTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_CLASS)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class TeamControllerTest {

	private static MockMvc mockMvc;

	@Rule
	@Autowired
	public CleanDbRule _cleanDbRule;

	@Autowired
	private DbInjecter _dbInjecter;

	@Autowired
	private WebApplicationContext webApplicationContext;

	@Autowired
	private UserRepository _userRepository;

	@Autowired
	private TokenAuthenticationService _tokenAuthenticationService;

	static boolean entitiesInjected = false;

	@Before
	public void setUp() {
		if (!entitiesInjected) {
			mockMvc = webAppContextSetup(this.webApplicationContext).build();

			_dbInjecter.injectUser("TeamLeader");
			_dbInjecter.injectUser("TeamMember");

			entitiesInjected = true;
		}
	}

	@Test
	@Rollback(false)
	public void testACreateTeam() throws Exception {
		String userToken = _tokenAuthenticationService.getTokenFromUser(_userRepository.findByName("TeamLeader"));
		Team team = new Team();
		team.setTimeStamp(System.currentTimeMillis());
		team.setName("new team");

		mockMvc.perform(post(Uris.TEAM_CREATE).contentType(TestUtil.APPLICATION_JSON_UTF8)
				.content(TestUtil.convertObjectToJsonBytes(team)).accept("application/json")
				.header("X-AUTH-TOKEN", userToken)).andExpect(status().isOk());
	}

	@Test
	@Rollback(false)
	public void testBCreateFailsCauseOfAlreadyExistingTeamName() throws Exception {
		String userToken = _tokenAuthenticationService.getTokenFromUser(_userRepository.findByName("TeamLeader"));
		Team team = new Team();
		team.setTimeStamp(System.currentTimeMillis());
		team.setName("new team");

		mockMvc.perform(post(Uris.TEAM_CREATE).contentType(TestUtil.APPLICATION_JSON_UTF8)
				.content(TestUtil.convertObjectToJsonBytes(team)).accept("application/json")
				.header("X-AUTH-TOKEN", userToken)).andExpect(status().isBadRequest())
				.andExpect(jsonPath("$.errorInfos[0].errorCode").value("TEAM_NAME_ALREADY_EXISTS"));
	}

	@Test
	public void testCCreateFailCauseOfMissingAuthentication() throws Exception {
		String userToken = "wrong_user_token";
		Team team = new Team();
		team.setTimeStamp(System.currentTimeMillis());
		team.setName("new team");

		mockMvc.perform(post(Uris.TEAM_CREATE).contentType(TestUtil.APPLICATION_JSON_UTF8)
				.content(TestUtil.convertObjectToJsonBytes(team)).accept("application/json")
				.header("X-AUTH-TOKEN", userToken)).andExpect(status().isForbidden());

	}
	
	@Test
	@Rollback(false)
	public void testDJoinTeam() throws Exception {
		User user = _userRepository.findByName("TeamMember");
		String userToken = _tokenAuthenticationService.getTokenFromUser(user);
		assertThat(user.getTeam()).isNull();
		
		mockMvc.perform(post(Uris.TEAM_JOIN).contentType(TestUtil.APPLICATION_JSON_UTF8)
				.param("teamId", "1").accept("application/json")
				.header("X-AUTH-TOKEN", userToken)).andExpect(status().isOk());
		
		user = _userRepository.findByName("TeamMember");
		assertThat(user.getTeam()).isNotNull();
		assertThat(user.getTeam().getName()).isEqualTo("new team");
	}
	
	@Test
	@Rollback(false)
	public void testELeaveTeam() throws Exception {
		User user = _userRepository.findByName("TeamMember");
		String userToken = _tokenAuthenticationService.getTokenFromUser(user);
		assertThat(user.getTeam()).isNotNull();
		assertThat(user.getTeam().getName()).isEqualTo("new team");

		mockMvc.perform(post(Uris.TEAM_LEAVE).contentType(TestUtil.APPLICATION_JSON_UTF8).accept("application/json")
				.header("X-AUTH-TOKEN", userToken)).andExpect(status().isOk());

		user = _userRepository.findByName("TeamMember");
		assertThat(user.getTeam()).isNull();
	}

}
