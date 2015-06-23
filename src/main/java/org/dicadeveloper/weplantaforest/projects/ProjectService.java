package org.dicadeveloper.weplantaforest.projects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    private ProjectRepository _projectRespository;

    @Autowired
    public ProjectService(@Qualifier("projectRepository") ProjectRepository projectRespository) {
        _projectRespository = projectRespository;
    }

    public Page<ProjectDto> findAll(Pageable pageable) {
        // TODO Auto-generated method stub
        return null;
    }
}
