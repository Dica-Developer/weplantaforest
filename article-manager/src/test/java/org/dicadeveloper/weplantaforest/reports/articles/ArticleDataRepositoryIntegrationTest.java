package org.dicadeveloper.weplantaforest.reports.articles;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.dicadeveloper.weplantaforest.WeplantaforestArticleManagerApplication;
import org.dicadeveloper.weplantaforest.articles.Article.ArticleType;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.testSupport.DbInjecter;
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
public class ArticleDataRepositoryIntegrationTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    public DbInjecter _dbInjecter;

    @Autowired
    private ArticleDataRepository _articleDataRepository;

    @Test
    public void getArticlesByType() {
        long createdOn = System.currentTimeMillis();

        _dbInjecter.injectUser("Adam");

        _dbInjecter.injectArticle("article title", "article blablabla", ArticleType.BLOG, "Adam", createdOn);

        List<ArticleData> articles = _articleDataRepository.getArticlesByType(ArticleType.BLOG);

        assertThat(articles.size()).isEqualTo(1);
        assertThat(articles.get(0)
                           .getTitle()).isEqualTo("article title");
        assertThat(articles.get(0)
                           .getIntro()).isEqualTo("article blablabla");
    }

    @Test
    public void testGetParagraphsByArticleTitle() {
        long createdOn = System.currentTimeMillis();

        _dbInjecter.injectUser("Adam");

        _dbInjecter.injectArticle("article title", "article blablabla", ArticleType.BLOG, "Adam", createdOn)
                   .injectParagraphToArticle("article title", "1st paragraph title", "1st paragraph blablablalba")
                   .injectParagraphToArticle("article title", "2nd paragraph title", "2nd paragraph blablablalba");

        List<ArticleContentData> articles = _articleDataRepository.getParagraphsByArticleTitle("article title");

        assertThat(articles.size()).isEqualTo(2);
        assertThat(articles.get(0)
                           .getParagraphTitle()).isEqualTo("1st paragraph title");
        assertThat(articles.get(0)
                           .getParagraphText()).isEqualTo("1st paragraph blablablalba");
    }

}
