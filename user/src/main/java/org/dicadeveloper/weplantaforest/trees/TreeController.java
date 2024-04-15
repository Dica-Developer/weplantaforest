package org.dicadeveloper.weplantaforest.trees;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.dicadeveloper.weplantaforest.FileSystemInjector;
import org.dicadeveloper.weplantaforest.common.image.ImageHelper;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.views.Views;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.dicadeveloper.weplantaforest.user.UserRepository;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class TreeController {

    private @NonNull TreeRepository treeRepository;
    private @NonNull UserRepository userRepository;

    private @NonNull ImageHelper imageHelper;

    @RequestMapping(value = Uris.TREE + "{id}", method = RequestMethod.GET)
    @JsonView(Views.PlantedTree.class)
    public Tree list(@PathVariable("id") long id) {
        return treeRepository.findById(id).orElse(null);
    }

    @RequestMapping(value = Uris.TREES, method = RequestMethod.GET)
    @JsonView(Views.PlantedTree.class)
    public Page<Tree> list(@RequestParam("page") int page, @RequestParam("size") int size) {
        return treeRepository.findAll(PageRequest.of(page, size, Sort.by("plantedOn").descending()));
    }

    @RequestMapping(value = Uris.TREES_BY_USER, method = RequestMethod.GET)
    @JsonView(Views.PlantedTree.class)
    public Page<Tree> findTreesByOwnerId(@RequestParam("userId") long userId, @RequestParam("page") int page, @RequestParam("size") int size) {
        String userName = userRepository.findById(userId).orElse(null).getName();
        return treeRepository.findTreesByUserName(userName, PageRequest.of(page, size, Sort.by("plantedOn").descending()));
    }

    @RequestMapping(value = Uris.TREES_BY_TEAM, method = RequestMethod.GET)
    @JsonView(Views.PlantedTree.class)
    public Page<Tree> findTreesByTeamName(@RequestParam("teamName") String teamName, @RequestParam("page") int page, @RequestParam("size") int size) {
        return treeRepository.findTreesByTeamName(teamName, PageRequest.of(page, size, Sort.by("plantedOn").descending()));
    }

    @RequestMapping(value = Uris.TREES_BY_PROJECT + "{projectId}", method = RequestMethod.GET)
    @JsonView(Views.PlantedTree.class)
    public Page<Tree> findTreesByProjectId(@PathVariable("projectId") long projectId, @RequestParam("page") int page, @RequestParam("size") int size) {
        return treeRepository.findTreesByProjectId(projectId, PageRequest.of(page, size, Sort.by("plantedOn").descending()));
    }

    @RequestMapping(value = Uris.TREE_IMAGE + "{imageName:.+}/{width}/{height}", method = RequestMethod.GET, headers = "Accept=image/jpeg, image/jpg, image/png, image/gif")
    public ResponseEntity<?> getImage(HttpServletResponse response, @PathVariable String imageName, @PathVariable int width, @PathVariable int height) {
        String filePath = FileSystemInjector.getTreeFolder() + "/" + imageName;
        try {
            imageHelper.writeImageToOutputStream(response.getOutputStream(), filePath, width, height);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IOException e) {
            LOG.error("Error occured while trying to get image " + imageName + " in folder: " + filePath, e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = Uris.TREES_SELF_PLANTED)
    @JsonView(Views.SelfPlantedTrees.class)
    public ResponseEntity<?> findSelfPlantedTrees() {
        List<Tree> trees = treeRepository.findSelfPlantedTrees();
        return new ResponseEntity<>(trees, HttpStatus.OK);
    }

}
