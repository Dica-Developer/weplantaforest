package org.dicadeveloper.weplantaforest.user;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.util.Collections;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.collections4.map.PassiveExpiringMap;
import org.apache.commons.io.IOUtils;
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
import lombok.val;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class BannerAndWidgetController {

    private @NonNull ImageHelper imageHelper;

    private @NonNull Environment env;

    private @NonNull Co2Repository co2Repository;

    private @NonNull BannerAndWidgetHelper bannerAndWidgetHelper;

    private Map<String, BufferedImage> widgetCache = Collections.synchronizedMap(new PassiveExpiringMap<>(15, TimeUnit.MINUTES));

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
        String htmlCode = bannerAndWidgetHelper.generateBannerHtmlCode(env.getProperty("ipat.host"), type, width, height);
        return new ResponseEntity<>(htmlCode, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = Uris.WIDGET, method = RequestMethod.GET)
    public ResponseEntity<?> getWidget(HttpServletResponse response, @RequestParam String userName, @RequestParam String type, @RequestParam int width, @RequestParam int height) {
        BufferedImage bufferedImg = null;
        String filePath = "/static/images/widgets/";
        String imageName = "widget_" + type + "_" + width + "x" + height + ".jpg";
        val cacheKey = userName + "_" + imageName;
        if (widgetCache.containsKey(cacheKey)) {
            bufferedImg = widgetCache.get(cacheKey);
        } else {
            Co2Data co2DataForUser = co2Repository.getAllTreesAndCo2SavingForUserName(System.currentTimeMillis(), userName);
            try {
                bufferedImg = bannerAndWidgetHelper.createWidget(filePath + imageName, type, width, height, co2DataForUser);
                widgetCache.put(cacheKey, bufferedImg);
            } catch (IOException e) {
                LOG.error("Error occured while trying to get image " + imageName + " in folder: " + filePath, e);
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
        try {
            ImageIO.write(bufferedImg, "jpg", response.getOutputStream());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IOException e) {
            LOG.error("Error occured while trying to get image " + imageName + " in folder: " + filePath, e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = Uris.WIDGET_CODE, method = RequestMethod.GET)
    public ResponseEntity<?> getWidgetHtmlCode(@RequestParam String userName, @RequestParam String type, @RequestParam int width, @RequestParam int height) {
        String htmlCode = bannerAndWidgetHelper.generateWidgetHtmlCode(env.getProperty("ipat.host"), userName, type, width, height);
        return new ResponseEntity<>(htmlCode, HttpStatus.OK);
    }

}
