package org.dicadeveloper.weplantaforest.team;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.common.errorHandling.ErrorCodes;
import org.dicadeveloper.weplantaforest.common.errorHandling.IpatException;
import org.dicadeveloper.weplantaforest.common.errorHandling.IpatPreconditions;
import org.dicadeveloper.weplantaforest.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class TeamService {

	protected final Log LOG = LogFactory.getLog(TeamService.class.getName());

	private @NonNull TeamRepository _teamRepository;
	
	public Team createTeam(Team team, User user) throws IpatException {
		boolean teamNameDoesNotExists = _teamRepository.findByName(team.getName()) == null;
		IpatPreconditions.checkArgument(teamNameDoesNotExists, ErrorCodes.TEAM_NAME_ALREADY_EXISTS);
		team.setAdmin(user);
		_teamRepository.save(team);
		return team;
	}
}
