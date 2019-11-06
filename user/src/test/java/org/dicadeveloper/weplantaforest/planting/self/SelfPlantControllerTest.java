package org.dicadeveloper.weplantaforest.planting.self;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import javax.transaction.Transactional;

import org.dicadeveloper.weplantaforest.common.support.TimeConstants;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.common.testSupport.TestUtil;
import org.dicadeveloper.weplantaforest.security.TokenAuthenticationService;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.dicadeveloper.weplantaforest.trees.Tree;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.dicadeveloper.weplantaforest.user.UserRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
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
@Transactional
public class SelfPlantControllerTest {

    private static MockMvc mockMvc;

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private DbInjecter dbInjecter;

    @Autowired
    private TreeRepository _treeRepository;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private TokenAuthenticationService _tokenAuthenticationService;

    @Autowired
    private UserRepository _userRepository;

    static long timeOfPlanting;
    static boolean entitiesInjected = false;

    @Before
    public void setup() {
        if (!entitiesInjected) {
            mockMvc = webAppContextSetup(this.webApplicationContext).build();
            timeOfPlanting = System.currentTimeMillis() - TimeConstants.YEAR_IN_MILLISECONDS;

            dbInjecter.injectUser("Adam");
            dbInjecter.injectTreeType("wood", "this is wood", 0.5);

            entitiesInjected = true;
        }
    }

    @After
    public void clear() {
        _treeRepository.deleteAll();
    }

    @Test
    @Rollback(false)
    public void testSelfPlantStatusOk() throws Exception {
        SelfPlantData selfPlantData = new SelfPlantData();
        String userToken = _tokenAuthenticationService.getTokenFromUser(_userRepository.findById(1L).orElse(null));

        // selfPlantData.setOwner("Adam");
        selfPlantData.setPlantedOn(timeOfPlanting);
        selfPlantData.setAmount(10);
        selfPlantData.setTreeTypeId(1L);
        selfPlantData.setDescription("I planted a tree by myself in my garden.");
        selfPlantData.setLongitude(1.0f);
        selfPlantData.setLatitude(2.0f);

        mockMvc.perform(post("/plantSelf").contentType(TestUtil.APPLICATION_JSON_UTF8)
                                          .header("X-AUTH-TOKEN", userToken)
                                          .content(TestUtil.convertObjectToJsonBytes(selfPlantData)))
               .andExpect(status().isOk());

        long timeNow = System.currentTimeMillis();
        assertThat(_treeRepository.count()).isEqualTo(1L);

        Tree savedTree = _treeRepository.findById(1L).orElse(null);

        assertThat(savedTree.getAmount()).isEqualTo(10);
        assertThat(savedTree.getLongitude()).isEqualTo(1.0f);
        assertThat(savedTree.getLatitude()).isEqualTo(2.0f);
        assertThat(savedTree.getPlantedOn()).isEqualTo(timeOfPlanting);
        assertThat(savedTree.getSubmittedOn()).isStrictlyBetween(timeNow - 10000, timeNow + 10000);
        assertThat(savedTree.getDescription()).isEqualTo("I planted a tree by myself in my garden.");
        assertThat(savedTree.getOwner()
                            .getName()).isEqualTo("Adam");
        assertThat(savedTree.getTreeType()
                            .getName()).isEqualTo("wood");

    }

    @Test
    @Rollback(false)
    public void testSelfPlantStatusBadRequestCauseOfAmountHigherTen() throws Exception {
        SelfPlantData selfPlantData = new SelfPlantData();

        // selfPlantData.setOwner("Adam");
        selfPlantData.setPlantedOn(timeOfPlanting);
        selfPlantData.setAmount(11);
        selfPlantData.setTreeTypeId(1L);
        selfPlantData.setDescription("I planted a tree by myself in my garden.");
        selfPlantData.setLongitude(1.0f);
        selfPlantData.setLatitude(2.0f);

        mockMvc.perform(post("/plantSelf").contentType(TestUtil.APPLICATION_JSON_UTF8)
                                          .content(TestUtil.convertObjectToJsonBytes(selfPlantData)))
               .andExpect(status().isBadRequest());

        assertThat(_treeRepository.count()).isEqualTo(0);
    }

    @Test
    @Rollback(false)
    public void testSelfPlantStatusBadRequestCauseOfAmountLowerOne() throws Exception {
        SelfPlantData selfPlantData = new SelfPlantData();

        // selfPlantData.setOwner("Adam");
        selfPlantData.setPlantedOn(timeOfPlanting);
        selfPlantData.setAmount(0);
        selfPlantData.setTreeTypeId(1L);
        selfPlantData.setDescription("I planted a tree by myself in my garden.");
        selfPlantData.setLongitude(1.0f);
        selfPlantData.setLatitude(2.0f);

        mockMvc.perform(post("/plantSelf").contentType(TestUtil.APPLICATION_JSON_UTF8)
                                          .content(TestUtil.convertObjectToJsonBytes(selfPlantData)))
               .andExpect(status().isBadRequest());
        assertThat(_treeRepository.count()).isEqualTo(0);
    }
}
