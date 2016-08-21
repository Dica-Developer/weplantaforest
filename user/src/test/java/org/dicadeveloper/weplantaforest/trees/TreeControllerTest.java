package org.dicadeveloper.weplantaforest.trees;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.common.support.TimeConstants;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@SpringApplicationConfiguration(classes = WeplantaforestApplication.class)
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_CLASS)
@Transactional
public class TreeControllerTest {
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

    static boolean entitiesInjected = false;
    
    static long timeOfPlanting;

    @Before
    public void setup() {
        if (!entitiesInjected) {
            mockMvc = webAppContextSetup(this.webApplicationContext).build();
            timeOfPlanting = System.currentTimeMillis();
            
            dbInjecter.injectUser("Adam");
            dbInjecter.injectUser("Bert");

            dbInjecter.injectTreeType("wood", "this is wood", 0.5);
            dbInjecter.injectTreeType("wood2", "this is wood", 0.5);
            dbInjecter.injectTreeType("wood3", "this is wood", 0.5);
            dbInjecter.injectTreeType("wood4", "this is wood", 0.5);
            dbInjecter.injectTreeType("wood5", "this is wood", 0.5);
            
            dbInjecter.injectProject("Project A", "Adam", "project a desc", true, 1.0f, 2.0f);
            dbInjecter.injectProject("Project B", "Bert", "project b desc", true, 3.0f, 4.0f);

            dbInjecter.injectProjectArticle("wood", "Project A", 1.0);
            dbInjecter.injectProjectArticle("wood4", "Project A", 1.0);
            dbInjecter.injectProjectArticle("wood", "Project B", 1.0);
            dbInjecter.injectProjectArticle("wood4", "Project B", 1.0);

            entitiesInjected = true;
        }
    }
    
    @After
    public void clear(){
        _treeRepository.deleteAll();
    }

