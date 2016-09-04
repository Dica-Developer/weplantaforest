package org.dicadeveloper.weplantaforest.reports.rankings;

import java.util.List;

import org.dicadeveloper.weplantaforest.CacheConfiguration;
import org.dicadeveloper.weplantaforest.user.OrganizationType;
import org.dicadeveloper.weplantaforest.user.User;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

public interface RankingRepository extends PagingAndSortingRepository<User, Long> {

    public final static String FIND_BEST_USER_QUERY = "SELECT new org.dicadeveloper.weplantaforest.reports.rankings.TreeRankedUserData(tree.owner.name, sum(tree.amount), sum(tree.amount * tree.treeType.annualCo2SavingInTons * ((:time - tree.plantedOn) / 3.1536E10)), tree.owner.imageName) "
            + "FROM Tree as tree GROUP BY tree.owner ORDER BY sum(tree.amount) desc";

    public final static String COUNT_BEST_USER_QUERY = "SELECT count(distinct tree.owner.name) from Tree as tree where :time = :time";

    public final static String FIND_LAST_CREATED_USER_QUERY = "SELECT new org.dicadeveloper.weplantaforest.reports.rankings.TimeRankedUserData(user.name, user.regDate)"
            + "FROM User as user ORDER BY user.regDate desc";

    public final static String FIND_BEST_ORGANIZATION_QUERY = "SELECT new org.dicadeveloper.weplantaforest.reports.rankings.TreeRankedUserData(tree.owner.name, sum(tree.amount), sum(tree.amount * tree.treeType.annualCo2SavingInTons * ((:time - tree.plantedOn) / 3.1536E10)), tree.owner.imageName) "
            + "FROM Tree as tree WHERE tree.owner.organizationType = :organizationType GROUP BY tree.owner ORDER BY sum(tree.amount) desc";

    public final static String COUNT_BEST_ORGANIZATION_USER_QUERY = COUNT_BEST_USER_QUERY + " and tree.owner.organizationType = :organizationType";

    public final static String FIND_LAST_PLANTED_TREES_QUERY = "SELECT new org.dicadeveloper.weplantaforest.reports.rankings.TimeRankedTreeData(tree.owner.name, tree.amount, tree.plantedOn, tree.treeType.imageFile) "
            + "FROM Tree as tree ORDER BY tree.plantedOn desc";

    public final static String FIND_BEST_TEAM_QUERY = "SELECT new org.dicadeveloper.weplantaforest.reports.rankings.TreeRankedUserData(tree.owner.team.name, sum(tree.amount), sum(tree.amount * tree.treeType.annualCo2SavingInTons * ((:time - tree.plantedOn) / 3.1536E10)), CAST(tree.owner.team.id as string)) "
            + "FROM Tree as tree WHERE tree.owner.team != null GROUP BY tree.owner.team.name ORDER BY sum(tree.amount) desc";

    public final static String COUNT_BEST_TEAM_QUERY = "SELECT count(distinct team.name) from Team as team where :time = :time";

    public final static String FIND_BEST_USER_FROM_TIMERANGE_QUERY = "SELECT new org.dicadeveloper.weplantaforest.reports.rankings.TreeRankedUserData(tree.owner.name, sum(tree.amount)) "
            + "FROM Tree as tree WHERE tree.plantedOn BETWEEN :timeRangeStart AND :timeRangeEnd GROUP BY tree.owner ORDER BY sum(tree.amount) desc";

    public final static String FIND_BEST_USER_QUERY_FOR_PROJECT = "SELECT new org.dicadeveloper.weplantaforest.reports.rankings.TreeRankedUserData(tree.owner.name, sum(tree.amount), sum(tree.amount * tree.treeType.annualCo2SavingInTons * ((:time - tree.plantedOn) / 3.1536E10)), tree.owner.imageName) "
            + "FROM Tree as tree WHERE tree.projectArticle.project.name = :projectName GROUP BY tree.owner ORDER BY sum(tree.amount) desc";

