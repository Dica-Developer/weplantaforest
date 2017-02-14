package org.dicadeveloper.weplantaforest.admin.slider;

import java.io.IOException;

import javax.transaction.Transactional;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.admin.FileSystemInjector;
import org.dicadeveloper.weplantaforest.common.image.ImageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class MainSliderImageService {

    protected final Log LOG = LogFactory.getLog(MainSliderImageService.class.getName());

    private @NonNull ImageHelper _imageHelper;

    private @NonNull MainSliderImageRepository _mainSliderImageRepository;

    public ResponseEntity<?> saveMainSliderImageEntity(MainSliderImage image) {
        try {
            image = _mainSliderImageRepository.save(image);
            return new ResponseEntity<>(image.getImageId(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Transactional
    public ResponseEntity<?> uploadImageFile(Long imageId, MultipartFile file) {
        MainSliderImage image = _mainSliderImageRepository.findOne(imageId);
        String imageFolder = FileSystemInjector.getMainImageFolder();
        String imageName;
        if (image.getImageFileName() != null) {
            imageName = image.getImageFileName();
        } else {
            imageName = "image_" + image.getImageId() + ".jpg";
        }
        if (!file.isEmpty()) {
            try {
                imageName = _imageHelper.storeImage(file, imageFolder, imageName, true);
                image.setImageFileName(imageName);
                image = _mainSliderImageRepository.save(image);
                return new ResponseEntity<>(image, HttpStatus.OK);
            } catch (IOException e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<?> deleteImage(Long imageId) {
        try {
            MainSliderImage mainSliderImage = _mainSliderImageRepository.findOne(imageId);
            String imageFolder = FileSystemInjector.getMainImageFolder();
            String imageName = mainSliderImage.getImageFileName();
            _imageHelper.deleteImage(imageFolder, imageName);
            _mainSliderImageRepository.delete(imageId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
