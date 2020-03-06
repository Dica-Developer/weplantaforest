package org.dicadeveloper.weplantaforest.projects;

import static org.assertj.core.api.Assertions.assertThat;

import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class ProjectRepositoryIntegrationTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    public DbInjecter _dbInjecter;

    @Autowired
    public ProjectRepository _projectRepository;

    @Test
    public void testGetActiveProjects() {
        _dbInjecter.injectUser("Adam");
        _dbInjecter.injectUser("Bert");

        _dbInjecter.injectProject("Adam's project", "Adam", "n1 project", true, 0, 0);
        _dbInjecter.injectProject("Bert's project", "Bert", "n1 project", true, 0, 0);
        _dbInjecter.injectProject("Adam's 2nd project", "Adam", "n1 project", false, 0, 0);
        _dbInjecter.injectProject("Bert's 2nd project", "Bert", "n1 project", false, 0, 0);
        _dbInjecter.injectProject("Bert's 3rd project", "Bert", "n1 project", false, 0, 0);

        Page<Project> activeProjectList = _projectRepository.active(PageRequest.of(0, 5));

        assertThat(activeProjectList).isNotNull();
        assertThat(activeProjectList.getTotalElements()).isEqualTo(2);
        assertThat(activeProjectList.getTotalPages()).isEqualTo(1);
        assertThat(activeProjectList.getContent().size()).isEqualTo(2);
    }

}
