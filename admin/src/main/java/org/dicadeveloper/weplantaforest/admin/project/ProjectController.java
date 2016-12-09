package org.dicadeveloper.weplantaforest.admin.project;

import java.io.IOException;
import java.util.List;

import javax.transaction.Transactional;

import org.dicadeveloper.weplantaforest.admin.FileSystemInjector;
import org.dicadeveloper.weplantaforest.admin.support.Uris;
import org.dicadeveloper.weplantaforest.admin.tree.TreeRepository;
import org.dicadeveloper.weplantaforest.common.image.ImageHelper;
import org.dicadeveloper.weplantaforest.views.Views;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class ProjectController {

    private @NonNull ProjectRepository _projectRepository;

    private @NonNull ProjectArticleRepository _projectArticleRepository;

    private @NonNull ProjectImageRepository _projectImageRepository;

    private @NonNull PriceRepository _priceRepository;
    
    private @NonNull TreeRepository _treeRepository;

    private @NonNull ImageHelper _imageHelper;

    @RequestMapping(value = Uris.PROJECTS, method = RequestMethod.GET)
    @JsonView(Views.ProjectNameAndId.class)
    public ResponseEntity<?> getAllProjects() {
        try {
            Iterable<Project> projects = _projectRepository.findAll();
            return new ResponseEntity<>(projects, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = Uris.PROJECT, method = RequestMethod.GET)
    @JsonView(Views.ProjectData.class)
    public ResponseEntity<?> getProject(@RequestParam long projectId) {
        try {
            Project project = _projectRepository.findOne(projectId);
            return new ResponseEntity<>(project, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = Uris.ARTICLES, method = RequestMethod.GET)
    @JsonView(Views.ProjectArticle.class)
    public ResponseEntity<?> getArticlesForProject(@RequestParam long projectId) {
        try {
            List<ProjectArticle> articles = _projectArticleRepository.findByProjectId(projectId);
            return new ResponseEntity<>(articles, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = Uris.IMAGES, method = RequestMethod.GET)
    @JsonView(Views.ProjectImage.class)
    public ResponseEntity<?> getImagesForProject(@RequestParam long projectId) {
        try {
            List<ProjectImage> articles = _projectImageRepository.findProjectImagesToProjectByProjectId(projectId);
            return new ResponseEntity<>(articles, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = Uris.PROJECT_EDIT, method = RequestMethod.POST)
    public ResponseEntity<?> editProject(@RequestBody Project project) {
        try {
            _projectRepository.save(project);
            if (project.getArticles() != null) {
                for (ProjectArticle article : project.getArticles()) {
                    Price updatedPrice = article.getPrice();
                    if (updatedPrice != null) {
                        _priceRepository.save(updatedPrice);
                    }

                    article.setProject(project);
                    _projectArticleRepository.save(article);
                }
            }
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = Uris.PROJECT_CREATE, method = RequestMethod.POST)
    public ResponseEntity<?> createProject(@RequestBody Project project) {
        try {
            _projectRepository.save(project);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = Uris.PROJECT_DELETE, method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteProject(@RequestParam Long id) {
        try {
            if (_projectRepository.exists(id)) {
                Project project = _projectRepository.findOne(id);
                List<ProjectArticle> articles = _projectArticleRepository.findByProject(project);
                List<ProjectImage> images = _projectImageRepository.findProjectImagesToProjectByProjectId(id);
                _projectImageRepository.delete(images);
                _projectArticleRepository.delete(articles);
                _projectRepository.delete(id);
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = Uris.PROJECT_REMOVE_ARTICLE, method = RequestMethod.POST)
    public ResponseEntity<?> removeArticle(@RequestParam Long articleId) {
        if (_treeRepository.countAlreadyPlantedTreesByProjectArticleId(articleId) > 0) {
            return new ResponseEntity<>("Du kannst diesen Projektartikel nicht löschen, da davon schon Bäume gepflanzt wurden.",HttpStatus.BAD_REQUEST);
        } else {
            _projectArticleRepository.delete(articleId);
            return new ResponseEntity<>(HttpStatus.OK);

        }
    }

    @RequestMapping(value = Uris.PROJECT_IMAGE_UPLOAD, method = RequestMethod.POST)
    @Transactional
    public ResponseEntity<?> addProjectImage(@RequestParam String projectName, @RequestParam String title, @RequestParam String description, @RequestParam String imgType, @RequestParam Long date,
            @RequestParam("file") MultipartFile file) {
        String folder = FileSystemInjector.getImageFolderForProjects() + "/" + projectName;
        String imageName = projectName + "." + imgType;

        Project project = _projectRepository.findByName(projectName);
        if (project == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if (!file.isEmpty()) {
            try {
                imageName = _imageHelper.storeImage(file, folder, imageName, false);

                ProjectImage projectImage = new ProjectImage();
                projectImage.setDescription(description);
                projectImage.setImageFileName(imageName);
                projectImage.setProject(project);
                projectImage.setTitle(title);
                projectImage.setDate(date);

                _projectImageRepository.save(projectImage);
                return new ResponseEntity<>(HttpStatus.OK);
            } catch (IOException e) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
