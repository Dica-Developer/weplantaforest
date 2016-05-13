package org.dicadeveloper.weplantaforest.reports.projects;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.testsupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = WeplantaforestApplication.class)
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class ProjectReportRepositoryIntegrationTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    public DbInjecter _dbInjecter;

    @Autowired
    private ProjectReportRepository _projectReportRepository;

    @Test
    public void testGetActiveProjectReportWithoutPlantedTrees() {
        _dbInjecter.injectTreeType("wood", "wooddesc", 0.5);
        _dbInjecter.injectTreeType("doow", "wooddesc", 0.5);

        _dbInjecter.injectUser("Adam");

        _dbInjecter.injectProject("Project A", "Adam", "projectdesc", true, 1.0f, 2.0f);

        _dbInjecter.injectProjectArticle("wood", "Project A", 100, 1.0, 0.5);
        _dbInjecter.injectProjectArticle("doow", "Project A", 200, 1.0, 0.5);

        List<ProjectReportData> projects = _projectReportRepository.getActiveProjectData(new PageRequest(0, 5));

        assertThat(projects.size()).isEqualTo(1);
        assertThat(projects.get(0)
                           .getProjectName()).isEqualTo("Project A");
        assertThat(projects.get(0)
                           .getDescription()).isEqualTo("projectdesc");
        assertThat(projects.get(0)
                           .getLatitude()).isEqualTo(1.0f);
        assertThat(projects.get(0)
                           .getLongitude()).isEqualTo(2.0f);
        assertThat(projects.get(0)
                           .getAmount()).isEqualTo(300);
        assertThat(projects.get(0)
                           .getAlreadyPlanted()).isEqualTo(0);
    }

    @Test
    public void testGetActiveProjectReportOneTreeTypePlanted() {
        long timeOfPlanting = System.currentTimeMillis();

        _dbInjecter.injectTreeType("wood", "wooddesc", 0.5);
        _dbInjecter.injectTreeType("doow", "wooddesc", 0.5);

        _dbInjecter.injectUser("Adam");

        _dbInjecter.injectProject("Project A", "Adam", "projectdesc", true, 1.0f, 2.0f);

        _dbInjecter.injectProjectArticle("wood", "Project A", 100, 1.0, 0.5);
        _dbInjecter.injectProjectArticle("doow", "Project A", 200, 1.0, 0.5);

        _dbInjecter.injectTreeToProject("wood", "Adam", 10, timeOfPlanting, "Project A");
        _dbInjecter.injectTreeToProject("wood", "Adam", 10, timeOfPlanting, "Project A");

        List<ProjectReportData> projects = _projectReportRepository.getActiveProjectData(new PageRequest(0, 5));

        assertThat(projects.size()).isEqualTo(1);
        assertThat(projects.get(0)
                           .getProjectName()).isEqualTo("Project A");
        assertThat(projects.get(0)
                           .getDescription()).isEqualTo("projectdesc");
        assertThat(projects.get(0)
                           .getLatitude()).isEqualTo(1.0f);
        assertThat(projects.get(0)
                           .getLongitude()).isEqualTo(2.0f);
        assertThat(projects.get(0)
                           .getAmount()).isEqualTo(300);
        assertThat(projects.get(0)
                           .getAlreadyPlanted()).isEqualTo(20);
    }

    @Test
    public void testGetActiveProjectReportWithPlantedTrees() {
        long timeOfPlanting = System.currentTimeMillis();

        _dbInjecter.injectTreeType("wood", "wooddesc", 0.5);
        _dbInjecter.injectTreeType("doow", "wooddesc", 0.5);

        _dbInjecter.injectUser("Adam");

        _dbInjecter.injectProject("Project A", "Adam", "projectdesc", true, 1.0f, 2.0f);

        _dbInjecter.injectProjectArticle("wood", "Project A", 100, 1.0, 0.5);
        _dbInjecter.injectProjectArticle("doow", "Project A", 200, 1.0, 0.5);

        _dbInjecter.injectTreeToProject("wood", "Adam", 10, timeOfPlanting, "Project A");
        _dbInjecter.injectTreeToProject("wood", "Adam", 10, timeOfPlanting, "Project A");
        _dbInjecter.injectTreeToProject("doow", "Adam", 30, timeOfPlanting, "Project A");

        List<ProjectReportData> projects = _projectReportRepository.getActiveProjectData(new PageRequest(0, 5));

        assertThat(projects.size()).isEqualTo(1);
        assertThat(projects.get(0)
                           .getProjectName()).isEqualTo("Project A");
        assertThat(projects.get(0)
                           .getDescription()).isEqualTo("projectdesc");
        assertThat(projects.get(0)
                           .getLatitude()).isEqualTo(1.0f);
        assertThat(projects.get(0)
                           .getLongitude()).isEqualTo(2.0f);
        assertThat(projects.get(0)
                           .getAmount()).isEqualTo(300);
        assertThat(projects.get(0)
                           .getAlreadyPlanted()).isEqualTo(50);
    }

    @Test
    public void testGetActiveProjectReportWithTwoProjectsWithoutPlantedTrees() {
        _dbInjecter.injectTreeType("wood", "wooddesc", 0.5);
        _dbInjecter.injectTreeType("doow", "wooddesc", 0.5);

        _dbInjecter.injectUser("Adam");

        _dbInjecter.injectProject("Project A", "Adam", "projectdesc", true, 1.0f, 2.0f);
        _dbInjecter.injectProject("Project B", "Adam", "projectdesc", true, 1.0f, 2.0f);

        _dbInjecter.injectProjectArticle("wood", "Project A", 100, 1.0, 0.5);
        _dbInjecter.injectProjectArticle("doow", "Project A", 200, 1.0, 0.5);

        _dbInjecter.injectProjectArticle("wood", "Project B", 300, 1.0, 0.5);
        _dbInjecter.injectProjectArticle("doow", "Project B", 500, 1.0, 0.5);

        List<ProjectReportData> projects = _projectReportRepository.getActiveProjectData(new PageRequest(0, 5));

        assertThat(projects.size()).isEqualTo(2);
        assertThat(projects.get(0)
                           .getProjectName()).isEqualTo("Project A");
        assertThat(projects.get(0)
                           .getDescription()).isEqualTo("projectdesc");
        assertThat(projects.get(0)
                           .getLatitude()).isEqualTo(1.0f);
        assertThat(projects.get(0)
                           .getLongitude()).isEqualTo(2.0f);
        assertThat(projects.get(0)
                           .getAmount()).isEqualTo(300);
        assertThat(projects.get(0)
                           .getAlreadyPlanted()).isEqualTo(0);
        assertThat(projects.get(1)
                           .getProjectName()).isEqualTo("Project B");
        assertThat(projects.get(1)
                           .getDescription()).isEqualTo("projectdesc");
        assertThat(projects.get(1)
                           .getLatitude()).isEqualTo(1.0f);
        assertThat(projects.get(1)
                           .getLongitude()).isEqualTo(2.0f);
        assertThat(projects.get(1)
                           .getAmount()).isEqualTo(800);
        assertThat(projects.get(1)
                           .getAlreadyPlanted()).isEqualTo(0);
    }

    @Test
    public void testGetActiveProjectReportWithTwoProjectsWithPlantedTrees() {
        long timeOfPlanting = System.currentTimeMillis();

        _dbInjecter.injectTreeType("wood", "wooddesc", 0.5);
        _dbInjecter.injectTreeType("doow", "wooddesc", 0.5);

        _dbInjecter.injectUser("Adam");

        _dbInjecter.injectProject("Project A", "Adam", "projectdesc", true, 1.0f, 2.0f);
        _dbInjecter.injectProject("Project B", "Adam", "projectdesc", true, 1.0f, 2.0f);

        _dbInjecter.injectProjectArticle("wood", "Project A", 100, 1.0, 0.5);
        _dbInjecter.injectProjectArticle("doow", "Project A", 200, 1.0, 0.5);
        _dbInjecter.injectProjectArticle("wood", "Project B", 300, 1.0, 0.5);
        _dbInjecter.injectProjectArticle("doow", "Project B", 500, 1.0, 0.5);

        _dbInjecter.injectTreeToProject("wood", "Adam", 50, timeOfPlanting, "Project A");
        _dbInjecter.injectTreeToProject("doow", "Adam", 30, timeOfPlanting, "Project A");
        _dbInjecter.injectTreeToProject("wood", "Adam", 20, timeOfPlanting, "Project A");

        _dbInjecter.injectTreeToProject("wood", "Adam", 100, timeOfPlanting, "Project B");
        _dbInjecter.injectTreeToProject("wood", "Adam", 100, timeOfPlanting, "Project B");
        _dbInjecter.injectTreeToProject("doow", "Adam", 200, timeOfPlanting, "Project B");

        List<ProjectReportData> projects = _projectReportRepository.getActiveProjectData(new PageRequest(0, 5));

        assertThat(projects.size()).isEqualTo(2);
        assertThat(projects.get(0)
                           .getProjectName()).isEqualTo("Project A");
        assertThat(projects.get(0)
                           .getDescription()).isEqualTo("projectdesc");
        assertThat(projects.get(0)
                           .getLatitude()).isEqualTo(1.0f);
        assertThat(projects.get(0)
                           .getLongitude()).isEqualTo(2.0f);
        assertThat(projects.get(0)
                           .getAmount()).isEqualTo(300);
        assertThat(projects.get(0)
                           .getAlreadyPlanted()).isEqualTo(100);
        assertThat(projects.get(1)
                           .getProjectName()).isEqualTo("Project B");
        assertThat(projects.get(1)
                           .getDescription()).isEqualTo("projectdesc");
        assertThat(projects.get(1)
                           .getLatitude()).isEqualTo(1.0f);
        assertThat(projects.get(1)
                           .getLongitude()).isEqualTo(2.0f);
        assertThat(projects.get(1)
                           .getAmount()).isEqualTo(800);
        assertThat(projects.get(1)
                           .getAlreadyPlanted()).isEqualTo(400);
    }

    @Test
    public void testGetActiveProjectReportWithTwoProjectsOneWithoutPlantedTrees() {
        long timeOfPlanting = System.currentTimeMillis();

        _dbInjecter.injectTreeType("wood", "wooddesc", 0.5);
        _dbInjecter.injectTreeType("doow", "wooddesc", 0.5);

        _dbInjecter.injectUser("Adam");

        _dbInjecter.injectProject("Project A", "Adam", "projectdesc", true, 1.0f, 2.0f);
        _dbInjecter.injectProject("Project B", "Adam", "projectdesc", true, 1.0f, 2.0f);

        _dbInjecter.injectProjectArticle("wood", "Project A", 100, 1.0, 0.5);
        _dbInjecter.injectProjectArticle("doow", "Project A", 200, 1.0, 0.5);
        _dbInjecter.injectProjectArticle("wood", "Project B", 300, 1.0, 0.5);
        _dbInjecter.injectProjectArticle("doow", "Project B", 500, 1.0, 0.5);

        _dbInjecter.injectTreeToProject("wood", "Adam", 50, timeOfPlanting, "Project A");
        _dbInjecter.injectTreeToProject("doow", "Adam", 30, timeOfPlanting, "Project A");
        _dbInjecter.injectTreeToProject("wood", "Adam", 20, timeOfPlanting, "Project A");

        List<ProjectReportData> projects = _projectReportRepository.getActiveProjectData(new PageRequest(0, 5));

        assertThat(projects.size()).isEqualTo(2);
        assertThat(projects.get(0)
                           .getProjectName()).isEqualTo("Project A");
        assertThat(projects.get(0)
                           .getDescription()).isEqualTo("projectdesc");
        assertThat(projects.get(0)
                           .getLatitude()).isEqualTo(1.0f);
        assertThat(projects.get(0)
                           .getLongitude()).isEqualTo(2.0f);
        assertThat(projects.get(0)
                           .getAmount()).isEqualTo(300);
        assertThat(projects.get(0)
                           .getAlreadyPlanted()).isEqualTo(100);
        assertThat(projects.get(1)
                           .getProjectName()).isEqualTo("Project B");
        assertThat(projects.get(1)
                           .getDescription()).isEqualTo("projectdesc");
        assertThat(projects.get(1)
                           .getLatitude()).isEqualTo(1.0f);
        assertThat(projects.get(1)
                           .getLongitude()).isEqualTo(2.0f);
        assertThat(projects.get(1)
                           .getAmount()).isEqualTo(800);
        assertThat(projects.get(1)
                           .getAlreadyPlanted()).isEqualTo(0);
    }

}
