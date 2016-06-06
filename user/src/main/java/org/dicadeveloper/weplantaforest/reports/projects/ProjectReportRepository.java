package org.dicadeveloper.weplantaforest.reports.projects;

import org.dicadeveloper.weplantaforest.projects.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ProjectReportRepository extends CrudRepository<Project, Long> {

    public final static String FIND_ALL_PROJECTS_QUERY = "SELECT new org.dicadeveloper.weplantaforest.reports.projects.ProjectReportData( "
            + "project.id, project.name, project.imageFileName, project.description, project.longitude, project.latitude, SUM(articles.amount), "
            + "COALESCE((SELECT SUM(tree.amount) FROM Tree as tree WHERE tree.projectArticle IN(SELECT article FROM ProjectArticle article WHERE article.project = project)),0), project.shopActive) "
            + "FROM Project project JOIN project.articles articles WHERE articles.project = project GROUP BY project.name";

    public final static String FIND_ALL_PROJECTS_COUNT_QUERY = "SELECT count(distinct project.name) from Project project";

    public final static String FIND_POJECT_DATA_BY_NAME = "SELECT new org.dicadeveloper.weplantaforest.reports.projects.ProjectReportData( "
            + "project.id, project.name, project.imageFileName, project.description, project.longitude, project.latitude, SUM(articles.amount), "
            + "COALESCE((SELECT SUM(tree.amount) FROM Tree as tree WHERE tree.projectArticle IN(SELECT article FROM ProjectArticle article WHERE article.project = project)),0), project.shopActive) "
            + "FROM Project project JOIN project.articles articles WHERE project.name = :projectName "
            + "AND articles.project = project";
    
    @Query(value = FIND_ALL_PROJECTS_QUERY, countQuery = FIND_ALL_PROJECTS_COUNT_QUERY)
    Page<ProjectReportData> getAllProjects(Pageable page);
    
    @Query(value = FIND_POJECT_DATA_BY_NAME)
    ProjectReportData getProjectDataByProjectName(@Param("projectName") String projectName);

}
