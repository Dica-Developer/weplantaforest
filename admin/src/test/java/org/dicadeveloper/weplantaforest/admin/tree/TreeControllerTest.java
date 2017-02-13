package org.dicadeveloper.weplantaforest.admin.tree;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import org.dicadeveloper.weplantaforest.admin.WeplantaforestAdminApplication;
import org.dicadeveloper.weplantaforest.admin.security.TokenAuthenticationService;
import org.dicadeveloper.weplantaforest.admin.support.Uris;
import org.dicadeveloper.weplantaforest.admin.testSupport.DbInjecter;
import org.dicadeveloper.weplantaforest.admin.user.UserRepository;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.common.testSupport.TestUtil;
import org.junit.Before;
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
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@SpringApplicationConfiguration(classes = WeplantaforestAdminApplication.class)
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
@Transactional
public class TreeControllerTest {
    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private DbInjecter _dbInjecter;

    @Autowired
    private TreeRepository _treeRepository;
    
    @Autowired
    private TokenAuthenticationService _tokenAuthenticationService;

    @Autowired
    private UserRepository _userRepository;
    

    @Before
    public void setup() {
        mockMvc = webAppContextSetup(this.webApplicationContext).build();
        
    }

    @Test
    public void testPlantTreeForUser() throws Exception {
        _dbInjecter.injectUser("Adam");
        _dbInjecter.injectTreeType("wood", "wood desc", 0.5);

        _dbInjecter.injectProject("project", "Adam", "project desc", true, 1.0f, 1.0f);
        _dbInjecter.injectProjectArticle("wood", "project", 100, 1.0, 0.5);
        String userToken = _tokenAuthenticationService.getTokenFromUser(_userRepository.findOne(1L));
       
        mockMvc.perform(post(Uris.PLANT_FOR_USER).header("X-AUTH-TOKEN", userToken).contentType(TestUtil.APPLICATION_JSON_UTF8)
                                                    .param("userId", "1")
                                                    .param("projectArticleId", "1")
                                                    .param("amount", "10"))
               .andExpect(status().isOk());
        assertThat(_treeRepository.count()).isEqualTo(1);

        Tree plantedTreeForUser = _treeRepository.findOne(1L);

        assertThat(plantedTreeForUser.getOwner()
                                     .getName()).isEqualTo("Adam");
        assertThat(plantedTreeForUser.getProjectArticle()
                                     .getTreeType()
                                     .getName()).isEqualTo("wood");
        assertThat(plantedTreeForUser.getAmount()).isEqualTo(10);

    }
    
    @Test
    public void testPlantTreeForUserBadRequestCauseOfWrongProjectArticleId() throws Exception {
        _dbInjecter.injectUser("Adam");
        _dbInjecter.injectTreeType("wood", "wood desc", 0.5);

        _dbInjecter.injectProject("project", "Adam", "project desc", true, 1.0f, 1.0f);
        _dbInjecter.injectProjectArticle("wood", "project", 100, 1.0, 0.5);
        String userToken = _tokenAuthenticationService.getTokenFromUser(_userRepository.findOne(1L));
        
        mockMvc.perform(post(Uris.PLANT_FOR_USER).header("X-AUTH-TOKEN", userToken).contentType(TestUtil.APPLICATION_JSON_UTF8)
                                                    .param("userId", "1")
                                                    .param("projectArticleId", "2")
                                                    .param("amount", "10"))
               .andExpect(status().isBadRequest());
    }
    
    @Test
    public void testPlantTreeForUserBadRequestCauseOfNotEnoughTreesRemaining() throws Exception {
        _dbInjecter.injectUser("Adam");
        _dbInjecter.injectTreeType("wood", "wood desc", 0.5);

        _dbInjecter.injectProject("project", "Adam", "project desc", true, 1.0f, 1.0f);
        _dbInjecter.injectProjectArticle("wood", "project", 100, 1.0, 0.5);
        _dbInjecter.injectTreeToProject("wood", "Adam", 91, System.currentTimeMillis(), "project");
        String userToken = _tokenAuthenticationService.getTokenFromUser(_userRepository.findOne(1L));
        
        mockMvc.perform(post(Uris.PLANT_FOR_USER).header("X-AUTH-TOKEN", userToken).contentType(TestUtil.APPLICATION_JSON_UTF8)
                                                    .param("userId", "1")
                                                    .param("projectArticleId", "1")
                                                    .param("amount", "10"))
               .andExpect(status().isBadRequest());
    }
}
