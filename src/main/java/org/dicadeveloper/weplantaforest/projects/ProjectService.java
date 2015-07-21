package org.dicadeveloper.weplantaforest.projects;

import org.dicadeveloper.weplantaforest.base.GenericService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProjectService extends GenericService<Project, ProjectDto, Long> {

    Page<ProjectDto> findAllActive(Pageable pageable);

}
