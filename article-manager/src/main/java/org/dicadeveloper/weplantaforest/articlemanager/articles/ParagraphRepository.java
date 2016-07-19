package org.dicadeveloper.weplantaforest.articlemanager.articles;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ParagraphRepository extends CrudRepository<Paragraph, Long> {

    public final static String FIND_PARAGRAPHS_BY_ARTICLE_ID_QUERY = "SELECT paragraph FROM Paragraph paragraph where paragraph.article.id = :articleId";

    @Query(value = FIND_PARAGRAPHS_BY_ARTICLE_ID_QUERY)
    public List<Paragraph> getParagraphsByArticleId(@Param("articleId") long articleId);
}
