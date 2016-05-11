package org.dicadeveloper.weplantaforest.projects;

import static org.assertj.core.api.Assertions.assertThat;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.testsupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
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
public class ProjectArticleRepositoryIntegrationTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    public DbInjecter _dbInjecter;

    @Autowired
    public ProjectArticleRepository _projectArticleRepository;

    @Test
    public void testGetArticleIdbyProjectAndTreeType() {
        _dbInjecter.injectTreeType("wood", "this is a wood", 0.5);

        _dbInjecter.injectUser("Adam");

        _dbInjecter.injectProject("Project A", "Adam", "this is a project", true, 0, 0);
        
        _dbInjecter.injectProjectArticle("wood", "Project A", 1.0);
        
        Long articleId = _projectArticleRepository.findArticleIdByProjectAndTreeType("Project A", "wood");
        
        assertThat(articleId).isNotNull();
        assertThat(articleId).isEqualTo(1L);

    }

}
