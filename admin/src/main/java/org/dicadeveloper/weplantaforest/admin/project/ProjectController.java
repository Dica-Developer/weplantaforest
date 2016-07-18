package org.dicadeveloper.weplantaforest.admin.project;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.dicadeveloper.weplantaforest.admin.FileSystemInjector;
import org.dicadeveloper.weplantaforest.admin.support.Uris;
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

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class ProjectController {

    private @NonNull ProjectRepository _projectRepository;

    private @NonNull ProjectArticleRepository _projectArticleRepository;

    private @NonNull ProjectImageRepository _projectImageRepository;

    private @NonNull ImageHelper _imageHelper;

    @RequestMapping(value = Uris.PROJECT_CREATE, method = RequestMethod.POST)
    public ResponseEntity<?> createProject(@RequestBody Project project) {
        try {
            _projectRepository.save(project);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = Uris.PROJECT_DELETE, method = RequestMethod.POST)
    public ResponseEntity<?> deleteProject(@RequestParam Long id) {
        try {
            Project project = _projectRepository.findOne(id);
            List<ProjectArticle> articles = _projectArticleRepository.findByProject(project);
            _projectArticleRepository.delete(articles);
            _projectRepository.delete(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = Uris.PROJECT_ADD_ARTICLE, method = RequestMethod.POST)
    public ResponseEntity<?> addProjectArticle(@RequestBody ProjectArticle projectArticle, @RequestParam Long projectId) {
        try {
            Project project = _projectRepository.findOne(projectId);

            if (project.getArticles() != null) {
                project.getArticles()
                       .add(projectArticle);
            } else {
                List<ProjectArticle> articleList = new ArrayList<>();
                articleList.add(projectArticle);
                project.setArticles(articleList);
            }
            _projectRepository.save(project);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = Uris.PROJECT_REMOVE_ARTICLE, method = RequestMethod.POST)
    public ResponseEntity<?> addProjectImage(@RequestParam Long projectId, @RequestParam Long articleId) {

        Project project = _projectRepository.findOne(projectId);
        List<ProjectArticle> articles = null;
        if (project != null) {
            articles = _projectArticleRepository.findByProject(project);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        ProjectArticle articleToRemove = null;
        for (ProjectArticle article : articles) {
            if (article.getArticleId()
                       .equals(articleId)) {
                articleToRemove = article;
            }
        }
        if (articleToRemove != null) {
            _projectArticleRepository.delete(articleToRemove);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
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
                imageName = _imageHelper.storeImage(file, folder, imageName);

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
