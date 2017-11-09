package org.dicadeveloper.weplantaforest.team;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.common.errorHandling.ErrorCodes;
import org.dicadeveloper.weplantaforest.common.errorHandling.IpatException;
import org.dicadeveloper.weplantaforest.common.errorHandling.IpatPreconditions;
import org.dicadeveloper.weplantaforest.user.User;
import org.dicadeveloper.weplantaforest.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class TeamService {

	protected final Log LOG = LogFactory.getLog(TeamService.class.getName());

	private @NonNull TeamRepository _teamRepository;
	
	private @NonNull UserRepository _userRepository;
	
	public Team createTeam(Team team, User user) throws IpatException {
		boolean teamNameDoesNotExists = _teamRepository.findByName(team.getName()) == null;
		IpatPreconditions.checkArgument(teamNameDoesNotExists, ErrorCodes.TEAM_NAME_ALREADY_EXISTS);
		team.setAdmin(user);
		_teamRepository.save(team);
		return team;
	}
	
	public void joinTeam(User user,Long teamId) throws IpatException {
		Team team = _teamRepository.findOne(teamId);
		IpatPreconditions.checkNotNull(team, ErrorCodes.TEAM_NOT_FOUND);
		user.setTeam(team);
		_userRepository.save(user);
	}
	
	public void leaveTeam(User user) throws IpatException {
		user.setTeam(null);
		_userRepository.save(user);
	}
}
