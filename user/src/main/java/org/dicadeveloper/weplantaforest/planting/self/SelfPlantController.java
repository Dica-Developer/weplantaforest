package org.dicadeveloper.weplantaforest.planting.self;

import java.io.IOException;

import javax.validation.Valid;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.FileSystemInjector;
import org.dicadeveloper.weplantaforest.common.errorHandling.ErrorCodes;
import org.dicadeveloper.weplantaforest.common.errorHandling.IpatException;
import org.dicadeveloper.weplantaforest.common.image.ImageHelper;
import org.dicadeveloper.weplantaforest.security.TokenAuthenticationService;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.trees.Tree;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.dicadeveloper.weplantaforest.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class SelfPlantController {

    protected final Log LOG = LogFactory.getLog(SelfPlantController.class.getName());

    private @NonNull SelfPlantDataToTreeConverter _selfPlantDataToTreeConverter;

    private @NonNull TreeRepository _treeRepository;

    private @NonNull TokenAuthenticationService _tokenAuthenticationService;

    private @NonNull ImageHelper _imageHelper;

    @RequestMapping(value = Uris.PLANT_SELF, method = RequestMethod.POST)
    public ResponseEntity<?> plantTreesByMyself(@RequestHeader(value = "X-AUTH-TOKEN") String userToken, @Valid @RequestBody SelfPlantData selfPlantedTree, BindingResult bindingResult) {
        if (!bindingResult.hasErrors()) {
            User owner = _tokenAuthenticationService.getUserFromToken(userToken);
            Tree tree = _selfPlantDataToTreeConverter.convertSelfPlantDataToTree(selfPlantedTree, owner);
            _treeRepository.save(tree);
            return new ResponseEntity<Long>(tree.getId(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = Uris.PLANT_SELF, method = RequestMethod.PUT)
    public ResponseEntity<?> updateSelfPlantedTree(@RequestHeader(value = "X-AUTH-TOKEN") String userToken, @RequestParam Long id, @Valid @RequestBody SelfPlantData selfPlantedTree,
            BindingResult bindingResult) throws IpatException {
        Tree tree = _treeRepository.findById(id).orElse(null);
        if (null == tree) {
            throw new IpatException(ErrorCodes.TREE_NOT_FOUND);
        }
        Boolean isOwner = _tokenAuthenticationService.isAuthenticatedUser(userToken, tree.getOwner().getUsername());
        if (_tokenAuthenticationService.isAdmin(userToken) || isOwner) {
            if (!bindingResult.hasErrors()) {
                Tree treeToUpdate = _selfPlantDataToTreeConverter.convertSelfPlantDataToTree(selfPlantedTree, tree.getOwner());
                treeToUpdate.setId(id);
                _treeRepository.save(treeToUpdate);
                return new ResponseEntity<Long>(treeToUpdate.getId(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @RequestMapping(value = Uris.UPLOAD_SELF_PLANTED_TREE_IMAGE, method = RequestMethod.POST)
    public ResponseEntity<?> uploadTreeImage(@RequestParam("file") MultipartFile file, @RequestParam long treeId) {
        String imageFolder = FileSystemInjector.getTreeFolder();
        String imageName = treeId + file.getOriginalFilename().substring(file.getOriginalFilename().indexOf("."));

        Tree tree = _treeRepository.findById(treeId).orElse(null);
        if (!file.isEmpty()) {
            try {
                _imageHelper.storeImage(file, imageFolder, imageName, false);
                tree.setImagePath(imageName);
                _treeRepository.save(tree);
                return new ResponseEntity<>(HttpStatus.OK);
            } catch (IOException e) {
                LOG.error("Error occured while trying to save image " + imageName + " in folder: " + imageFolder, e);
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }
}
