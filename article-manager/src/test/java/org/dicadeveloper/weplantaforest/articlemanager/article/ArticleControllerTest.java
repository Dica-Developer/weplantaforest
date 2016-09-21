package org.dicadeveloper.weplantaforest.articlemanager.article;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.dicadeveloper.weplantaforest.articlemanager.FileSystemInjector;
import org.dicadeveloper.weplantaforest.articlemanager.WeplantaforestArticleManagerApplication;
import org.dicadeveloper.weplantaforest.articlemanager.articles.Article;
import org.dicadeveloper.weplantaforest.articlemanager.articles.Article.ArticleType;
import org.dicadeveloper.weplantaforest.articlemanager.articles.ArticleRepository;
import org.dicadeveloper.weplantaforest.articlemanager.articles.Paragraph;
import org.dicadeveloper.weplantaforest.articlemanager.articles.ParagraphRepository;
import org.dicadeveloper.weplantaforest.articlemanager.testSupport.DbInjecter;
import org.dicadeveloper.weplantaforest.articlemanager.user.UserRepository;
import org.dicadeveloper.weplantaforest.common.support.Language;
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
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@SpringApplicationConfiguration(classes = WeplantaforestArticleManagerApplication.class)
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class ArticleControllerTest {

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
    private ArticleRepository _articleRepository;

    @Autowired
    private ParagraphRepository _paragraphRepository;

    @Before
    public void setup() {
        mockMvc = webAppContextSetup(this.webApplicationContext).build();
    }

    @After
    public void cleanUp() {
        TestUtil.deleteFilesInDirectory(new File(FileSystemInjector.getArticleFolder()));
    }

    @Test
    @Transactional
    public void testCreateArticle() throws Exception {
        _dbInjecter.injectUser("Adam");

        Article article = new Article();
        article.setArticleType(ArticleType.BLOG);
        article.setCreatedOn(1000000L);
        article.setIntro("intro bintro blablabla");
        article.setLang(Language.DEUTSCH);
        article.setLastEditedOn(2000000L);
        article.setOwner(_userRepository.findByName("Adam"));
        article.setTitle("created Article!");
        article.setVisible(true);

        List<Paragraph> paragraphs = new ArrayList<>();
        Paragraph paragraph = new Paragraph();
        paragraph.setTitle("title title title");
        paragraph.setText("paragraph text text text");

        paragraphs.add(paragraph);
        article.setParagraphs(paragraphs);

        mockMvc.perform(post("/article/create").contentType(TestUtil.APPLICATION_JSON_UTF8)
                                               .content(TestUtil.convertObjectToJsonBytes(article)))
               .andExpect(status().isOk());

        assertThat(_articleRepository.count()).isEqualTo(1L);

        Article createdArticle = _articleRepository.findOne(1L);
        assertThat(createdArticle.getParagraphs()).isNotNull();
        assertThat(createdArticle.getParagraphs()
                                 .size()).isEqualTo(1);
    }

    @Test
    public void testDeleteArticle() throws IOException, Exception {
        _dbInjecter.injectUser("manager");
        Article article = _dbInjecter.injectArticle("title", "intro", ArticleType.BLOG, "manager", 1000000L);
        _dbInjecter.injectParagraphToArticle(article, "paragraph title", "paragraph text");

        assertThat(_articleRepository.count()).isEqualTo(1L);
        assertThat(_paragraphRepository.count()).isEqualTo(1L);

        mockMvc.perform(delete("/article/delete").contentType(MediaType.APPLICATION_JSON)
                                                 .param("articleId", "1"))
               .andExpect(status().isOk());

        assertThat(_articleRepository.count()).isEqualTo(0);
        assertThat(_paragraphRepository.count()).isEqualTo(0);
    }

    @Test
    public void testAddArticleImage() throws Exception {
        _dbInjecter.injectUser("manager");
        _dbInjecter.injectArticle("title", "intro", ArticleType.BLOG, "manager", 1000000L);

        FileInputStream fileInputStream = new FileInputStream("src/test/resources/images/" + "article1.jpg");
        MockMultipartFile image = new MockMultipartFile("file", fileInputStream);

        MediaType mediaType = new MediaType("multipart", "form-data");

        mockMvc.perform(MockMvcRequestBuilders.fileUpload("/article/upload/image")
                                              .file(image)
                                              .contentType(mediaType)
                                              .param("articleId", "1")
                                              .param("imgType", "jpg"))
               .andExpect(status().isOk());

        assertThat(_articleRepository.findOne(1L)
                                     .getImageFileName()).isEqualTo("main.jpg");
        TestUtil.deleteFilesInDirectory(new File(FileSystemInjector.getArticleFolder() + "/1"));

    }

    @Test
    public void testAddParagraphImage() throws Exception {
        _dbInjecter.injectUser("manager");
        Article article = _dbInjecter.injectArticle("title", "intro", ArticleType.BLOG, "manager", 1000000L);
        _dbInjecter.injectParagraphToArticle(article, "paragraph title", "paragraph text");

        FileInputStream fileInputStream = new FileInputStream("src/test/resources/images/" + "article1.jpg");
        MockMultipartFile image = new MockMultipartFile("file", fileInputStream);

        MediaType mediaType = new MediaType("multipart", "form-data");

        mockMvc.perform(MockMvcRequestBuilders.fileUpload("/paragraph/upload/image")
                                              .file(image)
                                              .contentType(mediaType)
                                              .param("articleId", "1")
                                              .param("paragraphId", "1")
                                              .param("imgType", "jpg"))
               .andExpect(status().isOk());
        assertThat(_paragraphRepository.findOne(1L)
                                       .getImageFileName()).isEqualTo("paragraph_1.jpg");

        TestUtil.deleteFilesInDirectory(new File(FileSystemInjector.getArticleFolder() + "/1"));
    }
}
