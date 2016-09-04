package org.dicadeveloper.weplantaforest.user;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.FileSystemInjector;
import org.dicadeveloper.weplantaforest.common.image.ImageHelper;
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

}
