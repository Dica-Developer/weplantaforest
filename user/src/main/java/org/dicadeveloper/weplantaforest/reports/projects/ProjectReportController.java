package org.dicadeveloper.weplantaforest.reports.projects;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.FileSystemInjector;
import org.dicadeveloper.weplantaforest.common.image.ImageHelper;
import org.dicadeveloper.weplantaforest.projects.Project;
import org.dicadeveloper.weplantaforest.projects.ProjectArticle;
import org.dicadeveloper.weplantaforest.projects.ProjectArticleRepository;
import org.dicadeveloper.weplantaforest.projects.ProjectImage;
import org.dicadeveloper.weplantaforest.projects.ProjectImageRepository;
import org.dicadeveloper.weplantaforest.projects.ProjectRepository;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.dicadeveloper.weplantaforest.views.Views;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ProjectReportController {

    protected final Log LOG = LogFactory.getLog(ProjectReportController.class.getName());

    private @NonNull ProjectReportRepository _projectReportRepository;

    private @NonNull ProjectRepository _projectRepository;

    private @NonNull ProjectImageRepository _projectImageRepository;

    private @NonNull ProjectArticleRepository _projectArticleRepository;

    private @NonNull TreeRepository _treeRepository;

    private @NonNull ImageHelper _imageHelper;

    @RequestMapping(value = Uris.REPORT_ALL_PROJECTS, method = RequestMethod.GET)
    public ResponseEntity<?> getAllProjects(@Param(value = "page") int page, @Param(value = "size") int size) {
        Page<ProjectReportData> projectReports = _projectReportRepository.getAllProjects(PageRequest.of(page, size));
        return new ResponseEntity<>(projectReports, HttpStatus.OK);
    }

    @RequestMapping(value = Uris.PROJECTS_PAGED, method = RequestMethod.GET)
    @JsonView(Views.ProjectDetails.class)
    public ResponseEntity<?> getAllProjectsPaged(@Param(value = "page") int page, @Param(value = "size") int size) {
        try {
            Iterable<Project> projects = _projectReportRepository.active(PageRequest.of(page, size));
            return new ResponseEntity<>(projects, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = Uris.REPORT_ACTIVE_PROJECTS, method = RequestMethod.GET)
    public ResponseEntity<?> getActiveProjects() {
        List<ProjectReportData> projectReports = _projectReportRepository.getActiveProjects();
        for(ProjectReportData project : projectReports) {
            List<ProjectImage> images = _projectImageRepository.findProjectImagesToProjectByProjectId(project.getProjectId());
            Project p = _projectRepository.findByName(project.getProjectName());
            project.positions = p.getPositions();
            if (images != null && !images.isEmpty()) {
                project.projectImageFileName = images.get(images.size() -1).getImageFileName();
            }
        }
        return new ResponseEntity<>(projectReports, HttpStatus.OK);
    }

    @RequestMapping(value = Uris.REPORT_INACTIVE_PROJECTS, method = RequestMethod.GET)
    public ResponseEntity<?> getInActiveProjects(@Param(value = "page") int page, @Param(value = "size") int size) {
        Page<ProjectReportData> projectReports = _projectReportRepository.getInActiveProjects(PageRequest.of(page, size));
        for (ProjectReportData project : projectReports.getContent()) {
            List<ProjectImage> images = _projectImageRepository.findProjectImagesToProjectByProjectId(project.getProjectId());
            if (images != null && !images.isEmpty()) {
                project.projectImageFileName = images.get(images.size() -1).getImageFileName();
            }
        }
        return new ResponseEntity<>(projectReports, HttpStatus.OK);
    }

    @RequestMapping(value = Uris.PROJECT_SEARCH_NAME + "{projectName}", method = RequestMethod.GET)
    public ResponseEntity<?> getProjectDataByName(@PathVariable(value = "projectName") String projectName) {
        ProjectReportData projectReportData = _projectReportRepository.getProjectDataByProjectName(projectName);
        return new ResponseEntity<>(projectReportData, HttpStatus.OK);
    }

    @RequestMapping(value = Uris.PROJECT_SEARCH_NAME + "/extended/" + "{projectName}", method = RequestMethod.GET)
    public ResponseEntity<?> getExtendedProjectDataByName(@PathVariable(value = "projectName") String projectName) {
        Project project = _projectRepository.findByName(projectName);
        ProjectReportExtendedData projectReportExtendedData = new ProjectReportExtendedData();
        ProjectReportData projectReportData = _projectReportRepository.getProjectDataByProjectName(projectName);
        List<ProjectImage> images = _projectImageRepository.findProjectImagesToProjectByProjectId(projectReportData.getProjectId());

        projectReportExtendedData.setProjectReportData(projectReportData);
        projectReportExtendedData.setImages(images);
        projectReportExtendedData.setPositions(project.getPositions());

        return new ResponseEntity<>(projectReportExtendedData, HttpStatus.OK);
    }

    @RequestMapping(value = Uris.PROJECT_IMAGE + "{imageName:.+}/{width}/{height}", method = RequestMethod.GET, headers = "Accept=image/jpeg, image/jpg, image/png, image/gif")
    public ResponseEntity<?> getProjectImage(HttpServletResponse response, @PathVariable(value = "imageName") String imageName, @PathVariable int width, @PathVariable int height) {
        String filePath = FileSystemInjector.getImageFolderForProjects() + "/" + imageName;
        try {
            _imageHelper.writeImageToOutputStream(response.getOutputStream(), filePath, width, height);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IOException e) {
            LOG.error("Error occured while trying to get image " + imageName + " in folder: " + filePath, e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = Uris.PROJECT_ARTICLES, method = RequestMethod.GET)
    @JsonView(Views.ProjectArticle.class)
    public List<ProjectArticle> getProjectArticles(@RequestParam String projectName) {
        List<ProjectArticle> articles = _projectArticleRepository.findByProjectName(projectName);
        for (ProjectArticle article : articles) {
            article.setAlreadyPlanted(_treeRepository.countAlreadyPlantedTreesByProjectArticle(article));
        }
        return articles;
    }

}
