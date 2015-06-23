package org.dicadeveloper.weplantaforest.projects;

import org.dicadeveloper.weplantaforest.services.GenericServiceImpl;
import org.dozer.DozerBeanMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class ProjectServiceImpl extends GenericServiceImpl<Project, ProjectDto, Long> implements ProjectService {

    @Autowired
    public ProjectServiceImpl(DozerBeanMapper mapper, @Qualifier("projectRepository") ProjectRepository projectRespository) {
        super(mapper, projectRespository);
    }
}
