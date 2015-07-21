package org.dicadeveloper.weplantaforest.projects;

import java.util.ArrayList;
import java.util.List;

import org.dicadeveloper.weplantaforest.base.GenericServiceImpl;
import org.dozer.DozerBeanMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProjectServiceImpl extends GenericServiceImpl<Project, ProjectDto, Long> implements ProjectService {

    @Autowired
    public ProjectServiceImpl(DozerBeanMapper mapper, @Qualifier("projectRepository") ProjectRepository projectRespository) {
        super(mapper, projectRespository);
    }

    @Override
    public Page<ProjectDto> findAllActive(Pageable pageable) {
        List<ProjectDto> result = new ArrayList<ProjectDto>(pageable.getPageSize());
        Page<Project> allEntitiesInPage = ((ProjectRepository) _repository).findAllActive(pageable);
        for (Project project : allEntitiesInPage) {
            result.add(_mapper.map(project, _dtoClass));
        }
        Page<ProjectDto> results = new PageImpl<ProjectDto>(result, pageable, allEntitiesInPage.getTotalElements());
        return results;
    }
}
