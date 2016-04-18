package org.dicadeveloper.weplantaforest.reports.rankings;

import org.dicadeveloper.weplantaforest.admin.codes.Team;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

public interface TeamRankingRepository extends CrudRepository<Team, Long> {

    public final static String FIND_LAST_CREATED_TEAMS_QUERY = "SELECT team FROM Team team ORDER BY _timeStamp DESC";

    @Query(FIND_LAST_CREATED_TEAMS_QUERY)
    @Transactional(readOnly = true)
    public Page<Team> findLastCreatedTeams(Pageable pageable);

}
