package org.dicadeveloper.weplantaforest.admin.slider;

import java.io.IOException;

import javax.transaction.Transactional;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
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
public class MainSliderImageController {

    protected final Log LOG = LogFactory.getLog(MainSliderImageController.class.getName());

    @Autowired
    private @NonNull ImageHelper _imageHelper;

    @Autowired
    private @NonNull MainSliderImageRepository _mainSliderImageRepository;

    @RequestMapping(value = Uris.SAVE_MAIN_SLIDER_IMAGE, method = RequestMethod.POST)
    public ResponseEntity<?> getSliderImageEntities(@RequestBody MainSliderImage image) {
        try {
            image = _mainSliderImageRepository.save(image);
            return new ResponseEntity<>(image.getImageId(), HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
 
    @RequestMapping(value = Uris.SAVE_MAIN_SLIDER_IMAGE_UPLOAD, method = RequestMethod.POST)
    @Transactional
    public ResponseEntity<?> uploadUserImage(@RequestParam Long imageId, @RequestParam("file") MultipartFile file) {
            MainSliderImage image =  _mainSliderImageRepository.findOne(imageId);
            String imageFolder = FileSystemInjector.getMainImageFolder();
            String imageName ;
            if(image.getImageFileName() != null){
                imageName = image.getImageFileName();
            }else{
                imageName = "image_" + image.getImageId() + ".jpg";
            }
            if (!file.isEmpty()) {
                try {
                    imageName = _imageHelper.storeImage(file, imageFolder, imageName, false);
                    image.setImageFileName(imageName);
                    _mainSliderImageRepository.save(image);
                    return new ResponseEntity<>(HttpStatus.OK);
                } catch (IOException e) {        
                    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
    }
    
    @RequestMapping(value = Uris.DELETE_MAIN_SLIDER_IMAGE, method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteSliderImage(@RequestParam long imageId) {
        try {
            _mainSliderImageRepository.delete(imageId);
            //TODO: also remove imageFile from disk
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

 
}
