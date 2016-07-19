package org.dicadeveloper.weplantaforest.articlemanager.reports.articles;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.dicadeveloper.weplantaforest.articlemanager.WeplantaforestArticleManagerApplication;
import org.dicadeveloper.weplantaforest.articlemanager.articles.Article;
import org.dicadeveloper.weplantaforest.articlemanager.articles.Article.ArticleType;
import org.dicadeveloper.weplantaforest.articlemanager.articles.ArticleRepository;
import org.dicadeveloper.weplantaforest.articlemanager.testSupport.DbInjecter;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = WeplantaforestArticleManagerApplication.class)
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class ArticleDataRepositoryIntegrationTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    public DbInjecter _dbInjecter;

    @Autowired
    private ArticleDataRepository _articleDataRepository;
    
    @Autowired
    private ArticleRepository _articleRepository;

    @Test
    public void getArticlesByType() {
        long createdOn = System.currentTimeMillis();

        _dbInjecter.injectUser("Adam");

        _dbInjecter.injectArticle("article title", "article blablabla", ArticleType.BLOG, "Adam", createdOn);

        _dbInjecter.injectArticle("later article title", "article more blablabla", ArticleType.BLOG, "Adam", createdOn - 1000000);

        Page<ArticleData> articles = _articleDataRepository.getArticlesByType(ArticleType.BLOG, new PageRequest(0, 3));

        assertThat(articles.getTotalElements()).isEqualTo(2);
        assertThat(articles.getContent()
                           .get(0)
                           .getId()).isEqualTo(1L);
        assertThat(articles.getContent()
                           .get(0)
                           .getTitle()).isEqualTo("article title");
        assertThat(articles.getContent()
                           .get(0)
                           .getIntro()).isEqualTo("article blablabla");
        assertThat(articles.getContent()
                           .get(0)
                           .getCreatedOn()).isEqualTo(createdOn);
        assertThat(articles.getContent()
                           .get(0)
                           .getOwnerId()).isEqualTo(1);
        assertThat(articles.getContent()
                           .get(0)
                           .getOwnerName()).isEqualTo("Adam");
    }

    @Test
    public void testGetParagraphsByArticleTitle() {
        long createdOn = System.currentTimeMillis();

        _dbInjecter.injectUser("Adam");

        Article article = _dbInjecter.injectArticle("article title", "article blablabla", ArticleType.BLOG, "Adam", createdOn);

        System.out.println("articles: " + _articleRepository.count());
        System.out.println("paragraphs: " + _articleDataRepository.getParagraphsByArticleId(1).size());
        
        _dbInjecter.injectParagraphToArticle(article, "1st paragraph title", "1st paragraph blablablalba");

        System.out.println("articles: " + _articleRepository.count());
        System.out.println("paragraphs: " + _articleDataRepository.getParagraphsByArticleId(1).size());
        
        _dbInjecter.injectParagraphToArticle(article, "2nd paragraph title", "2nd paragraph blablablalba");

        System.out.println("articles: " + _articleRepository.count());
        System.out.println("paragraphs: " + _articleDataRepository.getParagraphsByArticleId(1).size());
        
        List<ArticleContentData> articles = _articleDataRepository.getParagraphsByArticleId(1);

        assertThat(articles.size()).isEqualTo(2);
        assertThat(articles.get(0)
                           .getParagraphTitle()).isEqualTo("1st paragraph title");
        assertThat(articles.get(0)
                           .getParagraphText()).isEqualTo("1st paragraph blablablalba");
    }

}
