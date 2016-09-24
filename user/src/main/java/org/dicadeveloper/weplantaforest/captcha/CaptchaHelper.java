package org.dicadeveloper.weplantaforest.captcha;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;

import javax.imageio.ImageIO;

import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Component;

import com.github.cage.Cage;
import com.github.cage.GCage;

@Component
public class CaptchaHelper {

    public String generateCaptcha(String captchaToken) throws IOException {
        final Cage cage = new GCage();
        BufferedImage img = cage.drawImage(captchaToken);
        ByteArrayOutputStream os = new ByteArrayOutputStream();
        ImageIO.write(img, "png", os);
        InputStream fis = new ByteArrayInputStream(os.toByteArray());
        byte[] imageBytes = IOUtils.toByteArray(fis);
        String base64 = Base64.getEncoder().encodeToString(imageBytes);
        os.close();
        fis.close();
        return base64;
    }
}
