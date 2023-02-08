package org.dicadeveloper.weplantaforest.team;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface TeamRepository extends CrudRepository<Team, Long> {

    public static final String GET_TEAM_DETAILS_QUERY = "SELECT new org.dicadeveloper.weplantaforest.team.TeamReportData(team.id, team.name, team.timeStamp, team.admin.name, team.description, "
            + " (SELECT COUNT(*) FROM User user WHERE user.team.name = :name))" + " FROM Team team WHERE team.name = :name";

    @Query
    public Team findByName(@Param("name") String name);

    @Query(value = GET_TEAM_DETAILS_QUERY)
    public TeamReportData getTeamDetails(@Param("name") String name);

    @Query(value = "SELECT team FROM Team team WHERE team.name like %:searchValue%")
    public List<Team> searchTeams(@Param("searchValue") String searchValue);
}
