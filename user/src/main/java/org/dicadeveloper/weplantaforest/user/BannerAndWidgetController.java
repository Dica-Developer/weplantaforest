package org.dicadeveloper.weplantaforest.user;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.common.image.ImageHelper;
import org.dicadeveloper.weplantaforest.reports.co2.Co2Data;
import org.dicadeveloper.weplantaforest.reports.co2.Co2Repository;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class BannerAndWidgetController {

    protected final Log LOG = LogFactory.getLog(BannerAndWidgetController.class.getName());

    private @NonNull ImageHelper _imageHelper;

    private @NonNull Environment _env;

    private @NonNull Co2Repository _co2Repository;

    private @NonNull BannerAndWidgetHelper _bannerAndWidgetHelper;

    @CrossOrigin(origins = "*")
    @RequestMapping(value = Uris.BANNER, method = RequestMethod.GET)
    public ResponseEntity<?> getImage(HttpServletResponse response, @RequestParam String type, @RequestParam int width, @RequestParam int height) {
        String filePath = "/static/images/banner/";
        String imageName = "banner_" + type + "_" + width + "x" + height + ".jpg";
        InputStream in = getClass().getResourceAsStream(filePath + imageName);
        try {
            IOUtils.copy(in, response.getOutputStream());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IOException e) {
            LOG.error("Error occured while trying to get image " + imageName + " in folder: " + filePath, e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = Uris.BANNER_CODE, method = RequestMethod.GET)
    public ResponseEntity<?> getBannerHtmlCode(@RequestParam String type, @RequestParam int width, @RequestParam int height) {
        String htmlCode = _bannerAndWidgetHelper.generateBannerHtmlCode(_env.getProperty("ipat.host"), type, width, height);
        return new ResponseEntity<>(htmlCode, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = Uris.WIDGET, method = RequestMethod.GET)
    public ResponseEntity<?> getWidget(HttpServletResponse response, @RequestParam String userName, @RequestParam String type, @RequestParam int width, @RequestParam int height) {
        String filePath = "/static/images/widgets/";
        String imageName = "widget_" + type + "_" + width + "x" + height + ".jpg";
        Co2Data co2DataForUser = _co2Repository.getAllTreesAndCo2SavingForUserName(System.currentTimeMillis(), userName);

        try {
            BufferedImage bufferedImg = _bannerAndWidgetHelper.createWidget(filePath + imageName, type, width, height, co2DataForUser);
            ImageIO.write(bufferedImg, "jpg", response.getOutputStream());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IOException e) {
            LOG.error("Error occured while trying to get image " + imageName + " in folder: " + filePath, e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = Uris.WIDGET_CODE, method = RequestMethod.GET)
    public ResponseEntity<?> getWidgetHtmlCode(@RequestParam String userName, @RequestParam String type, @RequestParam int width, @RequestParam int height) {
        String htmlCode = _bannerAndWidgetHelper.generateWidgetHtmlCode(_env.getProperty("ipat.host"), userName, type, width, height);
        return new ResponseEntity<>(htmlCode, HttpStatus.OK);
    }

}
