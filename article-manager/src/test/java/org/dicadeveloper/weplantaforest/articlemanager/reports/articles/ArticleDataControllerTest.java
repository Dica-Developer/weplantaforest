package org.dicadeveloper.weplantaforest.articlemanager.reports.articles;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.articlemanager.FileSystemInjector;
import org.dicadeveloper.weplantaforest.articlemanager.WeplantaforestArticleManagerApplication;
import org.dicadeveloper.weplantaforest.articlemanager.articles.Article.ArticleType;
import org.dicadeveloper.weplantaforest.articlemanager.dev.inject.DatabasePopulatorForArticleManager;
import org.dicadeveloper.weplantaforest.articlemanager.testSupport.DbInjecter;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
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
@SpringApplicationConfiguration(classes = WeplantaforestArticleManagerApplication.class)
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class ArticleDataControllerTest {
    
    protected final Log LOG = LogFactory.getLog(ArticleDataControllerTest.class.getName());

    private MockMvc mockMvc;

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    public DbInjecter _dbInjecter;

    @Before
    public void setup() {
        this.mockMvc = webAppContextSetup(this.webApplicationContext).build();
    }

    @Test
    public void testGetArticleByType() throws Exception {

        long createdOn = System.currentTimeMillis();

        _dbInjecter.injectUser("Adam");

        _dbInjecter.injectArticle("article title", "article blablabla", ArticleType.BLOG, "Adam", createdOn);

        this.mockMvc.perform(get("/articles/{articleType}?page=0&size=10", "BLOG").accept("application/json")).andExpect(status().isOk()).andExpect(jsonPath("$.content[0].id").value(1))
                .andExpect(jsonPath("$.content[0].title").value("article title")).andExpect(jsonPath("$.content[0].intro").value("article blablabla"))
                .andExpect(jsonPath("$.content[0].createdOn").value(createdOn)).andExpect(jsonPath("$.content[0].ownerId").value(1)).andExpect(jsonPath("$.content[0].ownerName").value("Adam"));
    }

    @Test
    public void testGetParagraphsByArticleTitle() throws Exception {

        long createdOn = System.currentTimeMillis();

        _dbInjecter.injectUser("Adam");

        _dbInjecter.injectArticle("article title", "article blablabla", ArticleType.BLOG, "Adam", createdOn)
                .injectParagraphToArticle("article title", "1st paragraph title", "1st paragraph blablablalba")
                .injectParagraphToArticle("article title", "2nd paragraph title", "2nd paragraph blablablalba");

        this.mockMvc.perform(get("/reports/article/{articleId}", 1).accept("application/json")).andExpect(status().isOk()).andExpect(jsonPath("$.[0].paragraphTitle").value("1st paragraph title"))
                .andExpect(jsonPath("$.[0].paragraphText").value("1st paragraph blablablalba"));
    }

    @Test
    public void testGetImageNonScaled() throws Exception {
        createArticleFolderAndInsertImage(1, "article1.jpg");
        
        this.mockMvc.perform(get("/article/image/{articleId}/{imageName:.+}", "1", "article1.jpg").accept("image/jpg")).andExpect(status().isOk());
    }

    @Test
    public void testGetImageNonScaledBadRequest() throws Exception {
        this.mockMvc.perform(get("/article/image/{articleId}/{imageName:.+}", "1", "wrongName.jpg").accept("image/jpg")).andExpect(status().isBadRequest());
    }

    @Test
    public void testGetImageScaled() throws Exception {
        createArticleFolderAndInsertImage(1, "article1.jpg");
        
        this.mockMvc.perform(get("/article/image/{articleId}/{imageName:.+}/{width}/{height}", "1", "article1.jpg", 500, 500).accept("image/jpg")).andExpect(status().isOk());
    }

    @Test
    public void testGetImageScaledBadRequest() throws Exception {
        this.mockMvc.perform(get("/article/image/{articleId}/{imageName:.+}/{width}/{height}", "1", "wrongName.jpg", 500, 500).accept("image/jpg")).andExpect(status().isBadRequest());
    }
    
    private void createArticleFolderAndInsertImage(long articleId, String imageName){
        new File(FileSystemInjector.getArticleFolder() + "/" +  articleId).mkdir();
        
        Path imageFileSrc = new File(DatabasePopulatorForArticleManager.DUMMY_IMAGE_FOLDER + imageName).toPath();
        String imageFileDest = FileSystemInjector.getArticleFolder() + "/" + articleId + "/" + imageName;
        
        try {
            File newImageFile = new File(imageFileDest);
            newImageFile.createNewFile();
            Files.copy(imageFileSrc, newImageFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e1) {
            LOG.error("Error occured while copying " + imageFileSrc.toString() + " to " + imageFileDest + "!");
        }
    }

}
