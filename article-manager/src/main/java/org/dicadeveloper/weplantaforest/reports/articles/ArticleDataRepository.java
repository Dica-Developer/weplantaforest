package org.dicadeveloper.weplantaforest.reports.articles;

import java.util.List;

import org.dicadeveloper.weplantaforest.articles.Article;
import org.dicadeveloper.weplantaforest.articles.Article.ArticleType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ArticleDataRepository extends CrudRepository<Article, Long> {

    public final static String FIND_ARTICLES_BY_TYPE_QUERY = "SELECT new org.dicadeveloper.weplantaforest.reports.articles.ArticleData(article.id, article.title, article.intro, article.createdOn, article.owner.id, article.owner.name) "
            + "FROM Article article WHERE article.articleType = :articleType ORDER BY article.createdOn DESC";

    public final static String FIND_PARAGRAPHS_BY_ARTICLE_TITLE_QUERY = "SELECT new org.dicadeveloper.weplantaforest.reports.articles.ArticleContentData(paragraph.title, paragraph.text)"
            + " FROM Paragraph paragraph where paragraph.article.id = :articleId";

    @Query(value = FIND_ARTICLES_BY_TYPE_QUERY)
    Page<ArticleData> getArticlesByType(@Param("articleType") ArticleType articleType, Pageable page);

    @Query(value = FIND_PARAGRAPHS_BY_ARTICLE_TITLE_QUERY)
    List<ArticleContentData> getParagraphsByArticleId(@Param("articleId") long articleId);

}
