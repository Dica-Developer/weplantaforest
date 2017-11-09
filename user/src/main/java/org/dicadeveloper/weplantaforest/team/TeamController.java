package org.dicadeveloper.weplantaforest.team;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.FileSystemInjector;
import org.dicadeveloper.weplantaforest.common.errorHandling.IpatException;
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

import com.fasterxml.jackson.annotation.JsonView;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class TeamController {

	protected final Log LOG = LogFactory.getLog(TeamController.class.getName());

	private @NonNull ImageHelper _imageHelper;

	private @NonNull TeamRepository _teamRepository;

	private @NonNull UserRepository _userRepository;

	private @NonNull Co2Repository _co2Repository;

	private @NonNull RankingRepository _rankingRepository;

	private @NonNull TeamService _teamService;

	private @NonNull TokenAuthenticationService _tokenAuthenticationService;

	@RequestMapping(value = Uris.TEAM_IMAGE
			+ "{imageName:.+}/{width}/{height}", method = RequestMethod.GET, headers = "Accept=image/jpeg, image/jpg, image/png, image/gif")
	public ResponseEntity<?> getImage(HttpServletResponse response, @PathVariable String imageName,
			@PathVariable int width, @PathVariable int height) {
		String filePath = FileSystemInjector.getTeamFolder() + "/" + imageName;
		try {
			_imageHelper.writeImageToOutputStream(response.getOutputStream(), filePath, width, height);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (IOException e) {
			LOG.error("Error occured while trying to get image " + imageName + " in folder: " + filePath, e);
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = Uris.TEAM_DETAILS, method = RequestMethod.GET)
	public ResponseEntity<?> getTeamDetails(@RequestParam String teamName) {
		TeamReportData teamReportData = _teamRepository.getTeamDetails(teamName);
		teamReportData.setCo2Data(_co2Repository.getAllTreesAndCo2SavingForTeam(System.currentTimeMillis(), teamName));
		teamReportData.setRank(calcTeamRank(teamReportData.getTeamName(), teamReportData.getCo2Data().getTreesCount()));
		return new ResponseEntity<>(teamReportData, HttpStatus.OK);
	}

	@RequestMapping(value = Uris.TEAM_MEMBER, method = RequestMethod.GET)
	@JsonView(Views.TeamMember.class)
	public ResponseEntity<?> getTeamMember(@RequestParam String teamName, @RequestParam("page") int page,
			@RequestParam("size") int size) {
		Page<User> teamMember = _userRepository.getTeamMember(teamName, new PageRequest(page, size));
		return new ResponseEntity<>(teamMember, HttpStatus.OK);
	}

	private long calcTeamRank(String teamName, long treeCountOfTeam) {
		List<TreeRankedUserData> teamList = _rankingRepository.getBestTeamAsList(System.currentTimeMillis());
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
	public ResponseEntity<?> createTeam(@RequestHeader(value = "X-AUTH-TOKEN") String userToken, @RequestBody Team team)
			throws IpatException {
		User user = _tokenAuthenticationService.getUserFromToken(userToken);
		if (user != null) {
			_teamService.createTeam(team, user);
			return new ResponseEntity<>(team.getName(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.FORBIDDEN);
		}
	}

}
