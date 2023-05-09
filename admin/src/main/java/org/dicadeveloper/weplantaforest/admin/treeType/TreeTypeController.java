package org.dicadeveloper.weplantaforest.admin.treeType;

import java.io.IOException;

import javax.transaction.Transactional;

import org.dicadeveloper.weplantaforest.admin.FileSystemInjector;
import org.dicadeveloper.weplantaforest.admin.support.Uris;
import org.dicadeveloper.weplantaforest.common.image.ImageHelper;
import org.dicadeveloper.weplantaforest.common.support.StringHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
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
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class TreeTypeController {

    private @NonNull TreeTypeRepository _treeTypeRepository;

    private @NonNull ImageHelper _imageHelper;

    @RequestMapping(value = Uris.TREETYPES, method = RequestMethod.GET)
    public Iterable<TreeType> getTreeTypes() {
        return _treeTypeRepository.findAll();
    }

    @RequestMapping(value = Uris.TREETYPE_SAVE, method = RequestMethod.POST)
    public ResponseEntity<?> saveTreeType(@RequestBody TreeType treeType) {
        TreeType savedTreeType;
        try {
            savedTreeType = _treeTypeRepository.save(treeType);
            return new ResponseEntity<>(savedTreeType.getId(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = Uris.TREETYPE_DELETE, method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteTreeType(@RequestParam Long TreeTypeId) {

        try {
            _treeTypeRepository.deleteById(TreeTypeId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            if (e instanceof DataIntegrityViolationException) {
                String errorMessage = "Der Baumtyp kann nicht gelöscht werden, weil er bereits Bestandteil in Projekten ist.";
                return new ResponseEntity<>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
            } else {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @RequestMapping(value = Uris.TREETYPE_IMAGE_UPLOAD, method = RequestMethod.POST)
    @Transactional
    public ResponseEntity<?> uploadUserImage(@RequestParam Long treeTypeId
    // , @RequestParam String imageType
    ,@RequestParam("file") MultipartFile file) {
        TreeType treeType = _treeTypeRepository.findById(treeTypeId).orElse(null);
        String fileEnding;
        if (file.getOriginalFilename().length() > 0) {
            fileEnding = file.getOriginalFilename().substring(file.getOriginalFilename().indexOf("."));
        } else {
            fileEnding = ".png";
        }

        String imageFolder = FileSystemInjector.getTreeTypeFolder();
        String imageName = StringHelper.getTextForLanguage(treeType.getName(), "de") + fileEnding;

        if (!file.isEmpty()) {
            try {
                imageName = _imageHelper.storeImage(file, imageFolder, imageName, true);
                treeType.setTreeImageColor(imageName);
                _treeTypeRepository.save(treeType);
                return new ResponseEntity<>(HttpStatus.OK);
            } catch (IOException e) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
