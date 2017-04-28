package org.dicadeveloper.weplantaforest.projects;

import java.util.List;

import org.dicadeveloper.weplantaforest.treetypes.TreeType;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ProjectArticleRepository extends CrudRepository<ProjectArticle, Long> {

    public final static String FIND_ARTICLES_BY_PROJECT_NAME_QUERY = "SELECT projectArticle FROM ProjectArticle projectArticle WHERE projectArticle.project.name = :projectName";
    
    @Query
    public List<ProjectArticle> findByProject(@Param("project") Project project);
    
    @Query(value = FIND_ARTICLES_BY_PROJECT_NAME_QUERY)
    public List<ProjectArticle> findByProjectName(@Param("projectName") String projectName);

    @Query
    public ProjectArticle findByProjectAndTreeType(@Param("project") Project project,
            @Param("treeType") TreeType treeType);

    @Query(value = "SELECT article.articleId from ProjectArticle article where article.project.name = :projectName and article.treeType.name = :treeTypeName")
    public Long findArticleIdByProjectAndTreeType(@Param("projectName") String projectName,
            @Param("treeTypeName") String treeTypeName);
    
    @Query(value = "SELECT article from ProjectArticle article where article.project.name = :projectName and article.treeType.name = :treeTypeName")
    public ProjectArticle findArticleByProjectAndTreeType(@Param("projectName") String projectName,
            @Param("treeTypeName") String treeTypeName);

}
