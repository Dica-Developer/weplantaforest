package org.dicadeveloper.weplantaforest.reports.rankings;

import java.util.List;

import org.dicadeveloper.weplantaforest.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

public interface RankingRepository extends PagingAndSortingRepository<User, Long> {

    public final static String FIND_BEST_USER_QUERY = "SELECT new org.dicadeveloper.weplantaforest.reports.rankings.TreeRankedUserData(tree.owner.name, sum(tree.amount), sum(tree.amount * tree.treeType.annualCo2SavingInTons * ((:time - tree.plantedOn) / 3.1536E10)))"
            + "FROM Tree as tree GROUP BY tree.owner ORDER BY sum(tree.amount) desc";

    public final static String COUNT_BEST_USER_QUERY = "SELECT count(distinct tree.owner.name) from Tree as tree where :time = :time";

    public final static String FIND_LAST_CREATED_USER_QUERY = "SELECT new org.dicadeveloper.weplantaforest.reports.rankings.TimeRankedUserData(user.name, user.regDate)"
            + "FROM User as user ORDER BY user.regDate desc";

    public final static String FIND_BEST_ORGANIZATION_QUERY = "SELECT new org.dicadeveloper.weplantaforest.reports.rankings.TreeRankedUserData(tree.owner.name, sum(tree.amount), sum(tree.amount * tree.treeType.annualCo2SavingInTons * ((:time - tree.plantedOn) / 3.1536E10)))"
            + "FROM Tree as tree WHERE tree.owner.organizationType = :organizationType GROUP BY tree.owner ORDER BY sum(tree.amount) desc";

    public final static String COUNT_BEST_ORGANIZATION_USER_QUERY = COUNT_BEST_USER_QUERY
            + " and tree.owner.organizationType = :organizationType";

    public final static String FIND_LAST_PLANTED_TREES_QUERY = "SELECT new org.dicadeveloper.weplantaforest.reports.rankings.TimeRankedTreeData(tree.owner.name, tree.amount, tree.projectArticle.project.name)"
            + "FROM Tree as tree ORDER BY tree.plantedOn desc";

    public final static String FIND_BEST_TEAM_QUERY = "SELECT new org.dicadeveloper.weplantaforest.reports.rankings.TreeRankedUserData(tree.owner.team.name, sum(tree.amount), sum(tree.amount * tree.treeType.annualCo2SavingInTons * ((:time - tree.plantedOn) / 3.1536E10)))"
            + "FROM Tree as tree WHERE tree.owner.team != null GROUP BY tree.owner.team.name ORDER BY sum(tree.amount) desc";

    public final static String COUNT_BEST_TEAM_QUERY = "SELECT count(distinct team.name) from Team as team where :time = :time";

    public final static String FIND_BEST_USER_FROM_TIMERANGE_QUERY = "SELECT new org.dicadeveloper.weplantaforest.reports.rankings.TreeRankedUserData(tree.owner.name, sum(tree.amount))"
            + "FROM Tree as tree WHERE tree.plantedOn BETWEEN :timeRangeStart AND :timeRangeEnd GROUP BY tree.owner ORDER BY sum(tree.amount) desc";

    @Query(value = FIND_BEST_USER_QUERY, countQuery = COUNT_BEST_USER_QUERY)
    Page<TreeRankedUserData> getBestUser(@Param("time") long timeOfMeasurement, Pageable page);

    @Query(value = FIND_LAST_CREATED_USER_QUERY)
    List<TimeRankedUserData> getLastCreatedUser(Pageable page);

    @Query(value = FIND_BEST_ORGANIZATION_QUERY, countQuery = COUNT_BEST_ORGANIZATION_USER_QUERY)
    Page<TreeRankedUserData> getBestUserFromOrganizationType(@Param("time") long timeOfMeasurement,
            @Param("organizationType") int organizationType, Pageable page);

    @Query(value = FIND_LAST_PLANTED_TREES_QUERY)
    List<TimeRankedTreeData> getLastPlantedTrees(Pageable Page);

    @Query(value = FIND_BEST_TEAM_QUERY, countQuery = COUNT_BEST_TEAM_QUERY)
    Page<TreeRankedUserData> getBestTeams(@Param("time") long timeOfMeasurement, Pageable Page);

    @Query(value = FIND_BEST_USER_FROM_TIMERANGE_QUERY)
    List<TreeRankedUserData> getBestUserFromTimeRange(@Param("timeRangeStart") long timeRangeStart,
            @Param("timeRangeEnd") long timeRangeEnd, Pageable Page);

}
