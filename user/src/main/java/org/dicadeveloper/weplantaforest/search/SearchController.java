package org.dicadeveloper.weplantaforest.search;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.dicadeveloper.weplantaforest.projects.ProjectRepository;
import org.dicadeveloper.weplantaforest.team.TeamRepository;
import org.dicadeveloper.weplantaforest.user.UserRepository;
import org.dicadeveloper.weplantaforest.certificate.Certificate;
import org.dicadeveloper.weplantaforest.certificate.CertificateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.dicadeveloper.weplantaforest.user.User;
import org.dicadeveloper.weplantaforest.team.Team;
import org.dicadeveloper.weplantaforest.projects.Project;

import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j; 
import lombok.NonNull;
import lombok.val;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class SearchController {

  private @NonNull UserRepository userRepository;
  private @NonNull TeamRepository teamRepository;
  private @NonNull ProjectRepository projectRepository;
  private @NonNull CertificateRepository _certificateRepository;

  @RequestMapping(value = "/search", method = RequestMethod.GET)
  public ResponseEntity<?> search(@RequestParam String searchValue) {
    var result = new SearchResponseDto();
    List<User> users = userRepository.searchUsers(searchValue);
    List<Team> teams = teamRepository.searchTeams(searchValue);
    List<Project> projects = projectRepository.searchProjects(searchValue);
    val certificateNumberCleaned = searchValue.replace("#", "");
    Certificate certificate = _certificateRepository.findByNumber(certificateNumberCleaned);

    if (null != certificate) {
      result.certificates.add(new IdName(certificate.getCertId(), "#" + certificate.getNumber(), "certificate/find/" + certificateNumberCleaned));
    }

    for (User user : users) {
      if (!user.banned) {
      result.user.add(new IdName(user.getId(), user.getName(), "user/" + user.getName()));
      }
    }
    for (Team team : teams) {
      result.teams.add(new IdName(team.getId(), team.getName(), "team/" + team.getName()));
    }
    for (Project project : projects) {
      result.projects.add(new IdName(project.getId(), project.getName(), "project/" + project.getName()));
    }


    return new ResponseEntity<>(result, HttpStatus.OK);
  }
}