    public final static String COUNT_BEST_USER_QUERY_FOR_PROJECT = "SELECT count(distinct tree.owner.name) from Tree as tree where :time = :time AND tree.projectArticle.project.name = :projectName";

    public final static String FIND_BEST_TEAM_FOR_PROJECT_QUERY = "SELECT new org.dicadeveloper.weplantaforest.reports.rankings.TreeRankedUserData(tree.owner.team.name, sum(tree.amount), sum(tree.amount * tree.treeType.annualCo2SavingInTons * ((:time - tree.plantedOn) / 3.1536E10)), CAST(tree.owner.team.id as string)) "
            + "FROM Tree as tree WHERE tree.owner.team != null AND tree.projectArticle.project.name = :projectName GROUP BY tree.owner.team.name ORDER BY sum(tree.amount) desc";

    public final static String COUNT_BEST_TEAM_FOR_PROJECT_QUERY = "SELECT count(distinct team.name) from Team as team where :time = :time AND :projectName = :projectName";

    public final static String FIND_LAST_PLANTED_TREES_IN_PROJECT_QUERY = "SELECT new org.dicadeveloper.weplantaforest.reports.rankings.TimeRankedTreeData(tree.owner.name, tree.amount, tree.plantedOn, tree.treeType.imageFile) "
            + "FROM Tree as tree WHERE tree.projectArticle.project.name = :projectName ORDER BY tree.plantedOn desc";
    
    @Query(value = FIND_BEST_USER_QUERY, countQuery = COUNT_BEST_USER_QUERY)
    Page<TreeRankedUserData> getBestUser(@Param("time") long timeOfMeasurement, Pageable page);

    @Query(value = FIND_BEST_USER_QUERY, countQuery = COUNT_BEST_USER_QUERY)
    @Cacheable(value = CacheConfiguration.TEN_MINUTE_CACHE)
    List<TreeRankedUserData> getBestUserList(@Param("time") long timeOfMeasurement);

    @Query(value = FIND_LAST_CREATED_USER_QUERY)
    List<TimeRankedUserData> getLastCreatedUser(Pageable page);

    @Query(value = FIND_BEST_ORGANIZATION_QUERY, countQuery = COUNT_BEST_ORGANIZATION_USER_QUERY)
    Page<TreeRankedUserData> getBestUserFromOrganizationType(@Param("time") long timeOfMeasurement, @Param("organizationType") OrganizationType organizationType, Pageable page);

    @Query(value = FIND_LAST_PLANTED_TREES_QUERY)
    List<TimeRankedTreeData> getLastPlantedTrees(Pageable Page);

    @Query(value = FIND_BEST_TEAM_QUERY, countQuery = COUNT_BEST_TEAM_QUERY)
    Page<TreeRankedUserData> getBestTeams(@Param("time") long timeOfMeasurement, Pageable Page);

    @Query(value = FIND_BEST_USER_FROM_TIMERANGE_QUERY)
    List<TreeRankedUserData> getBestUserFromTimeRange(@Param("timeRangeStart") long timeRangeStart, @Param("timeRangeEnd") long timeRangeEnd, Pageable Page);

    @Query(value = FIND_BEST_USER_QUERY_FOR_PROJECT, countQuery = COUNT_BEST_USER_QUERY_FOR_PROJECT)
    Page<TreeRankedUserData> getBestUserForProject(@Param("projectName") String projectName, @Param("time") long timeOfMeasurement, Pageable page);

    @Query(value = FIND_BEST_TEAM_FOR_PROJECT_QUERY, countQuery = COUNT_BEST_TEAM_FOR_PROJECT_QUERY)
    Page<TreeRankedUserData> getBestTeamsForProject(@Param("projectName") String projectName, @Param("time") long timeOfMeasurement, Pageable Page);
    
    @Query(value = FIND_LAST_PLANTED_TREES_IN_PROJECT_QUERY)
    Page<TimeRankedTreeData> getLastPlantedTreesInProject(@Param("projectName") String projectName, Pageable Page);

}
