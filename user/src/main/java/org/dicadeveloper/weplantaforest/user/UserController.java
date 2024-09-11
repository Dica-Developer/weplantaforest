package org.dicadeveloper.weplantaforest.user;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.dicadeveloper.weplantaforest.FileSystemInjector;
import org.dicadeveloper.weplantaforest.common.errorhandling.IpatException;
import org.dicadeveloper.weplantaforest.common.image.ImageHelper;
import org.dicadeveloper.weplantaforest.common.mail.MailHelper;
import org.dicadeveloper.weplantaforest.encryption.PasswordEncrypter;
import org.dicadeveloper.weplantaforest.messages.MessageByLocaleService;
import org.dicadeveloper.weplantaforest.reports.co2.Co2Repository;
import org.dicadeveloper.weplantaforest.reports.rankings.RankingRepository;
import org.dicadeveloper.weplantaforest.security.TokenAuthenticationService;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.common.net.UrlEscapers;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

  @RestController
  @RequiredArgsConstructor(onConstructor = @__(@Autowired))
  @Slf4j
  public class UserController {

    private @NonNull ImageHelper imageHelper;

    private @NonNull UserRepository userRepository;

    private @NonNull RankingRepository rankingRepository;

    private @NonNull Co2Repository co2Repository;

    private @NonNull TokenAuthenticationService tokenAuthenticationService;

    private @NonNull PasswordEncrypter passwordEncrypter;

    private @NonNull UserService userService;

    private @NonNull MailHelper mailHelper;

    private @NonNull Environment env;

    private @NonNull MessageByLocaleService messageByLocaleService;

    @RequestMapping(value = Uris.USER_IMAGE + "{imageName:.+}/{width}/{height}", method = RequestMethod.GET, headers = "Accept=image/jpeg, image/jpg, image/png, image/gif")
    public ResponseEntity<?> getImage(HttpServletResponse response, @PathVariable String imageName, @PathVariable int width, @PathVariable int height) {
      String filePath = FileSystemInjector.getUserFolder() + "/" + imageName;
      try {
        imageHelper.writeImageToOutputStream(response.getOutputStream(), filePath, width, height);
        return new ResponseEntity<>(HttpStatus.OK);
      } catch (IOException e) {
        LOG.error("Error occured while trying to get image " + imageName + " in folder: " + filePath, e);
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
      }
    }

    @RequestMapping(value = Uris.USER_DETAILS, method = RequestMethod.GET)
    public ResponseEntity<?> getUserDetails(@RequestHeader(value = "X-AUTH-TOKEN") String userToken, @RequestParam String userName) {
      boolean isEditAllowed = tokenAuthenticationService.isAuthenticatedUser(userToken, userName);
      UserReportData userReportData = userService.getUserDetails(userName, isEditAllowed);
      if (null == userReportData) {
        try {
          Long userId = Long.parseLong(userName);
          User user = userRepository.findById(userId).orElse(null);
          return new ResponseEntity<>("https://www.iplantatree.org/user/" + UrlEscapers.urlPathSegmentEscaper().escape(user.getName()), HttpStatus.PAYMENT_REQUIRED);
        } catch (Exception e) {
          LOG.warn("Error on finding user by workaround: " + userName, e);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
      }
      return new ResponseEntity<>(userReportData, HttpStatus.OK);
    }

    @RequestMapping(value = Uris.EDIT_USER_DETAILS, method = RequestMethod.POST)
    public ResponseEntity<?> editUserDetails(@RequestHeader(value = "X-AUTH-TOKEN") String userToken, @RequestParam String userName, @RequestParam String toEdit, @RequestParam String newEntry)
      throws IpatException {
      if (tokenAuthenticationService.isAuthenticatedUser(userToken, userName)) {
        userService.editUser(userName, toEdit, newEntry);
        return new ResponseEntity<>(HttpStatus.OK);
      } else {
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
      }
    }

    @RequestMapping(value = Uris.DELETE_USER, method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteUser(@RequestHeader(value = "X-AUTH-TOKEN") String userToken, @RequestParam Long id)
      throws IpatException {
      try {
        System.out.println("printing LLOLLLL");
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
      } catch (Exception e) {
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @RequestMapping(value = Uris.USER_IMAGE_UPLOAD, method = RequestMethod.POST)
    public ResponseEntity<?> uploadUserImage(@RequestHeader(value = "X-AUTH-TOKEN") String userToken, @RequestParam String userName, @RequestParam("file") MultipartFile file) throws IpatException {
      if (tokenAuthenticationService.isAuthenticatedUser(userToken, userName)) {
        String imageName = userService.uploadUserImage(userName, file);
        return new ResponseEntity<>(imageName, HttpStatus.OK);
      } else {
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
      }
    }

    @RequestMapping(value = Uris.REGISTRATE_USER, method = RequestMethod.POST)
    public ResponseEntity<?> registrateUser(@RequestBody UserRegistrationData userRegistrationData) throws IpatException {
      userService.registrateUser(userRegistrationData);
      return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = Uris.USER_ACTIVATE, method = RequestMethod.POST)
    public ResponseEntity<?> activateUser(@RequestParam long id, @RequestParam String key, @RequestParam String language) throws IpatException {
      userService.activateUser(id, key);
      return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = Uris.USER_LANGUAGE, method = RequestMethod.GET)
    public String getLanguageFromUser(@RequestParam String userName) {
      return userRepository.getUserLanguage(userName).toString();
    }

    @RequestMapping(value = Uris.USER_PASSWORD_RESET_REQUEST, method = RequestMethod.POST)
    public ResponseEntity<?> createResetPassword(@RequestParam String userName, @RequestParam String language) throws IpatException {
      userService.createPasswordResetMail(userName);
      return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = Uris.USER_PASSWORD_RESET_VERIFIY_LINK, method = RequestMethod.POST)
    public ResponseEntity<?> verifyPasswordResetLink(@RequestParam long id, @RequestParam String key, @RequestParam String language) throws IpatException {
      String userName = userService.verifiyPasswordResetLink(id, key);
      return new ResponseEntity<>(userName, HttpStatus.OK);
    }

    @RequestMapping(value = Uris.USER_PASSWORD_RESET, method = RequestMethod.POST)
    public ResponseEntity<?> resetPasswordForUser(@RequestParam long id, @RequestParam String key, @RequestParam String language, @RequestParam String password) throws IpatException {
      String userName = userService.resetPasswordForUser(id, key, password);
      return new ResponseEntity<>(userName, HttpStatus.OK);
    }

    @RequestMapping(value = Uris.IS_USER_ADMIN, method = RequestMethod.GET)
    public ResponseEntity<?> isAdmin(@RequestHeader(value = "X-AUTH-TOKEN") String userToken) {
      boolean isAdmin = tokenAuthenticationService.isAdmin(userToken);
      return new ResponseEntity<>(isAdmin, HttpStatus.OK);
    }

    @RequestMapping(value = Uris.ANONYMIZE, method = RequestMethod.POST)
    public ResponseEntity<?> anonymizeUser(@RequestHeader(value = "X-AUTH-TOKEN") String userToken, @RequestParam String userName) throws IpatException {
      if (tokenAuthenticationService.isAuthenticatedUser(userToken, userName)) {
        userService.anonymizeUser(userName);
        return new ResponseEntity<>(HttpStatus.OK);
      } else {
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
      }
    }
  }
