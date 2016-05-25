package org.dicadeveloper.weplantaforest.reports.projects;

import org.dicadeveloper.weplantaforest.projects.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ProjectReportRepository extends CrudRepository<Project, Long> {

    public final static String FIND_ACTIVE_PROJECTS_QUERY = "SELECT new org.dicadeveloper.weplantaforest.reports.projects.ProjectReportData( "
            + "project.name, project.description, project.longitude, project.latitude, SUM(articles.amount), "
            + "COALESCE((SELECT SUM(tree.amount) FROM Tree as tree WHERE tree.projectArticle IN(SELECT article FROM ProjectArticle article WHERE article.project = project)),0)) "
            + "FROM Project project JOIN project.articles articles WHERE project.shopActive = true "
            + "AND articles.project = project GROUP BY project.name";

    public final static String FIND_ACTIVE_PROJECTS_COUNT_QUERY = "SELECT count(distinct project.name) from Project project WHERE project.shopActive = true";

    @Query(value = FIND_ACTIVE_PROJECTS_QUERY, countQuery = FIND_ACTIVE_PROJECTS_COUNT_QUERY)
    Page<ProjectReportData> getActiveProjectData(Pageable page);

}
