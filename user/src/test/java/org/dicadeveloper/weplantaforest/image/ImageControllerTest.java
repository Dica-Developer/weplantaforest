package org.dicadeveloper.weplantaforest.image;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.FileSystemInjector;
import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.dev.inject.DatabasePopulator;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@SpringApplicationConfiguration(classes = WeplantaforestApplication.class)
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class ImageControllerTest {
    
    protected final Log LOG = LogFactory.getLog(ImageControllerTest.class.getName());

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

    @Test
    public void testGetImageNonScaled() throws Exception {
        createFolderAndInsertImage("test.jpg");
        
        this.mockMvc.perform(get(Uris.IMAGE + "{imageName:.+}", "test.jpg").accept("image/jpg"))
                    .andExpect(status().isOk());
    }

    @Test
    public void testGetImageNonScaledBadRequest() throws Exception {
        this.mockMvc.perform(get(Uris.IMAGE + "{imageName:.+}", "testttt.jpg").accept("image/jpg"))
                    .andExpect(status().isBadRequest());
    }

    @Test
    public void testGetImageScaled() throws Exception {
        createFolderAndInsertImage("test.jpg");
        
        this.mockMvc.perform(get(Uris.IMAGE + "{imageName:.+}/{width}/{height}", "test.jpg", 500, 500).accept("image/jpg"))
                    .andExpect(status().isOk());
    }
    
    @Test
    public void testGetImageScaledVeryBigHeight() throws Exception {
        createFolderAndInsertImage("test.jpg");
        
        this.mockMvc.perform(get(Uris.IMAGE + "{imageName:.+}/{width}/{height}", "test.jpg", 30000, 150000).accept("image/jpg"))
                    .andExpect(status().isOk());
    }
    
    @Test
    public void testGetImageScaledVeryBigWidth() throws Exception {
        createFolderAndInsertImage("test.jpg");
        
        this.mockMvc.perform(get(Uris.IMAGE + "{imageName:.+}/{width}/{height}", "test.jpg", 150000, 30000).accept("image/jpg"))
                    .andExpect(status().isOk());
    }
    
    @Test
    public void testGetImageScaledVeryBigWidthHeightNormal() throws Exception {
        createFolderAndInsertImage("test.jpg");
        
        this.mockMvc.perform(get(Uris.IMAGE + "{imageName:.+}/{width}/{height}", "test.jpg", 150000, 1500).accept("image/jpg"))
                    .andExpect(status().isOk());
    }
    
    @Test
    public void testGetImageScaledVeryBigHeightWidthNormal() throws Exception {
        createFolderAndInsertImage("test.jpg");
        
        this.mockMvc.perform(get(Uris.IMAGE + "{imageName:.+}/{width}/{height}", "test.jpg", 1500, 15000).accept("image/jpg"))
                    .andExpect(status().isOk());
    }

    @Test
    public void testGetImageScaledBadRequest() throws Exception {
        this.mockMvc.perform(get(Uris.IMAGE + "{imageName:.+}/{width}/{height}", "testttt.jpg", 500, 500).accept("image/jpg"))
                    .andExpect(status().isBadRequest());
    }
    
    private void createFolderAndInsertImage(String imageName){
        Path imageFileSrc = new File(DatabasePopulator.DUMMY_IMAGE_FOLDER + imageName).toPath();
        String imageFileDest = FileSystemInjector.getImageUploadFolder() + "/" + imageName;
        
        try {
            File newImageFile = new File(imageFileDest);
            newImageFile.createNewFile();
            Files.copy(imageFileSrc, newImageFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e1) {
            LOG.error("Error occured while copying " + imageFileSrc.toString() + " to " + imageFileDest + "!");
        }
    }
}
