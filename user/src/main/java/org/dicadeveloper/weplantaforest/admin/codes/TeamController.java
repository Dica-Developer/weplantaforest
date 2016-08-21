package org.dicadeveloper.weplantaforest.admin.codes;

import java.io.File;
import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.FileSystemInjector;
import org.dicadeveloper.weplantaforest.common.image.ImageHelper;
import org.dicadeveloper.weplantaforest.reports.co2.Co2Repository;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class TeamController {

    protected final Log LOG = LogFactory.getLog(TeamController.class.getName());

    private @NonNull ImageHelper _imageHelper;

    private @NonNull TeamRepository _teamRepository;

    private @NonNull Co2Repository _co2Repository;

    @RequestMapping(value = Uris.TEAM_IMAGE + "{imageName:.+}/{width}/{height}", method = RequestMethod.GET, headers = "Accept=image/jpeg, image/jpg, image/png, image/gif")
    public ResponseEntity<?> getImage(HttpServletResponse response, @PathVariable String imageName, @PathVariable int width, @PathVariable int height) {
        File teamImageFolder = new File(FileSystemInjector.getTeamFolder() + "/" + imageName);
        File imageFile = teamImageFolder.listFiles()[0];
        String filePath = imageFile.toString();
        try {
            _imageHelper.writeImageToOutputStream(response.getOutputStream(), filePath, width, height);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IOException e) {
            LOG.error("Error occured while trying to get image " + imageName + " in folder: " + filePath, e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = Uris.TEAM_DETAILS, method = RequestMethod.GET)
    public TeamReportData getTeamDetails(@RequestParam String teamName) {
        TeamReportData teamReportData = _teamRepository.getTeamDetails(teamName);
        teamReportData.setCo2Data(_co2Repository.getAllTreesAndCo2SavingForTeam(System.currentTimeMillis(), teamName));
        return teamReportData;
    }

}
