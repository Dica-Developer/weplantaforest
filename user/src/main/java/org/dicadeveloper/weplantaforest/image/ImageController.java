package org.dicadeveloper.weplantaforest.image;

import java.io.IOException;
import java.io.InputStream;

import org.dicadeveloper.weplantaforest.support.Uris;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ImageController {

    public final static String IMAGE_FOLDER = "../../../../static/images/";

    @RequestMapping(value = Uris.IMAGE + "{imageName:.+}", method = RequestMethod.GET, headers = "Accept=image/jpeg, image/jpg, image/png, image/gif")
    public ResponseEntity<byte[]> getImage(@PathVariable String imageName) {
        try {
            InputStream imageInputStream = this.getClass()
                                               .getResourceAsStream(IMAGE_FOLDER + imageName);
            byte[] imageBytes = ImageHelper.getByteArrayForImageName(imageName, imageInputStream);
            return new ResponseEntity<>(imageBytes, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = Uris.IMAGE + "{imageName:.+}/{width}/{height}", method = RequestMethod.GET, headers = "Accept=image/jpeg, image/jpg, image/png, image/gif")
    public ResponseEntity<byte[]> getScaledImage(@PathVariable String imageName, @PathVariable int width, @PathVariable int height) {
        try {
            InputStream imageInputStream = this.getClass()
                                               .getResourceAsStream(IMAGE_FOLDER + imageName);
            byte[] imageBytes = ImageHelper.getByteArrayForImageName(imageName, imageInputStream, width, height);
            return new ResponseEntity<>(imageBytes, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
