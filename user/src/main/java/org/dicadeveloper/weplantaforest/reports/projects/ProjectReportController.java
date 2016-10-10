package org.dicadeveloper.weplantaforest.reports.projects;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.FileSystemInjector;
import org.dicadeveloper.weplantaforest.common.image.ImageHelper;
import org.dicadeveloper.weplantaforest.projects.ProjectArticle;
import org.dicadeveloper.weplantaforest.projects.ProjectArticleRepository;
import org.dicadeveloper.weplantaforest.projects.ProjectImage;
import org.dicadeveloper.weplantaforest.projects.ProjectImageRepository;
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
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class ProjectReportController {

    protected final Log LOG = LogFactory.getLog(ProjectReportController.class.getName());

    private @NonNull ProjectReportRepository _projectReportRepository;

    private @NonNull ProjectImageRepository _projectImageRepository;
    
    private @NonNull ProjectArticleRepository _projectArticleRepository;
    
    private @NonNull TreeRepository _treeRepository;

    private @NonNull ImageHelper _imageHelper;

    @RequestMapping(value = Uris.REPORT_ALL_PROJECTS, method = RequestMethod.GET)
    public Page<ProjectReportData> getAllProjects(@Param(value = "page") int page, @Param(value = "size") int size) {
        return _projectReportRepository.getAllProjects(new PageRequest(page, size));
    }
    
    @RequestMapping(value = Uris.REPORT_ACTIVE_PROJECTS, method = RequestMethod.GET)
    public List<ProjectReportData> getActiveProjects() {
        return _projectReportRepository.getActiveProjects();
    }

    @RequestMapping(value = Uris.PROJECT_SEARCH_NAME + "{projectName}", method = RequestMethod.GET)
    public ProjectReportData getProjectDataByName(@PathVariable(value = "projectName") String projectName) {
        return _projectReportRepository.getProjectDataByProjectName(projectName);
    }

    @RequestMapping(value = Uris.PROJECT_SEARCH_NAME + "/extended/" + "{projectName}", method = RequestMethod.GET)
    public ProjectReportExtendedData getExtendedProjectDataByName(@PathVariable(value = "projectName") String projectName) {
        ProjectReportExtendedData projectReportExtendedData = new ProjectReportExtendedData();
        ProjectReportData projectReportData = _projectReportRepository.getProjectDataByProjectName(projectName);
        List<ProjectImage> images = _projectImageRepository.findProjectImagesToProjectByProjectId(projectReportData.getProjectId());

        projectReportExtendedData.setProjectReportData(projectReportData);
        projectReportExtendedData.setImages(images);

        return projectReportExtendedData;
    }

    @RequestMapping(value = Uris.PROJECT_IMAGE + "{projectName}/{imageName:.+}/{width}/{height}", method = RequestMethod.GET, headers = "Accept=image/jpeg, image/jpg, image/png, image/gif")
    public ResponseEntity<?> getProjectImage(HttpServletResponse response, @PathVariable(value = "projectName") String projectName, @PathVariable(value = "imageName") String imageName,
            @PathVariable int width, @PathVariable int height) {
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
        for(ProjectArticle article: articles){
            article.setAlreadyPlanted(_treeRepository.countAlreadyPlantedTreesByProjectArticle(article));
        }        
        return articles;
    }

}
