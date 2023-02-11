package org.dicadeveloper.weplantaforest.search;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.dicadeveloper.weplantaforest.projects.ProjectRepository;
import org.dicadeveloper.weplantaforest.team.TeamRepository;
import org.dicadeveloper.weplantaforest.user.UserRepository;
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

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class SearchController {

  private @NonNull UserRepository userRepository;
  private @NonNull TeamRepository teamRepository;
  private @NonNull ProjectRepository projectRepository;

  @RequestMapping(value = "/search", method = RequestMethod.GET)
  public ResponseEntity<?> search(@RequestParam String searchValue) {
    System.out.println("searching for:" + searchValue);
    var result = new SearchResponseDto();
    List<User> users = userRepository.searchUsers(searchValue);
    List<Team> teams = teamRepository.searchTeams(searchValue);
    List<Project> projects = projectRepository.searchProjects(searchValue);

    for (User user : users) {
      result.user.add(new IdName(user.getId(), user.getName(), "profile/" + user.getName()));
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
