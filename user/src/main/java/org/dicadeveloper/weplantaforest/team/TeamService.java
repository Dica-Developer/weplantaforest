package org.dicadeveloper.weplantaforest.team;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.dicadeveloper.weplantaforest.FileSystemInjector;
import org.dicadeveloper.weplantaforest.common.errorHandling.ErrorCodes;
import org.dicadeveloper.weplantaforest.common.errorHandling.IpatException;
import org.dicadeveloper.weplantaforest.common.errorHandling.IpatPreconditions;
import org.dicadeveloper.weplantaforest.common.image.ImageHelper;
import org.dicadeveloper.weplantaforest.user.User;
import org.dicadeveloper.weplantaforest.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Service
public class TeamService {

    private @NonNull TeamRepository teamRepository;

    private @NonNull UserRepository userRepository;

    private @NonNull ImageHelper imageHelper;

    public Team createTeam(Team team, Long userId) throws IpatException {
        User admin = userRepository.findById(userId).orElse(null);
        boolean teamNameDoesNotExists = teamRepository.findByName(team.getName()) == null;
        IpatPreconditions.checkArgument(teamNameDoesNotExists, ErrorCodes.TEAM_NAME_ALREADY_EXISTS);
        team.setAdmin(admin);
        team.setTimeStamp(System.currentTimeMillis());
        teamRepository.save(team);
        admin.setTeam(team);
        userRepository.save(admin);
        return team;
    }

    public void joinTeam(Long userId, Long teamId) throws IpatException {
        User user = userRepository.findById(userId).orElse(null);
        Team team = teamRepository.findById(teamId).orElse(null);
        IpatPreconditions.checkNotNull(team, ErrorCodes.TEAM_NOT_FOUND);
        user.setTeam(team);
        userRepository.save(user);
    }

    public void leaveTeam(Long userId) throws IpatException {
        User user = userRepository.findById(userId).orElse(null);
        user.setTeam(null);
        userRepository.save(user);
    }

    public boolean isTeamAdmin(Long userId, Long teamId) {
        Team team = teamRepository.findById(teamId).orElse(null);
        return team.getAdmin().getId().equals(userId);
    }

    public boolean isTeamMember(Long userId, Long teamId) {
        List<User> members = userRepository.getAllTeamMember(teamId);
        for (User member : members) {
            if (member.getId().equals(userId)) {
                return true;
            }
        }
        return false;
    }

    public void deleteTeam(User user, Long teamId) throws IpatException {
        Team team = teamRepository.findById(teamId).orElse(null);
        IpatPreconditions.checkNotNull(team, ErrorCodes.TEAM_NOT_FOUND);
        boolean isAdminOfTeam = user.getId().equals(team.getAdmin().getId());
        IpatPreconditions.checkArgument(isAdminOfTeam, ErrorCodes.NO_ADMIN_OF_TEAM);

        List<User> teamMember = userRepository.getAllTeamMember(teamId);
        for (User member : teamMember) {
            member.setTeam(null);
            userRepository.save(member);
        }
        teamRepository.deleteById(teamId);
    }

    public void uploadTeamImage(Long teamId, MultipartFile file) throws IpatException {
        IpatPreconditions.checkArgument(!file.isEmpty(), ErrorCodes.EMPTY_FILE);
        Team team = teamRepository.findById(teamId).orElse(null);
        IpatPreconditions.checkNotNull(team, ErrorCodes.TEAM_NOT_FOUND);

        String imageFolder = FileSystemInjector.getTeamFolder();
        File teamFolder = new File(imageFolder);
        String[] teamImages = teamFolder.list();
        String imageName = team.getId() + file.getOriginalFilename().substring(file.getOriginalFilename().indexOf("."));
        try {
            for (String fileName : teamImages) {
                if (fileName.startsWith(team.getId() + ".")) {
                    File fileToDelete = new File(imageFolder + "/" + fileName);
                    fileToDelete.delete();
                }
            }
            imageHelper.storeImage(file, imageFolder, imageName, true);
        } catch (IOException e) {
            throw new IpatException(ErrorCodes.SERVER_ERROR);
        }
    }

    public void editTeam(Long teamId, String toEdit, String newEntry) {
        Team team = teamRepository.findById(teamId).orElse(null);
        switch (toEdit) {
            case "description":
                team.setDescription(newEntry);
                break;
            case "name":
                team.setName(newEntry);
                break;
            default:
                break;
        }
        teamRepository.save(team);
    }

}
