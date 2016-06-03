package org.dicadeveloper.weplantaforest.image;

import org.dicadeveloper.weplantaforest.support.Uris;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ImageController {

    private @NonNull ImageHelper _imageHelper;

    @RequestMapping(value = Uris.IMAGE + "{imageName:.+}", method = RequestMethod.GET, headers = "Accept=image/jpeg, image/jpg, image/png, image/gif")
    public ResponseEntity<byte[]> getImage(@PathVariable String imageName) {
        try {
            byte[] imageBytes = _imageHelper.getByteArrayForImageName(imageName);
            return new ResponseEntity<>(imageBytes, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = Uris.IMAGE + "{imageName:.+}/{width}/{height}", method = RequestMethod.GET, headers = "Accept=image/jpeg, image/jpg, image/png, image/gif")
    public ResponseEntity<byte[]> getScaledImage(@PathVariable String imageName, @PathVariable int width, @PathVariable int height) {
        try {
            byte[] imageBytes = _imageHelper.getByteArrayForImageName(imageName, width, height);
            return new ResponseEntity<>(imageBytes, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/uploadImage/{folder}/{imageName:.+}", method = RequestMethod.POST)
    public ResponseEntity<?> handleFileUpload(@PathVariable("folder") String folder, @PathVariable("imageName") String imageName, @RequestParam("file") MultipartFile file) {
        if (!file.isEmpty()) {
            try {
                _imageHelper.storeImage(file, folder, imageName);
                return new ResponseEntity<>(HttpStatus.OK);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
