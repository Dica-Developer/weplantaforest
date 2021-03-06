package org.dicadeveloper.weplantaforest.projects;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ProjectImageRepository extends CrudRepository<ProjectImage, Long> {

    public final static String FIND_IMAGES_TO_PROJECT_BY_PROJECT_ID = "SELECT projectImage FROM ProjectImage projectImage WHERE projectImage.project.id = :projectId";

    @Query(value = FIND_IMAGES_TO_PROJECT_BY_PROJECT_ID)
    List<ProjectImage> findProjectImagesToProjectByProjectId(@Param("projectId") long projectId);

}
