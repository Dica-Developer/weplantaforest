package org.dicadeveloper.weplantaforest.team;

import java.io.File;
import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.dicadeveloper.weplantaforest.FileSystemInjector;
import org.dicadeveloper.weplantaforest.common.errorhandling.IpatException;
import org.dicadeveloper.weplantaforest.common.image.ImageHelper;
import org.dicadeveloper.weplantaforest.reports.co2.Co2Repository;
import org.dicadeveloper.weplantaforest.reports.rankings.RankingRepository;
import org.dicadeveloper.weplantaforest.reports.rankings.TreeRankedUserData;
import org.dicadeveloper.weplantaforest.security.TokenAuthenticationService;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.user.User;
import org.dicadeveloper.weplantaforest.user.UserRepository;
import org.dicadeveloper.weplantaforest.views.Views;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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

import com.fasterxml.jackson.annotation.JsonView;
import com.google.common.net.UrlEscapers;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.val;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class TeamController {

    private @NonNull ImageHelper imageHelper;

    private @NonNull TeamRepository teamRepository;

    private @NonNull UserRepository userRepository;

    private @NonNull Co2Repository co2Repository;

    private @NonNull RankingRepository rankingRepository;

    private @NonNull TeamService teamService;

    private @NonNull TokenAuthenticationService tokenAuthenticationService;

    @Autowired
    private UserRepository _userRepository;

    @RequestMapping(value = Uris.TEAM_IMAGE + "{imageName:.+}/{width}/{height}", method = RequestMethod.GET, headers = "Accept=image/jpeg, image/jpg, image/png, image/gif")
    public ResponseEntity<?> getImage(HttpServletResponse response, @PathVariable String imageName, @PathVariable int width, @PathVariable int height) {
        File directory = new File(FileSystemInjector.getTeamFolder());
        String[] files = directory.list();
        String teamImageName = "";
        for (String fileName : files) {
            if (fileName.startsWith(imageName + ".")) {
                teamImageName = fileName;
                break;
            }
        }
        String filePath = FileSystemInjector.getTeamFolder() + "/" + teamImageName;
        try {

            imageHelper.writeImageToOutputStream(response.getOutputStream(), filePath, width, height);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IOException e) {
            LOG.error("Error occured while trying to get image " + imageName + " in folder: " + filePath, e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = Uris.TEAM_IMAGE_UPLOAD, method = RequestMethod.POST)
    public ResponseEntity<?> uploadTeamImage(@RequestHeader(value = "X-AUTH-TOKEN") String userToken, @RequestParam Long teamId, @RequestParam("file") MultipartFile file) throws IpatException {
        val authUser = tokenAuthenticationService.getUserFromToken(userToken);
        if (null != authUser) {
            val user = _userRepository.findByName(authUser.getName());
            if (teamService.isTeamAdmin(user.getId(), teamId)) {
                teamService.uploadTeamImage(teamId, file);
                return new ResponseEntity<>(HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @RequestMapping(value = Uris.TEAM_DETAILS, method = RequestMethod.GET)
    public ResponseEntity<?> getTeamDetails(@RequestParam String teamName) {
        TeamReportData teamReportData = teamRepository.getTeamDetails(teamName);
        if (null == teamReportData) {
            try {
                Long teamId = Long.parseLong(teamName);
                Team team = teamRepository.findById(teamId).orElse(null);
                return new ResponseEntity<>("https://www.iplantatree.org/team/" + UrlEscapers.urlPathSegmentEscaper().escape(team.getName()), HttpStatus.PAYMENT_REQUIRED);
            } catch (Exception e) {
                LOG.warn("Did not find team with id: " + teamName, e);
            }
        }
        if (null != teamReportData) {
            teamReportData.setCo2Data(co2Repository.getAllTreesAndCo2SavingForTeam(System.currentTimeMillis(), teamReportData.getTeamName()));
            teamReportData.setRank(calcTeamRank(teamReportData.getTeamName(), teamReportData.getCo2Data().getTreesCount()));
            return new ResponseEntity<>(teamReportData, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(teamReportData, HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = Uris.EDIT_TEAM_DETAILS, method = RequestMethod.POST)
    public ResponseEntity<?> editTeamDetails(@RequestHeader(value = "X-AUTH-TOKEN") String userToken, @RequestParam Long teamId, @RequestParam String toEdit, @RequestParam String newEntry)
            throws IpatException {
        val authUser = tokenAuthenticationService.getUserFromToken(userToken);
        if (null != authUser) {
            val user = _userRepository.findByName(authUser.getName());
            if (teamService.isTeamAdmin(user.getId(), teamId)) {
                teamService.editTeam(teamId, toEdit, newEntry);
                return new ResponseEntity<>(HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @RequestMapping(value = Uris.TEAM_MEMBER, method = RequestMethod.GET)
    @JsonView(Views.TeamMember.class)
    public ResponseEntity<?> getTeamMember(@RequestParam String teamName, @RequestParam("page") int page, @RequestParam("size") int size) {
        Page<User> teamMember = userRepository.getTeamMember(teamName, PageRequest.of(page, size));
        return new ResponseEntity<>(teamMember, HttpStatus.OK);
    }

    private long calcTeamRank(String teamName, long treeCountOfTeam) {
        List<TreeRankedUserData> teamList = rankingRepository.getBestTeamAsList(System.currentTimeMillis());
        long rank = 1;
        for (TreeRankedUserData team : teamList) {
            if (treeCountOfTeam < team.getAmount()) {
                rank++;
            }
            if (team.getName().equals(teamName)) {
                break;
            }
        }
        return rank;
    }

    @RequestMapping(value = Uris.TEAM_CREATE, method = RequestMethod.POST)
    public ResponseEntity<?> createTeam(@RequestHeader(value = "X-AUTH-TOKEN") String userToken, @Valid @RequestBody Team team) throws IpatException {
        val authUser = tokenAuthenticationService.getUserFromToken(userToken);
        if (authUser != null) {
            val user = _userRepository.findByName(authUser.getName());
            teamService.createTeam(team, user.getId());
            return new ResponseEntity<>(team.getName(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @RequestMapping(value = Uris.TEAM_JOIN, method = RequestMethod.POST)
    public ResponseEntity<?> joinTeam(@RequestHeader(value = "X-AUTH-TOKEN") String userToken, @RequestParam Long teamId) throws IpatException {
        val authUser = tokenAuthenticationService.getUserFromToken(userToken);
        if (authUser != null) {
            val user = _userRepository.findByName(authUser.getName());
            teamService.joinTeam(user.getId(), teamId);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @RequestMapping(value = Uris.TEAM_LEAVE, method = RequestMethod.POST)
    public ResponseEntity<?> leaveTeam(@RequestHeader(value = "X-AUTH-TOKEN") String userToken) throws IpatException {
        val authUser = tokenAuthenticationService.getUserFromToken(userToken);
        if (authUser != null) {
            val user = _userRepository.findByName(authUser.getName());
            teamService.leaveTeam(user.getId());
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @RequestMapping(value = Uris.TEAM_DELETE, method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteTeam(@RequestHeader(value = "X-AUTH-TOKEN") String userToken, @RequestParam Long teamId) throws IpatException {
        val authUser = tokenAuthenticationService.getUserFromToken(userToken);
        if (null != authUser) {
            val user = _userRepository.findByName(authUser.getName());
            if (teamService.isTeamAdmin(user.getId(), teamId)) {
                teamService.deleteTeam(user, teamId);
                return new ResponseEntity<>(HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @RequestMapping(value = Uris.TEAM_IS_ADMIN, method = RequestMethod.GET)
    public ResponseEntity<?> isAdmin(@RequestHeader(value = "X-AUTH-TOKEN") String userToken, @RequestParam Long teamId) throws IpatException {
        val authUser = tokenAuthenticationService.getUserFromToken(userToken);
        if (authUser != null) {
            val user = _userRepository.findByName(authUser.getName());
            boolean isAdmin = teamService.isTeamAdmin(user.getId(), teamId);
            return new ResponseEntity<>(isAdmin, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
    }

    @RequestMapping(value = Uris.TEAM_IS_MEMBER, method = RequestMethod.GET)
    public ResponseEntity<?> isMember(@RequestHeader(value = "X-AUTH-TOKEN") String userToken, @RequestParam Long teamId) throws IpatException {
        val authUser = tokenAuthenticationService.getUserFromToken(userToken);
        if (authUser != null) {
            val user = _userRepository.findByName(authUser.getName());
            boolean isMember = teamService.isTeamMember(user.getId(), teamId);
            return new ResponseEntity<>(isMember, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
    }

}
