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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = WeplantaforestApplication.class)
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class ProjectRepositoryIntegrationTest {
    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private ProjectRepository _projectRepository;

    @Autowired
    private DbInjecter dbInjecter;

    @Test
    public void testGetActiveProjects() {
        dbInjecter.createAndSaveUser("Bert");
        dbInjecter.createAndSaveProect("Project von Bert", "Bert", "desc", true, 52.4626536896816f, 13.607287460327143f);

        final PageRequest page1 = new PageRequest(0, 20);
        Page<Project> projects = _projectRepository.active(page1);

        assertThat(projects).isNotNull();
        assertThat(projects.getTotalElements()).isEqualTo(1);
    }
}
