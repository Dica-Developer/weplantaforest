package org.dicadeveloper.weplantaforest.reports.rankings;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import org.dicadeveloper.weplantaforest.common.support.TimeConstants;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.support.Uris;
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
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@SpringBootTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_CLASS)
public class RankingControllerTest {

    private static MockMvc mockMvc;

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    public DbInjecter _dbInjecter;

    static long timeOfPlanting;
    static boolean entitiesInjected = false;

    @Autowired
    private TreeRepository _treeRepository;

    @Before
    public void setup() {
        if (!entitiesInjected) {
            timeOfPlanting = System.currentTimeMillis();
            mockMvc = webAppContextSetup(this.webApplicationContext).build();

            _dbInjecter.injectTreeType("wood", "desc", 0.5);

            _dbInjecter.injectUser("Adam", 90000L, OrganizationType.PRIVATE);
            _dbInjecter.injectUser("Bert", 70000L, OrganizationType.PRIVATE);
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
            _dbInjecter.injectUser("no money company", 10000L, OrganizationType.EDUCATIONAL);
            _dbInjecter.injectUser("hogwarts", 10000L, OrganizationType.NONPROFIT);

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
    public void testGetBestUser() throws Exception {
        _dbInjecter.injectTree("wood", "Bert", 10, timeOfPlanting);

        mockMvc.perform(get(Uris.RANKING_BEST_USER + "?page=0&size=10&lastYear=false").accept("application/json"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.content[0].name").value("Bert"))
               .andExpect(jsonPath("$.content[0].amount").value(10))
               .andExpect(jsonPath("$.content[0].co2Saved").exists());
    }

    @Test
    public void testGetLastUser() throws Exception {
        mockMvc.perform(get(Uris.RANKING_LAST_CREATED_USER).accept("application/json"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.[0].name").value("Adam"))
               .andExpect(jsonPath("$.[0].date").value("01.01.1970"))
               .andExpect(jsonPath("$.[0].time").value("00:01:30"));
    }

    @Test
    public void testGetBestOrganizationTypeRanking() throws Exception {
        _dbInjecter.injectTree("wood", "Adam", 100, timeOfPlanting);
        _dbInjecter.injectTree("wood", "Bert", 80, timeOfPlanting);
        _dbInjecter.injectTree("wood", "money company", 50, timeOfPlanting);
        _dbInjecter.injectTree("wood", "no money company", 10, timeOfPlanting);
        _dbInjecter.injectTree("wood", "hogwarts", 10, timeOfPlanting);

        mockMvc.perform(get(Uris.RANKING_BEST_ORGANIZATION_TYPE + "{organizationType}?page=0&size=10&lastYear=false", OrganizationType.PRIVATE).accept("application/json"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.totalElements").value(2))
               .andExpect(jsonPath("$.content[0].name").value("Adam"))
               .andExpect(jsonPath("$.content[0].amount").value(100))
               .andExpect(jsonPath("$.content[0].co2Saved").exists());
    }

    @Test
    public void testGetLastPlantedTrees() throws Exception {
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

        mockMvc.perform(get(Uris.RANKING_LAST_PLANTED_TREES).accept("application/json"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.[0].name").value("Adam"))
               .andExpect(jsonPath("$.[0].amount").value(9))
               .andExpect(jsonPath("$.[0].plantedOn").value(900000));
    }

    @Test
    public void testGetBestTeams() throws Exception {
        _dbInjecter.injectTeam("avengers", "Adam");
        _dbInjecter.addUserToTeam("avengers", "Dirk3");

        _dbInjecter.injectTree("wood", "Adam", 100, timeOfPlanting);
        _dbInjecter.injectTree("wood", "Dirk3", 80, timeOfPlanting);
        _dbInjecter.injectTree("wood", "Claus", 80, timeOfPlanting);

        mockMvc.perform(get(Uris.RANKING_BEST_TEAM + "?page=0&size=10&lastYear=false").accept("application/json"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.totalElements").value(1))
               .andExpect(jsonPath("$.content[0].name").value("avengers"))
               .andExpect(jsonPath("$.content[0].amount").value(180))
               .andExpect(jsonPath("$.content[0].co2Saved").exists());
    }

    @Test
    public void testGetBestUserFromTimeRange() throws Exception {
        long timeOfPlantingTwoWeeksBefore = timeOfPlanting - (2 * TimeConstants.WEEK_IN_MILLISECONDS);

        _dbInjecter.injectTreeToProject("wood", "Adam", 3, timeOfPlanting, "Project");
        _dbInjecter.injectTreeToProject("wood", "Bert", 1, timeOfPlanting, "Project");
        _dbInjecter.injectTreeToProject("wood", "Bert", 1, timeOfPlanting, "Project");
        _dbInjecter.injectTreeToProject("wood", "Adam", 1, timeOfPlantingTwoWeeksBefore, "Project");
        _dbInjecter.injectTreeToProject("wood", "Claus", 1, timeOfPlantingTwoWeeksBefore, "Project");

        mockMvc.perform(get(Uris.RANKING_BEST_USER_FOR_TIMERANGE + "{range}", "week").accept("application/json"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.[0].name").value("Adam"))
               .andExpect(jsonPath("$.[0].amount").value(3))
               .andExpect(jsonPath("$.[1].name").value("Bert"))
               .andExpect(jsonPath("$.[1].amount").value(2));

        mockMvc.perform(get(Uris.RANKING_BEST_USER_FOR_TIMERANGE + "{range}", "year").accept("application/json"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.[0].name").value("Adam"))
               .andExpect(jsonPath("$.[0].amount").value(4))
               .andExpect(jsonPath("$.[1].name").value("Bert"))
               .andExpect(jsonPath("$.[1].amount").value(2));

        mockMvc.perform(get(Uris.RANKING_BEST_USER_FOR_TIMERANGE + "{range}", "a").accept("application/json"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.[0].name").value("Adam"))
               .andExpect(jsonPath("$.[0].amount").value(4))
               .andExpect(jsonPath("$.[1].name").value("Bert"))
               .andExpect(jsonPath("$.[1].amount").value(2));

    }

}
