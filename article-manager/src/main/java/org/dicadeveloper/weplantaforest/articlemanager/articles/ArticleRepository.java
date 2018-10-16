package org.dicadeveloper.weplantaforest.articlemanager.articles;

import java.util.List;

import org.dicadeveloper.weplantaforest.articlemanager.articles.Article.ArticleType;
import org.dicadeveloper.weplantaforest.common.support.Language;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ArticleRepository extends CrudRepository<Article, Long> {

    public final static String FIND_ARTICLES_BY_TYPE_QUERY = "SELECT article FROM Article article WHERE article.articleType = :articleType AND article.lang = :language AND article.visible = true ORDER BY article.createdOn ASC";

    public final static String FIND_ARTICLES_BY_TYPE_PAGING_QUERY = "SELECT article FROM Article article WHERE article.articleType = :articleType AND article.lang = :language AND article.visible = true ORDER BY article.createdOn DESC";

    @Query
    public List<Article> findAllByOrderByCreatedOnDesc();
    
    @Query
    public Article findByTitle(@Param("title") String title);

    @Query(value = FIND_ARTICLES_BY_TYPE_QUERY)
    List<Article> getArticlesByType(@Param("articleType") ArticleType articleType, @Param("language") Language language);

    @Query(value = FIND_ARTICLES_BY_TYPE_PAGING_QUERY)
    Page<Article> getArticlesByType(@Param("articleType") ArticleType articleType, @Param("language") Language language, Pageable page);

}
