package org.dicadeveloper.weplantaforest.reports.projects;

import java.util.List;

import org.dicadeveloper.weplantaforest.projects.Project;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ProjectReportRepository extends CrudRepository<Project, Long> {

    public final static String FIND_ACTIVE_PROJECTS_QUERY = "SELECT new org.dicadeveloper.weplantaforest.reports.projects.ProjectReportData( "
            + "project.name, project.description, project.longitude, project.latitude, SUM(articles.amount), "
            + "COALESCE((SELECT SUM(tree.amount) FROM Tree as tree WHERE tree.projectArticle IN(SELECT article FROM ProjectArticle article WHERE article.project = project)),0)) "
            + "FROM Project project JOIN project.articles articles WHERE project.shopActive = true "
            + "AND articles.project = project GROUP BY project.name";

    @Query(value = FIND_ACTIVE_PROJECTS_QUERY)
    List<ProjectReportData> getActiveProjectData(Pageable page);

}
