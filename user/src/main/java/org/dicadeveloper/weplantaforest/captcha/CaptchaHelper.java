package org.dicadeveloper.weplantaforest.captcha;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;

import org.springframework.stereotype.Component;

import com.github.cage.Cage;
import com.github.cage.GCage;

@Component
public class CaptchaHelper {

    public String generateCaptcha(String captchaToken) throws IOException {
        final Cage cage = new GCage();
        ByteArrayOutputStream os = new ByteArrayOutputStream();
        cage.draw(captchaToken, os);
        byte[] imageBytes = os.toByteArray();
        String base64 = Base64.getEncoder().encodeToString(imageBytes);
        os.close();
        return base64;
    }
}
