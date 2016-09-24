package org.dicadeveloper.weplantaforest.captcha;

import java.io.IOException;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class CaptchaController {

    protected final Log LOG = LogFactory.getLog(CaptchaController.class.getName());

    private @NonNull CaptchaHelper _captchaHelper;

    @RequestMapping(value = Uris.GENERATE_CAPTCHA, method = RequestMethod.GET, headers = "Accept=image/jpeg, image/jpg, image/png, image/gif")
    public ResponseEntity<?> getCaptchaImage(HttpServletResponse response) {
        try {
            String captchaToken = UUID.randomUUID().toString().substring(0, 4).toUpperCase();
            response.setHeader("CAPTCHA-TOKEN", captchaToken);
            String base64String = _captchaHelper.generateCaptcha(captchaToken);
            return new ResponseEntity<>(base64String, HttpStatus.OK);
        } catch (IOException e) {
            LOG.error("Error occured while trying to generate captcha!", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
