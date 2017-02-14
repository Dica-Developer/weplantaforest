package org.dicadeveloper.weplantaforest.admin.slider;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.admin.support.Uris;
import org.dicadeveloper.weplantaforest.common.image.ImageHelper;
import org.springframework.beans.factory.annotation.Autowired;
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
    
    private @NonNull MainSliderImageService _mainSliderImageService;

    @RequestMapping(value = Uris.SAVE_MAIN_SLIDER_IMAGE, method = RequestMethod.POST)
    public ResponseEntity<?> getSliderImageEntities(@RequestBody MainSliderImage image) {
        return _mainSliderImageService.saveMainSliderImageEntity(image);
    }
 
    @RequestMapping(value = Uris.SAVE_MAIN_SLIDER_IMAGE_UPLOAD, method = RequestMethod.POST)
    public ResponseEntity<?> uploadUserImage(@RequestParam Long imageId, @RequestParam("file") MultipartFile file) {
            return _mainSliderImageService.uploadImageFile(imageId, file);
    }
    
    @RequestMapping(value = Uris.DELETE_MAIN_SLIDER_IMAGE, method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteSliderImage(@RequestParam long imageId) {
        return _mainSliderImageService.deleteImage(imageId);

    }

}
