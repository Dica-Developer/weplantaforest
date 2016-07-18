package org.dicadeveloper.weplantaforest.admin.project;

import java.util.ArrayList;
import java.util.List;

import org.dicadeveloper.weplantaforest.admin.support.Uris;
import org.hibernate.JDBCException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.NestedServletException;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class ProjectController {

    private @NonNull ProjectRepository _projectRepository;

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
        } catch (JDBCException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
