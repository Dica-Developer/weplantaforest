package org.dicadeveloper.weplantaforest.admin.treeType;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import org.dicadeveloper.weplantaforest.admin.FileSystemInjector;
import org.dicadeveloper.weplantaforest.admin.WeplantaforestAdminApplication;
import org.dicadeveloper.weplantaforest.admin.support.Uris;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.common.testSupport.TestUtil;
import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@SpringApplicationConfiguration(classes = WeplantaforestAdminApplication.class)
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
@Transactional
public class TreeTypeControllerTest {

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private TreeTypeRepository _treeTypeRepository;

    @Before
    public void setup() {
        mockMvc = webAppContextSetup(this.webApplicationContext).build();
    }

    @After
    public void cleanUp() {
        TestUtil.deleteFilesInDirectory(new File(FileSystemInjector.getTreeTypeFolder()));
    }

    @Test
    @Transactional
    public void testCreateTreeType() throws IOException, Exception {
        TreeType treeType = new TreeType();
        treeType.setName("treeType");
        treeType.setDescription("description");
        treeType.setAnnualCo2SavingInTons(0.5);
        treeType.setInfoLink("www.abc.de");

        mockMvc.perform(post(Uris.TREETYPE_SAVE).contentType(TestUtil.APPLICATION_JSON_UTF8)
                                                .content(TestUtil.convertObjectToJsonBytes(treeType)))
               .andExpect(status().isOk());

        assertThat(_treeTypeRepository.count()).isEqualTo(1L);
        assertThat(_treeTypeRepository.findOne(1L)
                                      .getAnnualCo2SavingInTons()).isEqualTo(0.5);
    }

    @Test
    @Transactional
    public void testUploadTreeTypeImage() throws IOException, Exception {
        testCreateTreeType();
        FileInputStream fileInputStream = new FileInputStream("src/test/resources/images/" + "test.jpg");
        MockMultipartFile image = new MockMultipartFile("file", fileInputStream);

        MediaType mediaType = new MediaType("multipart", "form-data");

        mockMvc.perform(MockMvcRequestBuilders.fileUpload(Uris.TREETYPE_IMAGE_UPLOAD)
                                              .file(image)
                                              .contentType(mediaType)
                                              .param("treeTypeId", "1"))
               .andExpect(status().isOk());

        assertThat(_treeTypeRepository.count()).isEqualTo(1L);
        assertThat(_treeTypeRepository.findOne(1L)
                                      .getAnnualCo2SavingInTons()).isEqualTo(0.5);

    }

}
