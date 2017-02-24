package org.dicadeveloper.weplantaforest.projects;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.dicadeveloper.weplantaforest.common.support.TimeConstants;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class ProjectImageRepositoryIntegrationTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    public DbInjecter _dbInjecter;

    @Autowired
    public ProjectImageRepository _projectImageRepository;

    @Test
    public void getProjectImagesFromProject() {
        _dbInjecter.injectUser("Adam");
        _dbInjecter.injectProject("Project A", "Adam", "project with images", true, 1.0f, 1.0f);
        _dbInjecter.injectProject("Project B", "Adam", "project with images", true, 1.0f, 1.0f);

        _dbInjecter.injectProjectImage("image1", "image description 1", "test1.jpg", TimeConstants.YEAR_IN_MILLISECONDS * 10, "Project A");
        _dbInjecter.injectProjectImage("image2", "image description 2", "test2.jpg", TimeConstants.YEAR_IN_MILLISECONDS * 20, "Project A");
        _dbInjecter.injectProjectImage("image3", "image description 3", "test3.jpg", TimeConstants.YEAR_IN_MILLISECONDS * 30, "Project A");

        _dbInjecter.injectProjectImage("image1", "image description", "test4.jpg", TimeConstants.YEAR_IN_MILLISECONDS * 40, "Project B");
        _dbInjecter.injectProjectImage("image2", "image description", "test5.jpg", TimeConstants.YEAR_IN_MILLISECONDS * 50, "Project B");

        List<ProjectImage> imageList = _projectImageRepository.findProjectImagesToProjectByProjectId(1);

        assertThat(imageList.size()).isEqualTo(3);
        assertThat(imageList.get(0)
                            .getTitle()).isEqualTo("image1");
        assertThat(imageList.get(1)
                            .getTitle()).isEqualTo("image2");
        assertThat(imageList.get(2)
                            .getTitle()).isEqualTo("image3");
        assertThat(imageList.get(0)
                            .getDescription()).isEqualTo("image description 1");
        assertThat(imageList.get(1)
                            .getDescription()).isEqualTo("image description 2");
        assertThat(imageList.get(2)
                            .getDescription()).isEqualTo("image description 3");
        assertThat(imageList.get(0)
                            .getImageFileName()).isEqualTo("test1.jpg");
        assertThat(imageList.get(1)
                            .getImageFileName()).isEqualTo("test2.jpg");
        assertThat(imageList.get(2)
                            .getImageFileName()).isEqualTo("test3.jpg");
        assertThat(imageList.get(0)
                            .getDate()).isEqualTo(TimeConstants.YEAR_IN_MILLISECONDS * 10);
        assertThat(imageList.get(1)
                            .getDate()).isEqualTo(TimeConstants.YEAR_IN_MILLISECONDS * 20);
        assertThat(imageList.get(2)
                            .getDate()).isEqualTo(TimeConstants.YEAR_IN_MILLISECONDS * 30);
    }

}
