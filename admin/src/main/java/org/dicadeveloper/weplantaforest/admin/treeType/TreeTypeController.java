package org.dicadeveloper.weplantaforest.admin.treeType;

import java.io.IOException;

import javax.transaction.Transactional;

import org.dicadeveloper.weplantaforest.admin.support.Uris;
import org.dicadeveloper.weplantaforest.common.image.ImageHelper;
import org.hibernate.JDBCException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
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
public class TreeTypeController {

    private @NonNull TreeTypeRepository _treeTypeRepository;

    private @NonNull ImageHelper _imageHelper;

    @Autowired
    Environment env;

    @RequestMapping(value = Uris.TREETYPE_CREATE, method = RequestMethod.POST)
    @Transactional
    public ResponseEntity<?> createTreeType(@RequestBody TreeType treeType) {
        try {
            _treeTypeRepository.save(treeType);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (JDBCException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = Uris.TREETYPE_IMAGE_UPLOAD + "{imageName:.+}", method = RequestMethod.POST)
    public ResponseEntity<?> handleFileUpload(@PathVariable("imageName") String imageName, @RequestParam("file") MultipartFile file) {
        String treeTypeFolder = env.getProperty("upload.root") + "/ipat_uploads/images/treeTypes";
        if (!file.isEmpty()) {
            try {
                _imageHelper.storeImage(file, treeTypeFolder, imageName);
                return new ResponseEntity<>(HttpStatus.OK);
            } catch (IOException e) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
