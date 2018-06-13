package org.dicadeveloper.weplantaforest.admin.tree;

import java.util.List;

import org.dicadeveloper.weplantaforest.admin.project.ProjectArticle;
import org.dicadeveloper.weplantaforest.admin.project.ProjectArticleRepository;
import org.dicadeveloper.weplantaforest.admin.support.Uris;
import org.dicadeveloper.weplantaforest.admin.user.User;
import org.dicadeveloper.weplantaforest.admin.user.UserRepository;
import org.dicadeveloper.weplantaforest.admin.views.Views;
import org.dicadeveloper.weplantaforest.common.errorHandling.IpatException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class TreeController {

    private @NonNull TreeRepository _treeRepository;

    private @NonNull ProjectArticleRepository _projectArticleRepository;

    private @NonNull UserRepository _userRepository;
    
    private @NonNull TreeService _treeService;

    @RequestMapping(value = Uris.PLANT_FOR_USER, method = RequestMethod.POST)
    public ResponseEntity<?> plantForUser(@RequestParam Long userId, @RequestParam Long projectArticleId, @RequestParam int amount) {
        if (_projectArticleRepository.exists(projectArticleId)) {
            ProjectArticle article = _projectArticleRepository.findOne(projectArticleId);
            Long articleAmount = article.getAmount();
            Long alreadyPlanted = _treeRepository.countAlreadyPlantedTreesByProjectArticleId(projectArticleId);
            Long treesRemaining = articleAmount - alreadyPlanted;

            User userToPlantFor = _userRepository.findOne(userId);

            if (amount <= treesRemaining) {
                Long plantedOn = System.currentTimeMillis();
                Tree tree = new Tree();
                tree.setAmount(amount);
                tree.setProjectArticle(article);
                tree.setPlantedOn(plantedOn);
                tree.setSubmittedOn(plantedOn);
                tree.setOwner(userToPlantFor);

                _treeRepository.save(tree);
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = Uris.TRANSFORM_TREES, method = RequestMethod.POST)
    public ResponseEntity<?> transformTrees(@RequestParam Long fromUserId, @RequestParam Long toUserId) throws IpatException {
        _treeService.transformTrees(fromUserId, toUserId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @RequestMapping(value = Uris.TREES_BY_USER, method = RequestMethod.GET)
    @JsonView(Views.TreesByUser.class)
    public List<Tree> treesByUser(@RequestParam Long userId)  {
       return _treeRepository.findByOwner(_userRepository.findOne(userId));
    }
}
