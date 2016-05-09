package org.dicadeveloper.weplantaforest.trees;

import static org.assertj.core.api.Assertions.assertThat;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.projects.ProjectArticle;
import org.dicadeveloper.weplantaforest.projects.ProjectArticleRepository;
import org.dicadeveloper.weplantaforest.projects.ProjectRepository;
import org.dicadeveloper.weplantaforest.testsupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.dicadeveloper.weplantaforest.treetypes.TreeTypeRepository;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = WeplantaforestApplication.class)
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class TreeRepositoryIntegrationTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    public DbInjecter _dbInjecter;

    @Autowired
    private TreeRepository _treeRepository;

    @Autowired
    private ProjectArticleRepository _projectArticleRepository;

    @Autowired
    private ProjectRepository _projectRepository;

    @Autowired
    private TreeTypeRepository _treeTypeRepository;

    @Test
    public void testGetPlantedTreesFromProjectArticle() {
        long timeOfPlanting = System.currentTimeMillis();

        _dbInjecter.injectTreeType("wood", "this is a wood", 0.5);
        _dbInjecter.injectTreeType("big wood", "this is a big wood", 0.5);

        _dbInjecter.injectUser("Adam");
        _dbInjecter.injectUser("Bert");

        _dbInjecter.injectProject("Project", "Adam", "adam's project", true, 0, 0);

        _dbInjecter.injectProjectArticle("wood", "Project", 3.0);
        _dbInjecter.injectProjectArticle("big wood", "Project", 3.0);

        _dbInjecter.injectTreeToProject("wood", "Bert", 5, timeOfPlanting, "Project");
        _dbInjecter.injectTreeToProject("wood", "Bert", 5, timeOfPlanting, "Project");
        _dbInjecter.injectTreeToProject("big wood", "Bert", 5, timeOfPlanting, "Project");

        ProjectArticle projectArticle = _projectArticleRepository.findByProjectAndTreeType(
                _projectRepository.findByName("Project"), _treeTypeRepository.findByName("wood"));

        Long plantedTrees = _treeRepository.countAlreadyPlantedTreesByProjectArticle(projectArticle);

        assertThat(plantedTrees).isEqualTo(10);
    }
}
