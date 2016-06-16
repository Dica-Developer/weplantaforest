package org.dicadeveloper.weplantaforest.image;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.FileSystemInjector;
import org.dicadeveloper.weplantaforest.common.image.ImageHelper;
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
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class ImageController {
    
    protected final Log LOG = LogFactory.getLog(ImageController.class.getName());

    private @NonNull ImageHelper _imageHelper;

    @RequestMapping(value = Uris.IMAGE + "{imageName:.+}", method = RequestMethod.GET, headers = "Accept=image/jpeg, image/jpg, image/png, image/gif")
    public ResponseEntity<byte[]> getImage(@PathVariable String imageName) {
        String imageFolder = FileSystemInjector.getImageUploadFolder();

        byte[] imageBytes = _imageHelper.getByteArrayForImageName(imageName, imageFolder);
        if (imageBytes.length > 0) {
            return new ResponseEntity<>(imageBytes, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = Uris.IMAGE + "{imageName:.+}/{width}/{height}", method = RequestMethod.GET, headers = "Accept=image/jpeg, image/jpg, image/png, image/gif")
    public void getScaledImage(HttpServletResponse response,@PathVariable String imageName, @PathVariable int width, @PathVariable int height) {
        String filePath = FileSystemInjector.getImageUploadFolder() + "/" + imageName;

        try {
            _imageHelper.writeImageToOutputStream(response.getOutputStream(), filePath, width, height);
        } catch (IOException e) {
            LOG.error("Error occured while getting OutputStream from HttServletResponse!", e);
        }
    }

    @RequestMapping(value = Uris.IMAGE + "uploadImage/{imageName:.+}", method = RequestMethod.POST)
    public ResponseEntity<?> handleFileUpload(@PathVariable("imageName") String imageName, @RequestParam("file") MultipartFile file) {
        String imageFolder = FileSystemInjector.getImageUploadFolder();

        if (!file.isEmpty()) {
            if (_imageHelper.storeImage(file, imageFolder, imageName)) {
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
