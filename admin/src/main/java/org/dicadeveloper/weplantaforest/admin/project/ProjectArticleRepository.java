package org.dicadeveloper.weplantaforest.admin.project;

import java.util.List;

import org.dicadeveloper.weplantaforest.admin.treeType.TreeType;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ProjectArticleRepository extends CrudRepository<ProjectArticle, Long> {

    public final static String FIND_ARTICLES_TO_PROJECT_BY_PROJECT_ID = "SELECT article FROM ProjectArticle article WHERE article.project.id = :projectId";
    
    @Query
    public List<ProjectArticle> findByProject(@Param("project") Project project);

    
    @Query(value = FIND_ARTICLES_TO_PROJECT_BY_PROJECT_ID)
    public List<ProjectArticle> findByProjectId(@Param("projectId") long projectId);
    
    @Query
    public ProjectArticle findByProjectAndTreeType(@Param("project") Project project,
            @Param("treeType") TreeType treeType);

    @Query(value = "SELECT article.articleId from ProjectArticle article where article.project.name = :projectName and article.treeType.name = :treeTypeName")
    public Long findArticleIdByProjectAndTreeType(@Param("projectName") String projectName,
            @Param("treeTypeName") String treeTypeName);

}
