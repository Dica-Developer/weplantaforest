package org.dicadeveloper.weplantaforest.admin.treeType;

import java.io.IOException;

import javax.transaction.Transactional;

import org.dicadeveloper.weplantaforest.admin.FileSystemInjector;
import org.dicadeveloper.weplantaforest.admin.support.Uris;
import org.dicadeveloper.weplantaforest.common.image.ImageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> createTreeType(@RequestParam String treeTypeName, @RequestParam long annualCo2, @RequestParam String description, @RequestParam String imgType,
            @RequestParam("file") MultipartFile file) {

        if(_treeTypeRepository.findByName(treeTypeName) != null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
        TreeType treeType = new TreeType();

        treeType.setName(treeTypeName);
        treeType.setAnnualCo2SavingInTons(((double) annualCo2)/100);
        treeType.setDescription(description);

        String treeTypeFolder = FileSystemInjector.getTreeTypeFolder();
        String imageName = treeTypeName + "." + imgType;
        if (!file.isEmpty()) {
            try {
                imageName = _imageHelper.storeImage(file, treeTypeFolder, imageName);
                treeType.setImageFile(imageName);
                _treeTypeRepository.save(treeType);
                return new ResponseEntity<>(HttpStatus.OK);
            } catch (IOException e) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

}
