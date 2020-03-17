package org.dicadeveloper.weplantaforest.admin.user;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import org.dicadeveloper.weplantaforest.admin.security.TokenAuthenticationService;
import org.dicadeveloper.weplantaforest.admin.testSupport.DbInjecter;
import org.dicadeveloper.weplantaforest.common.testsupport.CleanDbRule;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@SpringBootTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class UserControllerTest {
    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private TokenAuthenticationService _tokenAuthenticationService;

    @Autowired
    private UserRepository _userRepository;

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private DbInjecter _dbInjecter;

    @Before
    public void setup() {
        mockMvc = webAppContextSetup(this.webApplicationContext).build();
    }

    @Test
    public void testGetAllUser() throws Exception {
        _dbInjecter.injectUser("Adam");
        _dbInjecter.injectUser("Bert");
        _dbInjecter.injectUser("Claus");
        String userToken = _tokenAuthenticationService.getTokenFromUser(_userRepository.findById(1L).orElse(null));
        mockMvc.perform(get("/users").accept("application/json").header("X-AUTH-TOKEN", userToken)).andExpect(status().isOk()).andExpect(jsonPath("$.[0].name").value("Adam"))
                .andExpect(jsonPath("$.[1].name").value("Bert")).andExpect(jsonPath("$.[2].name").value("Claus"));
    }
}
