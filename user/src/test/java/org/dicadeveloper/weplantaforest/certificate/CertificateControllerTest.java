package org.dicadeveloper.weplantaforest.certificate;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
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
public class CertificateControllerTest {

    private MockMvc mockMvc;

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private DbInjecter _dbInjecter;

    @Autowired
    private CertificateRepository _certificateRepository;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Before
    public void setup() {
        this.mockMvc = webAppContextSetup(this.webApplicationContext).build();
    }

    @Test
    @Transactional
    public void testGetTreeByCertificateId() throws Exception {
        long timeOfPlanting = System.currentTimeMillis();

        _dbInjecter.injectUser("Adam");
        _dbInjecter.injectTreeType("wood", "wood desc", 0.5);
        _dbInjecter.injectProject("Project A", "Adam", "desc", true, 1.0f, 2.0f);
        _dbInjecter.injectProjectArticle("wood", "Project A", 100, 1.0, 0.5);

        _dbInjecter.injectTreeToProject("wood", "Adam", 1, timeOfPlanting, "Project A");

        List<Long> treeIds = new ArrayList<>();
        treeIds.add(1L);

        _dbInjecter.injectCart("Adam", treeIds);

        List<Long> cartIds = new ArrayList<>();
        cartIds.add(1L);

        _dbInjecter.injectCertificate("Adam", cartIds);

        String certNumber = _certificateRepository.findOne(1L)
                                                  .getNumber();

        this.mockMvc.perform(get("/certificate/search/{certificateNumber}", certNumber).accept("application/json"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.[0].id").value(1))
                    .andExpect(jsonPath("$.[0].amount").value(1))
                    .andExpect(jsonPath("$.[0].submittedOn").value(timeOfPlanting))
                    .andExpect(jsonPath("$.[0].plantedOn").value(timeOfPlanting))
                    .andExpect(jsonPath("$.[0].owner.name").value("Adam"))
                    .andExpect(jsonPath("$.[0].treeType.name").value("wood"));
    }

    @Test
    @Transactional
    public void testGetTreeByCertificateIdWithHashInFront() throws Exception {
        long timeOfPlanting = System.currentTimeMillis();

        _dbInjecter.injectUser("Adam");
        _dbInjecter.injectTreeType("wood", "wood desc", 0.5);
        _dbInjecter.injectProject("Project A", "Adam", "desc", true, 1.0f, 2.0f);
        _dbInjecter.injectProjectArticle("wood", "Project A", 100, 1.0, 0.5);

        _dbInjecter.injectTreeToProject("wood", "Adam", 1, timeOfPlanting, "Project A");

        List<Long> treeIds = new ArrayList<>();
        treeIds.add(1L);

        _dbInjecter.injectCart("Adam", treeIds);

        List<Long> cartIds = new ArrayList<>();
        cartIds.add(1L);

        _dbInjecter.injectCertificate("Adam", cartIds);

        String certNumber = _certificateRepository.findOne(1L)
                                                  .getNumber();

        certNumber = "#" + certNumber;

        this.mockMvc.perform(get("/certificate/search/{certificateNumber}", certNumber).accept("application/json"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.[0].id").value(1))
                    .andExpect(jsonPath("$.[0].amount").value(1))
                    .andExpect(jsonPath("$.[0].submittedOn").value(timeOfPlanting))
                    .andExpect(jsonPath("$.[0].plantedOn").value(timeOfPlanting))
                    .andExpect(jsonPath("$.[0].owner.name").value("Adam"))
                    .andExpect(jsonPath("$.[0].treeType.name").value("wood"));
    }

    @Test
    @Transactional
    public void testGetTreesByCertificateId() throws Exception {
        long timeOfPlanting = System.currentTimeMillis();

        _dbInjecter.injectUser("Adam");
        _dbInjecter.injectTreeType("wood", "wood desc", 0.5);
        _dbInjecter.injectTreeType("doow", "wood desc", 0.5);
        _dbInjecter.injectTreeType("wodo", "wood desc", 0.5);

        _dbInjecter.injectProject("Project A", "Adam", "desc", true, 1.0f, 2.0f);
        _dbInjecter.injectProjectArticle("wood", "Project A", 100, 1.0, 0.5);
        _dbInjecter.injectProjectArticle("doow", "Project A", 100, 1.0, 0.5);
        _dbInjecter.injectProjectArticle("wodo", "Project A", 100, 1.0, 0.5);

        _dbInjecter.injectTreeToProject("wood", "Adam", 1, timeOfPlanting, "Project A");
        _dbInjecter.injectTreeToProject("doow", "Adam", 2, timeOfPlanting, "Project A");
        _dbInjecter.injectTreeToProject("wodo", "Adam", 3, timeOfPlanting, "Project A");

        List<Long> treeIds = new ArrayList<>();
        treeIds.add(1L);
        treeIds.add(2L);
        treeIds.add(3L);

        _dbInjecter.injectCart("Adam", treeIds);

        List<Long> cartIds = new ArrayList<>();
        cartIds.add(1L);

        _dbInjecter.injectCertificate("Adam", cartIds);

        String certNumber = _certificateRepository.findOne(1L)
                                                  .getNumber();

        this.mockMvc.perform(get("/certificate/search/{certificateNumber}", certNumber).accept("application/json"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.[0].id").value(1))
                    .andExpect(jsonPath("$.[0].amount").value(1))
                    .andExpect(jsonPath("$.[0].submittedOn").value(timeOfPlanting))
                    .andExpect(jsonPath("$.[0].plantedOn").value(timeOfPlanting))
                    .andExpect(jsonPath("$.[0].owner.name").value("Adam"))
                    .andExpect(jsonPath("$.[0].treeType.name").value("wood"))
                    .andExpect(jsonPath("$.[1].id").value(2))
                    .andExpect(jsonPath("$.[1].amount").value(2))
                    .andExpect(jsonPath("$.[1].submittedOn").value(timeOfPlanting))
                    .andExpect(jsonPath("$.[1].plantedOn").value(timeOfPlanting))
                    .andExpect(jsonPath("$.[1].owner.name").value("Adam"))
                    .andExpect(jsonPath("$.[1].treeType.name").value("doow"))
                    .andExpect(jsonPath("$.[2].id").value(3))
                    .andExpect(jsonPath("$.[2].amount").value(3))
                    .andExpect(jsonPath("$.[2].submittedOn").value(timeOfPlanting))
                    .andExpect(jsonPath("$.[2].plantedOn").value(timeOfPlanting))
                    .andExpect(jsonPath("$.[2].owner.name").value("Adam"))
                    .andExpect(jsonPath("$.[2].treeType.name").value("wodo"));
    }

    @Test
    @Transactional
    public void testGetTreesByCertificateIdWithMultipleCarts() throws Exception {
        long timeOfPlanting = System.currentTimeMillis();

        _dbInjecter.injectUser("Adam");
        _dbInjecter.injectTreeType("wood", "wood desc", 0.5);
        _dbInjecter.injectTreeType("doow", "wood desc", 0.5);
        _dbInjecter.injectTreeType("wodo", "wood desc", 0.5);

        _dbInjecter.injectProject("Project A", "Adam", "desc", true, 1.0f, 2.0f);
        _dbInjecter.injectProjectArticle("wood", "Project A", 100, 1.0, 0.5);
        _dbInjecter.injectProjectArticle("doow", "Project A", 100, 1.0, 0.5);
        _dbInjecter.injectProjectArticle("wodo", "Project A", 100, 1.0, 0.5);

        _dbInjecter.injectTreeToProject("wood", "Adam", 1, timeOfPlanting, "Project A");
        _dbInjecter.injectTreeToProject("doow", "Adam", 2, timeOfPlanting, "Project A");
        _dbInjecter.injectTreeToProject("wodo", "Adam", 3, timeOfPlanting, "Project A");

        List<Long> treeIds = new ArrayList<>();
        treeIds.add(1L);
        treeIds.add(2L);

        _dbInjecter.injectCart("Adam", treeIds);

        List<Long> treeIds2 = new ArrayList<>();
        treeIds2.add(3L);

        _dbInjecter.injectCart("Adam", treeIds2);

        List<Long> cartIds = new ArrayList<>();
        cartIds.add(1L);
        cartIds.add(2L);

        _dbInjecter.injectCertificate("Adam", cartIds);

        String certNumber = _certificateRepository.findOne(1L)
                                                  .getNumber();

        this.mockMvc.perform(get("/certificate/search/{certificateNumber}", certNumber).accept("application/json"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.[0].id").value(1))
                    .andExpect(jsonPath("$.[0].amount").value(1))
                    .andExpect(jsonPath("$.[0].submittedOn").value(timeOfPlanting))
                    .andExpect(jsonPath("$.[0].plantedOn").value(timeOfPlanting))
                    .andExpect(jsonPath("$.[0].owner.name").value("Adam"))
                    .andExpect(jsonPath("$.[0].treeType.name").value("wood"))
                    .andExpect(jsonPath("$.[1].id").value(2))
                    .andExpect(jsonPath("$.[1].amount").value(2))
                    .andExpect(jsonPath("$.[1].submittedOn").value(timeOfPlanting))
                    .andExpect(jsonPath("$.[1].plantedOn").value(timeOfPlanting))
                    .andExpect(jsonPath("$.[1].owner.name").value("Adam"))
                    .andExpect(jsonPath("$.[1].treeType.name").value("doow"))
                    .andExpect(jsonPath("$.[2].id").value(3))
                    .andExpect(jsonPath("$.[2].amount").value(3))
                    .andExpect(jsonPath("$.[2].submittedOn").value(timeOfPlanting))
                    .andExpect(jsonPath("$.[2].plantedOn").value(timeOfPlanting))
                    .andExpect(jsonPath("$.[2].owner.name").value("Adam"))
                    .andExpect(jsonPath("$.[2].treeType.name").value("wodo"));
    }

    @Test
    @Transactional
    public void testGetTreeByCertificateIdBadRequestCauseOfWrongNumber() throws Exception {
        String certNumber = "wrong cert number";

        this.mockMvc.perform(get("/certificate/search/{certificateNumber}", certNumber).accept("application/json"))
                    .andExpect(status().isBadRequest());
    }

    @Test
    @Transactional
    public void testCreateCertificate() throws Exception {
        long timeOfPlanting = System.currentTimeMillis();

        _dbInjecter.injectUser("Adam");
        _dbInjecter.injectTreeType("wood", "wood desc", 0.5);
        _dbInjecter.injectProject("Project A", "Adam", "desc", true, 1.0f, 2.0f);
        _dbInjecter.injectProjectArticle("wood", "Project A", 100, 1.0, 0.5);

        _dbInjecter.injectTreeToProject("wood", "Adam", 1, timeOfPlanting, "Project A");

        List<Long> treeIds = new ArrayList<>();
        treeIds.add(1L);

        _dbInjecter.injectCart("Adam", treeIds);

        String[] cartIds = { "1" };

        this.mockMvc.perform(post("/certificate/create").param("userId", "1")
                                                        .param("text", "blabla")
                                                        .param("cartIds", cartIds))
                    .andExpect(status().isOk());
    }

}