    @Test
    @Rollback(false)
    public void testGetTreeById() throws Exception {
        dbInjecter.injectTree("wood", "Adam", 1, 10000);

        assertThat(_treeRepository.count()).isEqualTo(1L);

        mockMvc.perform(get((Uris.TREE + "{id}"), 1).accept("application/json"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.amount").value(1))
               .andExpect(jsonPath("$.longitude").value(0.0))
               .andExpect(jsonPath("$.latitude").value(0.0))
               .andExpect(jsonPath("$.plantedOn").value(10000))
               .andExpect(jsonPath("$.submittedOn").value(10000))
               .andExpect(jsonPath("$.description").isEmpty())
               .andExpect(jsonPath("$.owner.name").value("Adam"))
               .andExpect(jsonPath("$.treeType.name").value("wood"));
    }

    @Test
    @Rollback(false)
    public void testGetPagedTrees() throws Exception {
        dbInjecter.injectTree("wood", "Adam", 1, 10000);
        dbInjecter.injectTree("wood", "Bert", 2, 20000);

        dbInjecter.injectTree("wood2", "Adam", 3, 30000);
        dbInjecter.injectTree("wood2", "Bert", 4, 40000);

        dbInjecter.injectTree("wood3", "Adam", 5, 50000);
        dbInjecter.injectTree("wood3", "Bert", 6, 60000);

        dbInjecter.injectTree("wood4", "Adam", 7, 70000);
        dbInjecter.injectTree("wood4", "Bert", 8, 80000);

        dbInjecter.injectTree("wood5", "Adam", 9, 90000);
        dbInjecter.injectTree("wood5", "Bert", 10, 100000);

        mockMvc.perform(get(Uris.TREES + "?page=0&size=5").accept("application/json"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.totalElements").value(10))
               .andExpect(jsonPath("$.totalPages").value(2))
               .andExpect(jsonPath("$.numberOfElements").value(5))
               .andExpect(jsonPath("$.last").value(false))
               .andExpect(jsonPath("$.first").value(true))

               .andExpect(jsonPath("$.content[0].amount").value(10))
               .andExpect(jsonPath("$.content[0].submittedOn").value(100000))
               .andExpect(jsonPath("$.content[0].plantedOn").value(100000))
               .andExpect(jsonPath("$.content[0].owner.name").value("Bert"))
               .andExpect(jsonPath("$.content[0].treeType.name").value("wood5"))

               .andExpect(jsonPath("$.content[1].amount").value(9))
               .andExpect(jsonPath("$.content[1].submittedOn").value(90000))
               .andExpect(jsonPath("$.content[1].plantedOn").value(90000))
               .andExpect(jsonPath("$.content[1].owner.name").value("Adam"))
               .andExpect(jsonPath("$.content[1].treeType.name").value("wood5"))

               .andExpect(jsonPath("$.content[4].amount").value(6))
               .andExpect(jsonPath("$.content[4].submittedOn").value(60000))
               .andExpect(jsonPath("$.content[4].plantedOn").value(60000))
               .andExpect(jsonPath("$.content[4].owner.name").value("Bert"))
               .andExpect(jsonPath("$.content[4].treeType.name").value("wood3"));
    }

//    @Test
//    @Rollback(false)
//    public void testGetPagedTreesByOwnerId() throws Exception {
//        dbInjecter.injectTree("wood", "Adam", 1, 10000);
//        dbInjecter.injectTree("wood", "Bert", 2, 20000);
//
//        dbInjecter.injectTree("wood2", "Adam", 3, 30000);
//        dbInjecter.injectTree("wood2", "Bert", 4, 40000);
//
//        dbInjecter.injectTree("wood3", "Adam", 5, 50000);
//        dbInjecter.injectTree("wood3", "Bert", 6, 60000);
//
//        dbInjecter.injectTree("wood4", "Adam", 7, 70000);
//        dbInjecter.injectTree("wood4", "Bert", 8, 80000);
//
//        mockMvc.perform(get((Uris.TREES_BY_USER + "{ownerId}?page=0&size=2"), 1).accept("application/json"))
//               .andExpect(status().isOk())
//               .andExpect(jsonPath("$.totalElements").value(4))
//               .andExpect(jsonPath("$.totalPages").value(2))
//               .andExpect(jsonPath("$.numberOfElements").value(2))
//               .andExpect(jsonPath("$.last").value(false))
//               .andExpect(jsonPath("$.first").value(true))
//
//               .andExpect(jsonPath("$.content[0].amount").value(7))
//               .andExpect(jsonPath("$.content[0].submittedOn").value(70000))
//               .andExpect(jsonPath("$.content[0].plantedOn").value(70000))
//               .andExpect(jsonPath("$.content[0].owner.name").value("Adam"))
//               .andExpect(jsonPath("$.content[0].treeType.name").value("wood4"))
//
//               .andExpect(jsonPath("$.content[1].amount").value(5))
//               .andExpect(jsonPath("$.content[1].submittedOn").value(50000))
//               .andExpect(jsonPath("$.content[1].plantedOn").value(50000))
//               .andExpect(jsonPath("$.content[1].owner.name").value("Adam"))
//               .andExpect(jsonPath("$.content[1].treeType.name").value("wood3"));
//
//        mockMvc.perform(get((Uris.TREES_BY_USER + "{ownerId}?page=0&size=2"), 2).accept("application/json"))
//               .andExpect(status().isOk())
//               .andExpect(jsonPath("$.totalElements").value(4))
//               .andExpect(jsonPath("$.totalPages").value(2))
//               .andExpect(jsonPath("$.numberOfElements").value(2))
//               .andExpect(jsonPath("$.last").value(false))
//               .andExpect(jsonPath("$.first").value(true))
//
//               .andExpect(jsonPath("$.content[0].amount").value(8))
//               .andExpect(jsonPath("$.content[0].submittedOn").value(80000))
//               .andExpect(jsonPath("$.content[0].plantedOn").value(80000))
//               .andExpect(jsonPath("$.content[0].owner.name").value("Bert"))
//               .andExpect(jsonPath("$.content[0].treeType.name").value("wood4"))
//
//               .andExpect(jsonPath("$.content[1].amount").value(6))
//               .andExpect(jsonPath("$.content[1].submittedOn").value(60000))
//               .andExpect(jsonPath("$.content[1].plantedOn").value(60000))
//               .andExpect(jsonPath("$.content[1].owner.name").value("Bert"))
//               .andExpect(jsonPath("$.content[1].treeType.name").value("wood3"));
//    }

    @Test
    @Rollback(false)
    public void testGetPagedTreesByProjectId() throws Exception {     
        dbInjecter.injectTreeToProject("wood", "Adam", 1, timeOfPlanting - TimeConstants.WEEK_IN_MILLISECONDS, "Project A");
        dbInjecter.injectTreeToProject("wood", "Bert", 2, timeOfPlanting - 2 * TimeConstants.WEEK_IN_MILLISECONDS, "Project A");
        dbInjecter.injectTreeToProject("wood4", "Adam", 3, timeOfPlanting - 3 * TimeConstants.WEEK_IN_MILLISECONDS, "Project A");

        dbInjecter.injectTreeToProject("wood", "Bert", 4, timeOfPlanting - TimeConstants.WEEK_IN_MILLISECONDS, "Project B");
        dbInjecter.injectTreeToProject("wood", "Adam", 5, timeOfPlanting - 2 * TimeConstants.WEEK_IN_MILLISECONDS, "Project B");
        dbInjecter.injectTreeToProject("wood4", "Bert", 6, timeOfPlanting - 3 * TimeConstants.WEEK_IN_MILLISECONDS, "Project B");

        mockMvc.perform(get((Uris.TREES_BY_PROJECT + "{projectId}?page=0&size=3"), 1).accept("application/json"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.totalElements").value(3))
               .andExpect(jsonPath("$.totalPages").value(1))
               .andExpect(jsonPath("$.numberOfElements").value(3))
               .andExpect(jsonPath("$.last").value(true))
               .andExpect(jsonPath("$.first").value(true))

               .andExpect(jsonPath("$.content[0].amount").value(1))
               .andExpect(jsonPath("$.content[0].submittedOn").value(timeOfPlanting - TimeConstants.WEEK_IN_MILLISECONDS))
               .andExpect(jsonPath("$.content[0].plantedOn").value(timeOfPlanting - TimeConstants.WEEK_IN_MILLISECONDS))
               .andExpect(jsonPath("$.content[0].owner.name").value("Adam"))
               .andExpect(jsonPath("$.content[0].treeType.name").value("wood"))

               .andExpect(jsonPath("$.content[1].amount").value(2))
               .andExpect(jsonPath("$.content[1].submittedOn").value(timeOfPlanting - 2 * TimeConstants.WEEK_IN_MILLISECONDS))
               .andExpect(jsonPath("$.content[1].plantedOn").value(timeOfPlanting - 2 * TimeConstants.WEEK_IN_MILLISECONDS))
               .andExpect(jsonPath("$.content[1].owner.name").value("Bert"))
               .andExpect(jsonPath("$.content[1].treeType.name").value("wood"))

               .andExpect(jsonPath("$.content[2].amount").value(3))
               .andExpect(jsonPath("$.content[2].submittedOn").value(timeOfPlanting - 3 * TimeConstants.WEEK_IN_MILLISECONDS))
               .andExpect(jsonPath("$.content[2].plantedOn").value(timeOfPlanting - 3 * TimeConstants.WEEK_IN_MILLISECONDS))
               .andExpect(jsonPath("$.content[2].owner.name").value("Adam"))
               .andExpect(jsonPath("$.content[2].treeType.name").value("wood4"));

        mockMvc.perform(get((Uris.TREES_BY_PROJECT + "{projectId}?page=0&size=3"), 2).accept("application/json"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.totalElements").value(3))
               .andExpect(jsonPath("$.totalPages").value(1))
               .andExpect(jsonPath("$.numberOfElements").value(3))
               .andExpect(jsonPath("$.last").value(true))
               .andExpect(jsonPath("$.first").value(true))

               .andExpect(jsonPath("$.content[0].amount").value(4))
               .andExpect(jsonPath("$.content[0].submittedOn").value(timeOfPlanting - TimeConstants.WEEK_IN_MILLISECONDS))
               .andExpect(jsonPath("$.content[0].plantedOn").value(timeOfPlanting - TimeConstants.WEEK_IN_MILLISECONDS))
               .andExpect(jsonPath("$.content[0].owner.name").value("Bert"))
               .andExpect(jsonPath("$.content[0].treeType.name").value("wood"))

               .andExpect(jsonPath("$.content[1].amount").value(5))
               .andExpect(jsonPath("$.content[1].submittedOn").value(timeOfPlanting - 2 * TimeConstants.WEEK_IN_MILLISECONDS))
               .andExpect(jsonPath("$.content[1].plantedOn").value(timeOfPlanting - 2 * TimeConstants.WEEK_IN_MILLISECONDS))
               .andExpect(jsonPath("$.content[1].owner.name").value("Adam"))
               .andExpect(jsonPath("$.content[1].treeType.name").value("wood"))

               .andExpect(jsonPath("$.content[2].amount").value(6))
               .andExpect(jsonPath("$.content[2].submittedOn").value(timeOfPlanting - 3 * TimeConstants.WEEK_IN_MILLISECONDS))
               .andExpect(jsonPath("$.content[2].plantedOn").value(timeOfPlanting - 3 * TimeConstants.WEEK_IN_MILLISECONDS))
               .andExpect(jsonPath("$.content[2].owner.name").value("Bert"))
               .andExpect(jsonPath("$.content[2].treeType.name").value("wood4"));
    }

}
