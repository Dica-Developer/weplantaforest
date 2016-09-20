package org.dicadeveloper.weplantaforest.user;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.FileSystemInjector;
import org.dicadeveloper.weplantaforest.common.image.ImageHelper;
import org.dicadeveloper.weplantaforest.encryption.PasswordEncrypter;
import org.dicadeveloper.weplantaforest.reports.co2.Co2Repository;
import org.dicadeveloper.weplantaforest.reports.rankings.RankingRepository;
import org.dicadeveloper.weplantaforest.reports.rankings.TreeRankedUserData;
import org.dicadeveloper.weplantaforest.security.TokenAuthenticationService;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class UserController {

    protected final Log LOG = LogFactory.getLog(UserController.class.getName());

    private @NonNull ImageHelper _imageHelper;

    private @NonNull UserRepository _userRepository;

    private @NonNull RankingRepository _rankingRepository;

    private @NonNull Co2Repository _co2Repository;

    private @NonNull TokenAuthenticationService _tokenAuthenticationService;
    
    private @NonNull PasswordEncrypter _passwordEncrypter;

    @RequestMapping(value = Uris.USER_IMAGE + "{imageName:.+}/{width}/{height}", method = RequestMethod.GET, headers = "Accept=image/jpeg, image/jpg, image/png, image/gif")
    public ResponseEntity<?> getImage(HttpServletResponse response, @PathVariable String imageName, @PathVariable int width, @PathVariable int height) {
        String filePath = FileSystemInjector.getUserFolder() + "/" + imageName;
        try {
            _imageHelper.writeImageToOutputStream(response.getOutputStream(), filePath, width, height);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IOException e) {
            LOG.error("Error occured while trying to get image " + imageName + " in folder: " + filePath, e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = Uris.USER_DETAILS, method = RequestMethod.GET)
    public UserReportData getUserDetails(@RequestHeader(value = "X-AUTH-TOKEN") String userToken, @RequestParam String userName) {
        UserReportData userReportData = _userRepository.getUserDetails(userName);
        userReportData.setCo2Data(_co2Repository.getAllTreesAndCo2SavingForUserName(System.currentTimeMillis(), userName));
        userReportData.setRank(calcUserRank(userReportData.getUserName(), userReportData.getCo2Data()
                                                                                        .getTreesCount()));
        userReportData.setEditAllowed(_tokenAuthenticationService.isAuthenticatedUser(userToken, userName));
        return userReportData;
    }

    private long calcUserRank(String userName, long treeCountOfUser) {
        List<TreeRankedUserData> userList = _rankingRepository.getBestUserList(System.currentTimeMillis());
        long rank = 1;
        for (TreeRankedUserData user : userList) {
            if (treeCountOfUser < user.getAmount()) {
                rank++;
            }
            if (user.getName()
                    .equals(userName)) {
                break;
            }
        }
        return rank;
    }

    @RequestMapping(value = Uris.EDIT_USER_DETAILS, method = RequestMethod.POST)
    public ResponseEntity<?> editUserDetails(@RequestHeader(value = "X-AUTH-TOKEN") String userToken, HttpServletResponse response, @RequestParam String userName, @RequestParam String toEdit,
            @RequestParam String newEntry) throws IOException {
        if (_tokenAuthenticationService.isAuthenticatedUser(userToken, userName)) {
            User user = _userRepository.findByName(userName);

            switch (toEdit) {
            case "NAME":
                if (_userRepository.userExists(newEntry) == 1) {
                    response.sendError(400, "Dieser Name ist bereits vergeben!");
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                } else {
                    user.setName(newEntry);
                }
                break;
            case "ABOUTME":
                user.setAboutMe(newEntry);
                break;
            case "LOCATION":
                user.setLocation(newEntry);
                break;
            case "ORGANISATION":
                user.setOrganisation(newEntry);
                break;
            case "HOMEPAGE":
                user.setHomepage(newEntry);
                break;
            case "MAIL":
                user.setMail(newEntry);
                break;
            case "NEWSLETTER":
                user.setNewsletter(newEntry.equals("JA") ? true : false);
                break;
            case "ORGANIZATION_TYPE":
                user.setOrganizationType(OrganizationType.valueOf(newEntry));
                break;
            case "LANGUAGE":
                long lang = 0;
                if (newEntry.equals("0")) {
                    lang = 0;
                } else if (newEntry.equals("1")) {
                    lang = 1;
                }
                user.setLang(lang);
                break;
            case "PASSWORD":
                user.setPassword(_passwordEncrypter.encryptPassword(newEntry));
                break;
            default:
                break;
            }
            _userRepository.save(user);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @RequestMapping(value = Uris.USER_IMAGE_UPLOAD, method = RequestMethod.POST)
    public ResponseEntity<?> uploadUserImage(@RequestHeader(value = "X-AUTH-TOKEN") String userToken, @RequestParam String userName, @RequestParam("file") MultipartFile file) {
        if (_tokenAuthenticationService.isAuthenticatedUser(userToken, userName)) {
            User user = _userRepository.findByName(userName);
            String imageFolder = FileSystemInjector.getUserFolder();
            String imageName = user.getName() + file.getOriginalFilename()
                                                    .substring(file.getOriginalFilename()
                                                                   .indexOf("."));
            if (!file.isEmpty()) {
                try {
                    _imageHelper.storeImage(file, imageFolder, imageName, true);
                    user.setImageName(imageName);
                    _userRepository.save(user);
                    return new ResponseEntity<>(HttpStatus.OK);
                } catch (IOException e) {
                    LOG.error("Error occured while trying to save image " + imageName + " in folder: " + imageFolder, e);
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                }
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

}
