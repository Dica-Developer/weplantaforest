package org.dicadeveloper.weplantaforest.reports.projects;

import java.util.List;

import org.dicadeveloper.weplantaforest.common.image.ImageHelper;
import org.dicadeveloper.weplantaforest.common.image.ImageHelper.ImageFolder;
import org.dicadeveloper.weplantaforest.projects.ProjectImage;
import org.dicadeveloper.weplantaforest.projects.ProjectImageRepository;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    private @NonNull ProjectImageRepository _projectImageRepository;

    private @NonNull ImageHelper _imageHelper;

    @RequestMapping(value = Uris.REPORT_ACTIVE_PROJECTS, method = RequestMethod.GET)
    public Page<ProjectReportData> getAllProjects(@Param(value = "page") int page, @Param(value = "size") int size) {
        return _projectReportRepository.getAllProjects(new PageRequest(page, size));
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

    @RequestMapping(value = Uris.PROJECT_IMAGE + "{projectName}/{imageName:.+}", method = RequestMethod.GET, headers = "Accept=image/jpeg, image/jpg, image/png, image/gif")
    public ResponseEntity<byte[]> getProjectImage(@PathVariable(value = "projectName") String projectName, @PathVariable(value = "imageName") String imageName) {
        try {
            byte[] imageBytes = _imageHelper.getByteArrayForImageName(imageName, ImageFolder.PROJECTS, projectName);
            return new ResponseEntity<>(imageBytes, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = Uris.PROJECT_IMAGE + "{projectName}/{imageName:.+}/{width}/{height}", method = RequestMethod.GET, headers = "Accept=image/jpeg, image/jpg, image/png, image/gif")
    public ResponseEntity<byte[]> getProjectImage(@PathVariable(value = "projectName") String projectName, @PathVariable(value = "imageName") String imageName, @PathVariable int width,
            @PathVariable int height) {
        byte[] imageBytes = _imageHelper.getByteArrayForImageName(imageName, ImageFolder.PROJECTS, projectName, width, height);
        if (imageBytes.length == 0) {
            return new ResponseEntity<>(imageBytes, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

}
