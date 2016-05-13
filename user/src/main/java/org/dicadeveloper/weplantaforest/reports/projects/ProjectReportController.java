package org.dicadeveloper.weplantaforest.reports.projects;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ProjectReportController {

    private @NonNull ProjectReportRepository _projectRepository;

    @RequestMapping(value = "/reports/activeProjects", method = RequestMethod.GET)
    public List<ProjectReportData> getActiveProjectData() {
        return _projectRepository.getActiveProjectData(new PageRequest(0, 5));
    }

}
