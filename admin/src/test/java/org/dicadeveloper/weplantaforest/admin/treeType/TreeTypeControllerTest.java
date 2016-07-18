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
        deleteFilesInDirectory(new File(FileSystemInjector.getTreeTypeFolder()));
    }

    @Test
    public void testCreateTreeType() throws IOException, Exception {
        TreeType treeType = new TreeType();

        treeType.setName("wood");
        treeType.setAnnualCo2SavingInTons(0.5);
        treeType.setImageFile("abc.jpg");
        treeType.setDescription("description");

        System.out.println(TestUtil.getJsonStringFromObject(treeType));

        mockMvc.perform(post(Uris.TREETYPE_CREATE).contentType(TestUtil.APPLICATION_JSON_UTF8)
                                                  .content(TestUtil.convertObjectToJsonBytes(treeType)))
               .andExpect(status().isOk());

        assertThat(_treeTypeRepository.count()).isEqualTo(1L);
    }

    @Test
    public void testUploadTreeTypeImage() throws Exception {
        FileInputStream fileInputStream = new FileInputStream("src/test/resources/images/" + "test.jpg");
        MockMultipartFile image = new MockMultipartFile("file", fileInputStream);

        MediaType mediaType = new MediaType("multipart", "form-data");

        mockMvc.perform(MockMvcRequestBuilders.fileUpload(Uris.TREETYPE_IMAGE_UPLOAD + "{imageName}", "test.jpg")
                                              .file(image)
                                              .contentType(mediaType))
               .andExpect(status().isOk());
    }
    
    private void deleteFilesInDirectory(File path) {
        if (path.exists()) {
            File[] files = path.listFiles();
            for (int i = 0; i < files.length; i++) {
                if (!files[i].isDirectory()) {
                    files[i].delete();
                }
            }
        }
    }

}
