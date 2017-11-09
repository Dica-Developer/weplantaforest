package org.dicadeveloper.weplantaforest.articlemanager.inject;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.File;

import org.dicadeveloper.weplantaforest.articlemanager.FileSystemInjector;
import org.dicadeveloper.weplantaforest.articlemanager.articles.ArticleRepository;
import org.dicadeveloper.weplantaforest.articlemanager.articles.ParagraphRepository;
import org.dicadeveloper.weplantaforest.articlemanager.dev.inject.DatabasePopulatorForArticleManager;
import org.dicadeveloper.weplantaforest.articlemanager.user.UserRepository;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
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
        assertThat(_userRepository.count()).isEqualTo(16);
    }

    @Test
    public void testInsertArticles() throws Exception {
        _databasePopulator.insertUsers();
        _databasePopulator.insertArticles();
        assertThat(_articleRepository.count()).isEqualTo(115);
    }

    @Test
    public void testInsertParagraphsToArticles() throws Exception {
        _databasePopulator.insertUsers();
        _databasePopulator.insertArticles();
        _databasePopulator.insertParagraphsToArticles();
        assertThat(_paragraphRepository.count()).isEqualTo(345);
    }
    
    @Test
    public void testcreateProjectFoldersAndInsertMainImages() {
        _databasePopulator.insertUsers();
        _databasePopulator.insertArticles();
        _databasePopulator.addImagesToArticleFolder();

        int articleFolderContentCount = new File(FileSystemInjector.getArticleFolder()).listFiles().length; 
        assertThat(_articleRepository.count()).isEqualTo(articleFolderContentCount );
    }

}
