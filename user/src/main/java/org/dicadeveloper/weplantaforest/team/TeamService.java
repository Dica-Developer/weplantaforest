package org.dicadeveloper.weplantaforest.team;

import java.io.IOException;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
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

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class TeamService {

	protected final Log LOG = LogFactory.getLog(TeamService.class.getName());

	private @NonNull TeamRepository _teamRepository;

	private @NonNull UserRepository _userRepository;

	private @NonNull ImageHelper _imageHelper;

	public Team createTeam(Team team, User user) throws IpatException {
		boolean teamNameDoesNotExists = _teamRepository.findByName(team.getName()) == null;
		IpatPreconditions.checkArgument(teamNameDoesNotExists, ErrorCodes.TEAM_NAME_ALREADY_EXISTS);
		team.setAdmin(user);
		_teamRepository.save(team);
		return team;
	}

	public void joinTeam(Long userId, Long teamId) throws IpatException {
		User user = _userRepository.findOne(userId);
		Team team = _teamRepository.findOne(teamId);
		IpatPreconditions.checkNotNull(team, ErrorCodes.TEAM_NOT_FOUND);
		user.setTeam(team);
		_userRepository.save(user);
	}

	public void leaveTeam(Long userId) throws IpatException {
		User user = _userRepository.findOne(userId);
		user.setTeam(null);
		_userRepository.save(user);
	}

	public boolean isTeamAdmin(Long userId, Long teamId) {
		Team team = _teamRepository.findOne(teamId);
		return team.getAdmin().getId().equals(userId);
	}

	public boolean isTeamMember(Long userId, Long teamId) {
		List<User> members = _userRepository.getAllTeamMember(teamId);
		for (User member : members) {
			if (member.getId().equals(userId)) {
				return true;
			}
		}
		return false;
	}

	public void deleteTeam(User user, Long teamId) throws IpatException {
		Team team = _teamRepository.findOne(teamId);
		IpatPreconditions.checkNotNull(team, ErrorCodes.TEAM_NOT_FOUND);
		boolean isAdminOfTeam = user.getId().equals(team.getAdmin().getId());
		IpatPreconditions.checkArgument(isAdminOfTeam, ErrorCodes.NO_ADMIN_OF_TEAM);

		List<User> teamMember = _userRepository.getAllTeamMember(teamId);
		for (User member : teamMember) {
			member.setTeam(null);
			_userRepository.save(member);
		}
		_teamRepository.delete(teamId);
	}

	public void uploadTeamImage(Long teamId, MultipartFile file) throws IpatException {
		IpatPreconditions.checkArgument(!file.isEmpty(), ErrorCodes.EMPTY_FILE);
		Team team = _teamRepository.findOne(teamId);
		IpatPreconditions.checkNotNull(team, ErrorCodes.TEAM_NOT_FOUND);

		String imageFolder = FileSystemInjector.getTeamFolder();
		String imageName = team.getId() + file.getOriginalFilename().substring(file.getOriginalFilename().indexOf("."));
		try {
			_imageHelper.storeImage(file, imageFolder, imageName, true);
		} catch (IOException e) {
			throw new IpatException(ErrorCodes.SERVER_ERROR);
		}

	}

	public void editTeam(Long teamId, String toEdit, String newEntry) {
		Team team = _teamRepository.findOne(teamId);
		switch (toEdit) {
		case "descirption":
			team.setDescription(newEntry);
			break;

		default:
			break;
		}
		_teamRepository.save(team);
	}
}
