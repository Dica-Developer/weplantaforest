package org.dicadeveloper.weplantaforest.reports.projects;

import org.dicadeveloper.weplantaforest.support.Uris;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ProjectReportController {

    private @NonNull ProjectReportRepository _projectReportRepository;

    @RequestMapping(value = Uris.REPORT_ACTIVE_PROJECTS, method = RequestMethod.GET)
    public Page<ProjectReportData> getAllProjects(@Param(value = "page") int page, @Param(value = "size") int size) {
        return _projectReportRepository.getAllProjects(new PageRequest(page, size));
    }

    @RequestMapping(value = Uris.PROJECT_SEARCH_NAME + "{projectName}", method = RequestMethod.GET)
    public ProjectReportData getProjectDataByName(@PathVariable(value = "projectName") String projectName) {
        return _projectReportRepository.getProjectDataByProjectName(projectName);
    }

}
