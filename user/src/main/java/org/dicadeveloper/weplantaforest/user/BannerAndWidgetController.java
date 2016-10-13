package org.dicadeveloper.weplantaforest.user;

import java.io.IOException;
import java.io.InputStream;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.common.image.ImageHelper;
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
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class BannerAndWidgetController {

    protected final Log LOG = LogFactory.getLog(BannerAndWidgetController.class.getName());

    private @NonNull ImageHelper _imageHelper;

    private @NonNull Environment _env;

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
        String htmlCode = generateBannerHtmlCode(type, width, height);
        return new ResponseEntity<>(htmlCode, HttpStatus.OK);
    }

    private String generateBannerHtmlCode(String type, int width, int height) {
        StringBuffer buffer = new StringBuffer();
        String hostWithoutPort = _env.getProperty("ipat.host").substring(0, _env.getProperty("ipat.host").indexOf(":", 5) + 1); 
        buffer.append("<a href=\"");
        buffer.append(_env.getProperty("ipat.host"));
        buffer.append("\">");
        buffer.append("<img src=\"");
        buffer.append(hostWithoutPort);
        buffer.append("8081/banner?type=");
        buffer.append(type);
        buffer.append("&width=");
        buffer.append(width);
        buffer.append("&height=");
        buffer.append(height);
        buffer.append("\" />");
        buffer.append("</a>");
        return buffer.toString();
    }

}
