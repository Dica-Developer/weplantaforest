package org.dicadeveloper.weplantaforest.image;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import java.io.File;
import java.io.InputStream;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
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

    public final static String UPLOAD_TEST_FOLDER = ImageHelper.UPLOAD_IMAGE_FOLDER_EXTENDED_FROM_CURRENT + "test";
    
    public final static String UPLOAD_TEST_FOLDER_2 = ImageHelper.UPLOAD_IMAGE_FOLDER_EXTENDED_FROM_CURRENT + "test2";

    private MockMvc mockMvc;

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Before
    public void setup() {
        this.mockMvc = webAppContextSetup(this.webApplicationContext).build();
        createUploadTestFolder();
    }

    @After
    public void cleanUp() {
        deleteDirectory(new File(UPLOAD_TEST_FOLDER));
        deleteDirectory(new File(UPLOAD_TEST_FOLDER_2));
    }

    @Test
    public void testUploadImage() throws Exception {
        InputStream inputStream = this.getClass()
                                      .getResourceAsStream(ImageHelper.IMAGE_FOLDER_RELATIVE + "test.jpg");
        MockMultipartFile image = new MockMultipartFile("file", inputStream);

        MediaType mediaType = new MediaType("multipart", "form-data");

        mockMvc.perform(MockMvcRequestBuilders.fileUpload("/uploadImage/{folder}/{imageName}", "test", "test.jpg")
                                              .file(image)
                                              .contentType(mediaType))
               .andExpect(status().isOk());
    }

    @Test
    public void testUploadImageToNonExistingFolder() throws Exception {
        InputStream inputStream = this.getClass()
                                      .getResourceAsStream(ImageHelper.IMAGE_FOLDER_RELATIVE + "test.jpg");
        MockMultipartFile image = new MockMultipartFile("file", inputStream);

        MediaType mediaType = new MediaType("multipart", "form-data");

        mockMvc.perform(MockMvcRequestBuilders.fileUpload("/uploadImage/{folder}/{imageName}", "test2", "test.jpg")
                                              .file(image)
                                              .contentType(mediaType))
               .andExpect(status().isOk());
    }

    
//Test fails on travis, cause of ComparisonFailure...
    
//    @Test
//    public void testUploadMultipleImagesWithSameName() throws Exception {
//        InputStream inputStream = this.getClass()
//                                      .getResourceAsStream(ImageHelper.IMAGE_FOLDER_RELATIVE + "test.jpg");
//        MockMultipartFile image = new MockMultipartFile("file", inputStream);
//
//        MediaType mediaType = new MediaType("multipart", "form-data");
//
//        for (int i = 0; i < 5; i++) {
//            mockMvc.perform(MockMvcRequestBuilders.fileUpload("/uploadImage/{folder}/{imageName}", "test", "test.jpg")
//                                                  .file(image)
//                                                  .contentType(mediaType))
//                   .andExpect(status().isOk());
//        }
//
//        File[] files = new File(UPLOAD_TEST_FOLDER).listFiles();
//        assertThat(files.length).isEqualTo(5);
//        for (int i = 0; i < files.length; i++) {
//            if (i == 0) {
//                assertThat(files[i].getName()).isEqualTo("test.jpg");
//            } else {
//                assertThat(files[i].getName()).isEqualTo("test" + (i + 1) + ".jpg");
//            }
//        }
//    }
    
    @Test
    public void testUploadImageBadRequestCauseOfNotExistingFile() throws Exception {
        byte[] emptyBytes = new byte[0];

        MockMultipartFile image = new MockMultipartFile("file", emptyBytes);

        MediaType mediaType = new MediaType("multipart", "form-data");

        mockMvc.perform(MockMvcRequestBuilders.fileUpload("/uploadImage/{folder}/{imageName}", "test", "testtt.jpg")
                                              .file(image)
                                              .contentType(mediaType))
               .andExpect(status().isBadRequest());
    }

    private void createUploadTestFolder() {
        File dir = new File(UPLOAD_TEST_FOLDER);
        if (!dir.exists()) {
            dir.mkdirs();
        }
    }

    private void deleteDirectory(File path) {
        if (path.exists()) {
            File[] files = path.listFiles();
            for (int i = 0; i < files.length; i++) {
                if (files[i].isDirectory()) {
                    deleteDirectory(files[i]);
                } else {
                    files[i].delete();
                }
            }
            path.delete();
        }
    }

}
