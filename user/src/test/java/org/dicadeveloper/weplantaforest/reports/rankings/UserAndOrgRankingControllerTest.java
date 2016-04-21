package org.dicadeveloper.weplantaforest.reports.rankings;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import java.util.Date;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.testsupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.trees.Tree;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.dicadeveloper.weplantaforest.trees.User;
import org.dicadeveloper.weplantaforest.trees.UserRepository;
import org.dicadeveloper.weplantaforest.treetypes.TreeType;
import org.dicadeveloper.weplantaforest.treetypes.TreeTypeRepository;
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
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@SpringApplicationConfiguration(classes = WeplantaforestApplication.class)
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class UserAndOrgRankingControllerTest {

    private MockMvc mockMvc;

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private WebApplicationContext wac;

    @Autowired
    private UserRepository _uUserRepository;

    @Autowired
    private TreeTypeRepository _treeTypeRepository;

    @Autowired
    private TreeRepository _treeRepository;

    @Before
    public void setup() {
        this.mockMvc = webAppContextSetup(this.wac).build();
    }

    @Test
    public void testGetBestUser() throws Exception {
        TreeType treeTypeDto = new TreeType();
        treeTypeDto.setName("wood");
        treeTypeDto.setDescription("description");
        treeTypeDto.setAnnualCo2SavingInTons(0.5);
        _treeTypeRepository.save(treeTypeDto);

        User userDto = new User();
        userDto.setName("Bert");
        _uUserRepository.save(userDto);

        long timeOfPlanting = System.currentTimeMillis();
        Tree tree = new Tree();
        tree.setLatitude(0);
        tree.setLongitude(0);
        tree.setAmount(10);
        tree.setTreeType(treeTypeDto);
        tree.setPlantedOn(new Date(timeOfPlanting).getTime());
        tree.setSubmittedOn(new Date(timeOfPlanting).getTime());
        tree.setOwner(userDto);
        _treeRepository.save(tree);

        this.mockMvc.perform(get("/ranking/bestUser/{pageNr}/{pageSize}", 0, 4).accept("application/json")).andExpect(status().isOk()).andExpect(jsonPath("$.content[0].name").value("Bert"))
                .andExpect(jsonPath("$.content[0].amount").value(10)).andExpect(jsonPath("$.content[0].co2Saved").exists());
    }

}
