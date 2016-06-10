package org.dicadeveloper.weplantaforest.inject;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.File;

import org.dicadeveloper.weplantaforest.FileSystemInjector;
import org.dicadeveloper.weplantaforest.WeplantaforestArticleManagerApplication;
import org.dicadeveloper.weplantaforest.articles.ArticleRepository;
import org.dicadeveloper.weplantaforest.articles.ParagraphRepository;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.dev.inject.DatabasePopulatorForArticleManager;
import org.dicadeveloper.weplantaforest.user.UserRepository;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = WeplantaforestArticleManagerApplication.class)
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class DatabasePopulatorTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private DatabasePopulatorForArticleManager _databasePopulator;

    @Autowired
    private UserRepository _userRepository;

    @Autowired
    private ArticleRepository _articleRepository;

    @Autowired
    private ParagraphRepository _paragraphRepository;

    @Test
    public void testInsertUsers() throws Exception {
        _databasePopulator.insertUsers();
        assertThat(_userRepository.count()).isEqualTo(4);
    }

    @Test
    public void testInsertArticles() throws Exception {
        _databasePopulator.insertUsers();
        _databasePopulator.insertArticles();
        assertThat(_articleRepository.count()).isEqualTo(100);
    }

    @Test
    public void testInsertParagraphsToArticles() throws Exception {
        _databasePopulator.insertUsers();
        _databasePopulator.insertArticles();
        _databasePopulator.insertParagraphsToArticles();
        assertThat(_paragraphRepository.count()).isEqualTo(300);
    }
    
    @Test
    public void testcreateProjectFoldersAndInsertMainImages() {
        _databasePopulator.insertUsers();
        _databasePopulator.insertArticles();
        _databasePopulator.createArticleImageFoldersAndAddImage();
        
        File articleTopFolder = new File(FileSystemInjector.getImageUploadFolder());

        int articleFolderCount = articleTopFolder.listFiles().length;
        
        File[] articleFolders = articleTopFolder.listFiles();
        
        assertThat(_articleRepository.count()).isEqualTo(articleFolderCount);
        
        for(int i = 0; i < articleFolders.length; i++){
            assertThat(articleFolders[i].listFiles().length).isEqualTo(1);
        }
    }

}
