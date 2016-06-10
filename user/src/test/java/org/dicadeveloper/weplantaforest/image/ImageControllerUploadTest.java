package org.dicadeveloper.weplantaforest.image;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import java.io.File;
import java.io.FileInputStream;

import org.dicadeveloper.weplantaforest.FileSystemInjector;
import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.dev.inject.DatabasePopulator;
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
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@SpringApplicationConfiguration(classes = WeplantaforestApplication.class)
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class ImageControllerUploadTest {

    private MockMvc mockMvc;

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Before
    public void setup() {
        this.mockMvc = webAppContextSetup(this.webApplicationContext).build();
    }

    @After
    public void cleanUp() {
        deleteFilesInDirectory(new File(FileSystemInjector.getImageUploadFolder()));
    }

    @Test
    public void testUploadImage() throws Exception {
        FileInputStream fileInputStream = new FileInputStream(new File(DatabasePopulator.DUMMY_IMAGE_FOLDER + "test.jpg"));

        MockMultipartFile image = new MockMultipartFile("file", fileInputStream);

        MediaType mediaType = new MediaType("multipart", "form-data");

        mockMvc.perform(MockMvcRequestBuilders.fileUpload("/image/uploadImage/{imageName}", "test.jpg")
                                              .file(image)
                                              .contentType(mediaType))
               .andExpect(status().isOk());
    }

    @Test
    public void testUploadImageTwoTimesWithSameName() throws Exception {
        FileInputStream fileInputStream = new FileInputStream(new File(DatabasePopulator.DUMMY_IMAGE_FOLDER + "test.jpg"));
        MockMultipartFile image = new MockMultipartFile("file", fileInputStream);

        MediaType mediaType = new MediaType("multipart", "form-data");

        mockMvc.perform(MockMvcRequestBuilders.fileUpload("/image/uploadImage/{imageName}", "test.jpg")
                                              .file(image)
                                              .contentType(mediaType))
               .andExpect(status().isOk());
        mockMvc.perform(MockMvcRequestBuilders.fileUpload("/image/uploadImage/{imageName}", "test.jpg")
                                              .file(image)
                                              .contentType(mediaType))
               .andExpect(status().isOk());
    }

    // Test fails on travis, cause of ComparisonFailure...

    // @Test
    // public void testUploadMultipleImagesWithSameName() throws Exception {
    // InputStream inputStream = this.getClass()
    // .getResourceAsStream(ImageHelper.IMAGE_FOLDER_RELATIVE + "test.jpg");
    // MockMultipartFile image = new MockMultipartFile("file", inputStream);
    //
    // MediaType mediaType = new MediaType("multipart", "form-data");
    //
    // for (int i = 0; i < 5; i++) {
    // mockMvc.perform(MockMvcRequestBuilders.fileUpload("/uploadImage/{folder}/{imageName}",
    // "test", "test.jpg")
    // .file(image)
    // .contentType(mediaType))
    // .andExpect(status().isOk());
    // }
    //
    // File[] files = new File(UPLOAD_TEST_FOLDER).listFiles();
    // assertThat(files.length).isEqualTo(5);
    // for (int i = 0; i < files.length; i++) {
    // if (i == 0) {
    // assertThat(files[i].getName()).isEqualTo("test.jpg");
    // } else {
    // assertThat(files[i].getName()).isEqualTo("test" + (i + 1) + ".jpg");
    // }
    // }
    // }

    @Test
    public void testUploadImageBadRequestCauseOfNotExistingFile() throws Exception {
        byte[] emptyBytes = new byte[0];

        MockMultipartFile image = new MockMultipartFile("file", emptyBytes);

        MediaType mediaType = new MediaType("multipart", "form-data");

        mockMvc.perform(MockMvcRequestBuilders.fileUpload("/image/uploadImage/{imageName}", "testtt.jpg")
                                              .file(image)
                                              .contentType(mediaType))
               .andExpect(status().isBadRequest());
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
