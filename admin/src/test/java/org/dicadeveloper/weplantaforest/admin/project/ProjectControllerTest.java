package org.dicadeveloper.weplantaforest.admin.project;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;

import javax.transaction.Transactional;

import org.dicadeveloper.weplantaforest.admin.FileSystemInjector;
import org.dicadeveloper.weplantaforest.admin.security.TokenAuthenticationService;
import org.dicadeveloper.weplantaforest.admin.support.Uris;
import org.dicadeveloper.weplantaforest.admin.testSupport.DbInjecter;
import org.dicadeveloper.weplantaforest.admin.treeType.TreeType;
import org.dicadeveloper.weplantaforest.admin.user.User;
import org.dicadeveloper.weplantaforest.admin.user.UserRepository;
import org.dicadeveloper.weplantaforest.common.testsupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.common.testsupport.TestUtil;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@SpringBootTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class ProjectControllerTest {

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private DbInjecter _dbInjecter;

    @Autowired
    private UserRepository _userRepository;

    @Autowired
    private ProjectRepository _projectRepository;

    @Autowired
    private ProjectArticleRepository _projectArticleRepository;

    @Autowired
    private ProjectImageRepository _projectImageRepository;

    @Autowired
    private TokenAuthenticationService _tokenAuthenticationService;

    @Before
    public void setup() {
        mockMvc = webAppContextSetup(this.webApplicationContext).build();
    }

    @Test
    public void testCreateProject() throws IOException, Exception {
        _dbInjecter.injectUser("ProjectManager");

        Project project = new Project();

        project.setName("PROJECT");
        project.setDescription("this is a project!");
        project.setLatitude(1.0f);
        project.setLongitude(2.0f);
        project.setShopActive(true);
        project.setVisible(true);
        project.setManager(_userRepository.findByName("ProjectManager"));
        String userToken = _tokenAuthenticationService.getTokenFromUser(_userRepository.findById(1L).orElse(null));

        mockMvc.perform(post(Uris.PROJECT_CREATE).header("X-AUTH-TOKEN", userToken).contentType(TestUtil.APPLICATION_JSON_UTF8).content(TestUtil.convertObjectToJsonBytes(project)))
                .andExpect(status().isOk());

        assertThat(_projectRepository.count()).isEqualTo(1L);
    }

    @Test
    public void testCreateProjectServerErrorCauseOfMissingManager() throws IOException, Exception {
        _dbInjecter.injectUser("ProjectManager");

        Project project = new Project();

        project.setName("PROJECT");
        project.setDescription("this is a project!");
        project.setLatitude(1.0f);
        project.setLongitude(2.0f);
        project.setShopActive(true);
        project.setVisible(true);
        String userToken = _tokenAuthenticationService.getTokenFromUser(_userRepository.findById(1L).orElse(null));

        mockMvc.perform(post(Uris.PROJECT_CREATE).header("X-AUTH-TOKEN", userToken).contentType(TestUtil.APPLICATION_JSON_UTF8).content(TestUtil.convertObjectToJsonBytes(project)))
                .andExpect(status().is5xxServerError());
    }

    @Test
    public void testDeleteProject() throws Exception {
        User manager = _dbInjecter.injectUser("manager");
        TreeType treeType = _dbInjecter.injectTreeType("wood", "wood desc", 0.5);
        Project project = _dbInjecter.injectProject("project", manager, "desc", true, 1.0f, 1.0f);
        _dbInjecter.injectProjectArticle(treeType, project, 10, 1.0, 1.0);
        _dbInjecter.injectProjectImage("title", "desc", 1L, 1000000L);

        assertThat(_projectRepository.count()).isEqualTo(1L);
        assertThat(_projectArticleRepository.count()).isEqualTo(1L);
        assertThat(_projectImageRepository.count()).isEqualTo(1L);
        String userToken = _tokenAuthenticationService.getTokenFromUser(_userRepository.findById(1L).orElse(null));

        mockMvc.perform(delete(Uris.PROJECT_DELETE).header("X-AUTH-TOKEN", userToken).contentType(TestUtil.APPLICATION_JSON_UTF8).param("id", "1")).andExpect(status().isOk());
        assertThat(_projectRepository.count()).isEqualTo(0);
        assertThat(_projectArticleRepository.count()).isEqualTo(0);
        assertThat(_projectImageRepository.count()).isEqualTo(0);
    }

    @Test
    @Transactional
    public void testRemoveProjectArticle() throws Exception {
        User manager = _dbInjecter.injectUser("manager");
        Project project = _dbInjecter.injectProject("project", manager, "desc", true, 1.0f, 1.0f);
        TreeType treeType = _dbInjecter.injectTreeType("wood", "wood desc", 0.5);
        _dbInjecter.injectProjectArticle(treeType, project, 10, 1.0, 1.0);
        String userToken = _tokenAuthenticationService.getTokenFromUser(_userRepository.findById(1L).orElse(null));

        List<ProjectArticle> articles = _projectArticleRepository.findByProject(_projectRepository.findById(1L).orElse(null));

        assertThat(articles.size()).isEqualTo(1);

        mockMvc.perform(post(Uris.PROJECT_REMOVE_ARTICLE).header("X-AUTH-TOKEN", userToken).contentType(TestUtil.APPLICATION_JSON_UTF8).param("articleId", "1").param("projectId", "1"))
                .andExpect(status().isOk());

        List<ProjectArticle> articlesAfterRemove = _projectArticleRepository.findByProject(_projectRepository.findById(1L).orElse(null));

        assertThat(articlesAfterRemove.size()).isEqualTo(0);
    }

    @Test
    public void testAddProjectImage() throws Exception {
        User manager = _dbInjecter.injectUser("manager");
        _dbInjecter.injectProject("project 1", manager, "desc", true, 1.0f, 1.0f);
        String userToken = _tokenAuthenticationService.getTokenFromUser(_userRepository.findById(1L).orElse(null));

        assertThat(_projectImageRepository.findProjectImagesToProjectByProjectId(1L).size()).isEqualTo(0);

        ProjectImageRequest projectImageRequest = new ProjectImageRequest(null, "title", "<mlpr>GERMAN<equ>Beschreibung<sep>ENGLISH<equ>description<sep>ITALIAN<equ>Oak tree<sep>", 1L);

        String projectImageRequestAsJson = TestUtil.getJsonStringFromObject(projectImageRequest);

        mockMvc.perform(MockMvcRequestBuilders.post(Uris.PROJECT_IMAGE_CREATE_EDIT).header("X-AUTH-TOKEN", userToken).contentType(TestUtil.APPLICATION_JSON_UTF8).content(projectImageRequestAsJson))
                .andExpect(status().isOk());

        assertThat(_projectImageRepository.findProjectImagesToProjectByProjectId(1L).size()).isEqualTo(1);

        FileInputStream fileInputStream = new FileInputStream("src/test/resources/images/" + "test.jpg");
        MockMultipartFile image = new MockMultipartFile("file", fileInputStream);

        MediaType mediaType = new MediaType("multipart", "form-data");

        mockMvc.perform(MockMvcRequestBuilders.multipart(Uris.PROJECT_IMAGE_UPLOAD).file(image).header("X-AUTH-TOKEN", userToken).contentType(mediaType).param("imageId", "1"))
                .andExpect(status().isOk());

        assertThat(_projectImageRepository.findProjectImagesToProjectByProjectId(1L).size()).isEqualTo(1);

        TestUtil.deleteFilesInDirectory(new File(FileSystemInjector.getImageFolderForProjects()));
    }
}
