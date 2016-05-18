package org.dicadeveloper.weplantaforest.articles;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ArticleRepository extends CrudRepository<Article, Long> {

    @Query
    public Article findByTitle(@Param("title") String title);

}
