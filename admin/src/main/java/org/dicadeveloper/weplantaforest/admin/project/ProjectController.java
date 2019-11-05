package org.dicadeveloper.weplantaforest.admin.project;

import java.io.IOException;
import java.util.List;

import javax.transaction.Transactional;

import org.dicadeveloper.weplantaforest.admin.FileSystemInjector;
import org.dicadeveloper.weplantaforest.admin.support.Uris;
import org.dicadeveloper.weplantaforest.admin.tree.TreeRepository;
import org.dicadeveloper.weplantaforest.admin.views.Views;
import org.dicadeveloper.weplantaforest.common.image.ImageHelper;
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
            Project project = _projectRepository.findById(projectId).orElse(null);
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
            project = _projectRepository.save(project);
            return new ResponseEntity<>(project.getId(),HttpStatus.OK);
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
            if (_projectRepository.existsById(id)) {
                Project project = _projectRepository.findById(id).orElse(null);
                List<ProjectArticle> articles = _projectArticleRepository.findByProject(project);
                List<ProjectImage> images = _projectImageRepository.findProjectImagesToProjectByProjectId(id);
                _projectImageRepository.deleteAll(images);
                _projectArticleRepository.deleteAll(articles);
                _projectRepository.deleteById(id);
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
            return new ResponseEntity<>("Du kannst diesen Projektartikel nicht löschen, da davon schon Bäume gepflanzt wurden.", HttpStatus.BAD_REQUEST);
        } else {
            _projectArticleRepository.deleteById(articleId);
            return new ResponseEntity<>(HttpStatus.OK);

        }
    }
    
    @RequestMapping(value = Uris.PROJECT_MAIN_IMAGE, method = RequestMethod.POST)
    @Transactional
    public ResponseEntity<?> addMainImage(@RequestParam Long projectId, @RequestParam("file") MultipartFile file) {
        Project project = _projectRepository.findById(projectId).orElse(null);
        
        if (project == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        else{
            String imageFolder = FileSystemInjector.getImageFolderForProjects();
            String imageName = project.getName() + "_mainImage" + file.getOriginalFilename().substring(file.getOriginalFilename().indexOf("."), file.getOriginalFilename().length() );
            try {
                imageName = _imageHelper.storeImage(file, imageFolder, imageName, true);
                project.setImageFileName(imageName);
                _projectRepository.save(project);
            } catch (IOException e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return new ResponseEntity<>( HttpStatus.OK);            
        }
    }

    @RequestMapping(value = Uris.PROJECT_IMAGE_CREATE_EDIT, method = RequestMethod.POST)
    @Transactional
    public ResponseEntity<?> createEditProjectImageData(@RequestBody ProjectImageRequest projectImageRequest) {
        Project project = _projectRepository.findById(projectImageRequest.getProjectId()).orElse(null);
        
        if (project == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        else{
            ProjectImage projectImage;
            if(projectImageRequest.getImageId() != null){
                projectImage = _projectImageRepository.findById(projectImageRequest.getImageId()).orElse(null);
                projectImage.setTitle(projectImageRequest.getTitle());
                projectImage.setDescription(projectImageRequest.getDescription());
            }else{
                projectImage = new ProjectImage(projectImageRequest.getTitle(), projectImageRequest.getDescription(),System.currentTimeMillis());             
            }
            projectImage.setProject(project);
            _projectImageRepository.save(projectImage);
            return new ResponseEntity<>(projectImage.getImageId(), HttpStatus.OK);            
        }
    }
    

    @RequestMapping(value = Uris.PROJECT_IMAGE_UPLOAD, method = RequestMethod.POST)
    @Transactional
    public ResponseEntity<?> uploadUserImage(@RequestParam Long imageId, @RequestParam("file") MultipartFile file) {
            ProjectImage projectImage =  _projectImageRepository.findById(imageId).orElse(null);
            String imageFolder = FileSystemInjector.getImageFolderForProjects();
            String imageName ;
            if(projectImage.getImageFileName() != null){
                imageName = projectImage.getImageFileName();
            }else{
                String imageType = file.getOriginalFilename().substring(file.getOriginalFilename().indexOf("."), file.getOriginalFilename().length());
                imageName = "project_" + projectImage.getProject().getId() + "image_1" + imageType;
            }
            if (!file.isEmpty()) {
                try {
                    imageName = _imageHelper.storeImage(file, imageFolder, imageName, false);
                    projectImage.setImageFileName(imageName);
                    _projectImageRepository.save(projectImage);
                    return new ResponseEntity<>(HttpStatus.OK);
                } catch (IOException e) {        
                    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
  
    }
    
    @RequestMapping(value = Uris.PROJECT_IMAGE_DELETE, method = RequestMethod.POST)
    public ResponseEntity<?> removeProjectImage(@RequestParam Long projectImageId, @RequestParam String imageFileName) {
        _projectImageRepository.deleteById(projectImageId);
        //TODO: delete image file on filesystem
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
