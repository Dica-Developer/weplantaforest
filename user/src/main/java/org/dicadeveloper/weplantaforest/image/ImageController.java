package org.dicadeveloper.weplantaforest.image;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;

import javax.imageio.ImageIO;

import org.dicadeveloper.weplantaforest.common.support.StringHelper;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import net.coobird.thumbnailator.Thumbnails;

@RestController
public class ImageController {

    public final static String IMAGE_FOLDER = "../../../../static/images/";

    @RequestMapping(value = Uris.IMAGE + "{imageName:.+}", method = RequestMethod.GET, headers = "Accept=image/jpeg, image/jpg, image/png, image/gif")
    public ResponseEntity<byte[]> getImage(@PathVariable String imageName) {
        try {
            InputStream imageInputStream = this.getClass()
                                               .getResourceAsStream(IMAGE_FOLDER + imageName);
            String imageType = StringHelper.getDataTypeFromFileName(imageName);
            BufferedImage img = ImageIO.read(imageInputStream);
            ByteArrayOutputStream bao = new ByteArrayOutputStream();

            ImageIO.write(img, imageType, bao);
            imageInputStream.close();
            bao.close();
            return new ResponseEntity<>(bao.toByteArray(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = Uris.IMAGE + "{imageName:.+}/{width}/{height}", method = RequestMethod.GET, headers = "Accept=image/jpeg, image/jpg, image/png, image/gif")
    public ResponseEntity<byte[]> getScaledImage(@PathVariable String imageName, @PathVariable int width, @PathVariable int height) {
        try {
            InputStream imageInputStream = this.getClass()
                                               .getResourceAsStream(IMAGE_FOLDER + imageName);
            BufferedImage img = Thumbnails.of(imageInputStream)
                                          .size(width, height)
                                          .asBufferedImage();
            String imageType = StringHelper.getDataTypeFromFileName(imageName);
            ByteArrayOutputStream bao = new ByteArrayOutputStream();

            ImageIO.write(img, imageType, bao);
            imageInputStream.close();
            bao.close();
            return new ResponseEntity<>(bao.toByteArray(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
