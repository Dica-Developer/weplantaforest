package org.dicadeveloper.weplantaforest.treetypes;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.dicadeveloper.weplantaforest.FileSystemInjector;
import org.dicadeveloper.weplantaforest.common.image.ImageHelper;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.views.Views;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class TreeTypeController {

    private @NonNull TreeTypeRepository treeTypeRepository;

    private @NonNull ImageHelper imageHelper;

    @RequestMapping(value = Uris.TREETYPE_IMAGE + "{imageName:.+}/{width}/{height}", method = RequestMethod.GET, headers = "Accept=image/jpeg, image/jpg, image/png, image/gif")
    public ResponseEntity<?> getImage(HttpServletResponse response, @PathVariable String imageName, @PathVariable int width, @PathVariable int height) {
        String filePath = FileSystemInjector.getTreeTypeFolder() + "/" + imageName;
        try {
            imageHelper.writeImageToOutputStream(response.getOutputStream(), filePath, width, height);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IOException e) {
            LOG.error("Error occured while trying to get image " + imageName + " in folder: " + filePath, e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = Uris.TREETYPES, method = RequestMethod.GET)
    @JsonView(Views.ShortTreeType.class)
    public Iterable<TreeType> getTreeTypes() {
        return treeTypeRepository.findAll();
    }

}
