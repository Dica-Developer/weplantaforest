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

  public static final String FIND_BEST_USER_QUERY = "SELECT new org.dicadeveloper.weplantaforest.reports.rankings.TreeRankedUserData(tree.owner.name, sum(tree.amount), sum(tree.amount * "
      + " tree.treeType.annualCo2SavingInTons * ((:time - tree.plantedOn) / 3.1536E10)), tree.owner.imageName) "
      + "FROM Tree as tree WHERE NOT tree.owner.name LIKE \'Anonymous%\' GROUP BY tree.owner ORDER BY sum(tree.amount) desc";

  public static final String FIND_BEST_USER_QUERY_FOR_LAST_YEAR = "SELECT new org.dicadeveloper.weplantaforest.reports.rankings.TreeRankedUserData(tree.owner.name, sum(tree.amount), "
      + " sum(tree.amount "
      + " * tree.treeType.annualCo2SavingInTons * ((:time - tree.plantedOn) / 3.1536E10)), tree.owner.imageName) "
      + "FROM Tree as tree WHERE NOT tree.owner.name LIKE \'Anonymous%\' AND tree.plantedOn > (:time - 31536000000L) GROUP BY tree.owner ORDER BY sum(tree.amount) desc";

  public static final String COUNT_BEST_USER_QUERY_FOR_LAST_YEAR = "SELECT count(distinct tree.owner.name) from Tree as tree where NOT tree.owner.name LIKE \'Anonymous%\' AND tree.plantedOn > "
      + " (:time - 31536000000L)";

  public static final String COUNT_BEST_USER_QUERY = "SELECT count(distinct tree.owner.name) from Tree as tree where NOT tree.owner.name LIKE \'Anonymous%\' AND :time = :time";

  public static final String FIND_LAST_CREATED_USER_QUERY = "SELECT new org.dicadeveloper.weplantaforest.reports.rankings.TimeRankedUserData(user.name, user.regDate)"
      + "FROM User as user WHERE NOT user.name LIKE \'Anonymous%\' ORDER BY user.regDate desc";

  public static final String FIND_BEST_ORGANIZATION_QUERY = "SELECT new org.dicadeveloper.weplantaforest.reports.rankings.TreeRankedUserData(tree.owner.name, sum(tree.amount), sum(tree.amount * "
      + " tree.treeType.annualCo2SavingInTons * ((:time - tree.plantedOn) / 3.1536E10)), tree.owner.imageName) "
      + "FROM Tree as tree WHERE tree.owner.organizationType = :organizationType AND NOT tree.owner.name LIKE \'Anonymous%\' GROUP BY tree.owner ORDER BY sum(tree.amount) desc";

  public static final String FIND_BEST_ORGANIZATION_QUERY_FOR_LAST_YEAR = "SELECT new org.dicadeveloper.weplantaforest.reports.rankings.TreeRankedUserData(tree.owner.name, sum(tree.amount), "
      + " sum(tree.amount * tree.treeType.annualCo2SavingInTons * ((:time - tree.plantedOn) / 3.1536E10)), tree.owner.imageName) "
      + "FROM Tree as tree WHERE tree.owner.organizationType = :organizationType AND NOT tree.owner.name LIKE \'Anonymous%\' AND tree.plantedOn > (:time - 31536000000L) GROUP BY tree.owner "
      + " ORDER BY sum(tree.amount) desc";

  public static final String COUNT_BEST_ORGANIZATION_USER_QUERY = COUNT_BEST_USER_QUERY
      + " and tree.owner.organizationType = :organizationType AND NOT tree.owner.name LIKE \'Anonymous%\' AND :time = :time";

  public static final String COUNT_BEST_ORGANIZATION_USER_QUERY_FOR_LAST_YEAR = COUNT_BEST_USER_QUERY
      + " and tree.owner.organizationType = :organizationType AND NOT tree.owner.name LIKE \'Anonymous%\' AND tree.plantedOn > (:time - 31536000000L)";

  public static final String FIND_LAST_PLANTED_TREES_QUERY = "SELECT new org.dicadeveloper.weplantaforest.reports.rankings.TimeRankedTreeData(cartItems.tree.owner.name, cartItems.tree.amount, cartItems.tree.plantedOn, cartItems.tree.treeType.name, cartItems.tree.treeType.imageFile) "
      + "FROM Cart as cart JOIN cart.cartItems cartItems WHERE cart.cartState IN ('VERIFIED', 'GENERATED', 'CALLBACK') AND NOT cartItems.tree.owner.name LIKE \'Anonymous%\' ORDER BY cartItems.tree.plantedOn DESC";

  public static final String FIND_BEST_TEAM_QUERY = "SELECT new org.dicadeveloper.weplantaforest.reports.rankings.TreeRankedUserData(tree.owner.team.name, sum(tree.amount), sum(tree.amount * tree.treeType.annualCo2SavingInTons * ((:time - tree.plantedOn) / 3.1536E10)), CAST(tree.owner.team.id as string)) "
      + " FROM Tree as tree WHERE tree.owner.team != null GROUP BY tree.owner.team.name ORDER BY sum(tree.amount) desc";

  public static final String FIND_BEST_TEAM_QUERY_FOR_LAST_YEAR = "SELECT new org.dicadeveloper.weplantaforest.reports.rankings.TreeRankedUserData(tree.owner.team.name, sum(tree.amount), sum(tree.amount * tree.treeType.annualCo2SavingInTons * ((:time - tree.plantedOn) / 3.1536E10)), CAST(tree.owner.team.id as string)) "
      + " FROM Tree as tree WHERE tree.owner.team != null  AND tree.plantedOn > (:time - 31536000000L) GROUP BY tree.owner.team.name ORDER BY sum(tree.amount) desc";

  public static final String COUNT_BEST_TEAM_QUERY = "SELECT count(distinct team.name) from Team as team where :time = :time";

  public static final String COUNT_BEST_TEAM_QUERY_FOR_LAST_YEAR = "SELECT count(distinct team.name) from Team as team where :time = :time ";

  public static final String FIND_BEST_USER_FROM_TIMERANGE_QUERY = "SELECT new org.dicadeveloper.weplantaforest.reports.rankings.TreeRankedUserData(tree.owner.name, sum(tree.amount)) "
      + "FROM Tree as tree WHERE tree.plantedOn BETWEEN :timeRangeStart AND :timeRangeEnd GROUP BY tree.owner ORDER BY sum(tree.amount) desc";

  public static final String FIND_BEST_USER_QUERY_FOR_PROJECT = "SELECT new org.dicadeveloper.weplantaforest.reports.rankings.TreeRankedUserData(tree.owner.name, sum(tree.amount), sum(tree.amount * tree.treeType.annualCo2SavingInTons * ((:time - tree.plantedOn) / 3.1536E10)), tree.owner.imageName) "
      + "FROM Tree as tree WHERE tree.projectArticle.project.name = :projectName AND NOT tree.owner.name LIKE \'Anonymous%\' GROUP BY tree.owner ORDER BY sum(tree.amount) desc";

  public static final String COUNT_BEST_USER_QUERY_FOR_PROJECT = "SELECT count(distinct tree.owner.name) from Tree as tree where NOT tree.owner.name LIKE \'Anonymous%\' AND tree.projectArticle.project.name = :projectName AND :time = :time";

  public static final String FIND_BEST_TEAM_FOR_PROJECT_QUERY = "SELECT new org.dicadeveloper.weplantaforest.reports.rankings.TreeRankedUserData(tree.owner.team.name, sum(tree.amount), sum(tree.amount * tree.treeType.annualCo2SavingInTons * ((:time - tree.plantedOn) / 3.1536E10)), CAST(tree.owner.team.id as string)) "
      + "FROM Tree as tree WHERE tree.owner.team != null AND tree.projectArticle.project.name = :projectName GROUP BY tree.owner.team.name ORDER BY sum(tree.amount) desc";

  public static final String COUNT_BEST_TEAM_FOR_PROJECT_QUERY = "SELECT count(distinct team.name) from Team as team where :time = :time AND :projectName = :projectName";

  public static final String FIND_LAST_PLANTED_TREES_IN_PROJECT_QUERY = "SELECT new org.dicadeveloper.weplantaforest.reports.rankings.TimeRankedTreeData(tree.owner.name, tree.amount, tree.plantedOn, tree.treeType.name, tree.treeType.imageFile) "
      + "FROM Tree as tree WHERE tree.projectArticle.project.name = :projectName AND NOT tree.owner.name LIKE \'Anonymous%\' ORDER BY tree.plantedOn desc";

  public static final String FIND_LAST_PLANTED_TREES = "SELECT new org.dicadeveloper.weplantaforest.reports.rankings.TimeRankedTreeData(tree.owner.name, tree.amount, tree.plantedOn, tree.treeType.name, tree.treeType.imageFile) "
      + "FROM Tree as tree WHERE NOT tree.owner.name LIKE \'Anonymous%\' AND "
      // if there is a cart to this tree the cart must be in state VERIFIED; CALLBACK
      // or GENERATED
      + "((select cart.cartState from Cart as cart where cart.id = (select min(ci.cart.id) from CartItem as ci where ci.tree.id = tree.id))  IN ('VERIFIED', 'GENERATED', 'CALLBACK')"
      // if there is no cart, it is a self planted tree and should be included in the
      // result
      + " OR (select cart.cartState from Cart as cart where cart.id = (select min(ci.cart.id) from CartItem as ci where ci.tree.id = tree.id)) IS NULL) ORDER BY tree.plantedOn desc";

  @Query(value = FIND_BEST_USER_QUERY, countQuery = COUNT_BEST_USER_QUERY)
  Page<TreeRankedUserData> getBestUser(@Param("time") long timeOfMeasurement, Pageable page);

  @Query(value = FIND_BEST_USER_QUERY_FOR_LAST_YEAR, countQuery = COUNT_BEST_USER_QUERY_FOR_LAST_YEAR)
  Page<TreeRankedUserData> getBestUserForLastYear(@Param("time") Long timeOfMeasurement, Pageable page);

  @Query(value = FIND_BEST_USER_QUERY, countQuery = COUNT_BEST_USER_QUERY)
  @Cacheable(value = CacheConfiguration.TEN_MINUTE_CACHE)
  List<TreeRankedUserData> getBestUserList(@Param("time") long timeOfMeasurement);

  @Query(value = FIND_LAST_CREATED_USER_QUERY)
  List<TimeRankedUserData> getLastCreatedUser(Pageable page);

  @Query(value = FIND_BEST_ORGANIZATION_QUERY, countQuery = COUNT_BEST_ORGANIZATION_USER_QUERY)
  Page<TreeRankedUserData> getBestUserFromOrganizationType(@Param("time") long timeOfMeasurement,
      @Param("organizationType") OrganizationType organizationType, Pageable page);

  @Query(value = FIND_BEST_ORGANIZATION_QUERY_FOR_LAST_YEAR, countQuery = COUNT_BEST_ORGANIZATION_USER_QUERY_FOR_LAST_YEAR)
  Page<TreeRankedUserData> getBestUserFromOrganizationTypeForLastYear(@Param("time") long timeOfMeasurement,
      @Param("organizationType") OrganizationType organizationType, Pageable page);

  @Query(value = FIND_LAST_PLANTED_TREES)
  Page<TimeRankedTreeData> getLastPlantedTrees(Pageable Page);

  @Query(value = FIND_BEST_TEAM_QUERY, countQuery = COUNT_BEST_TEAM_QUERY)
  Page<TreeRankedUserData> getBestTeams(@Param("time") long timeOfMeasurement, Pageable Page);

  @Query(value = FIND_BEST_TEAM_QUERY_FOR_LAST_YEAR, countQuery = COUNT_BEST_TEAM_QUERY_FOR_LAST_YEAR)
  Page<TreeRankedUserData> getBestTeamsForLastYear(@Param("time") long timeOfMeasurement, Pageable Page);

  @Query(value = FIND_BEST_TEAM_QUERY, countQuery = COUNT_BEST_TEAM_QUERY)
  @Cacheable(value = CacheConfiguration.TEN_MINUTE_CACHE)
  List<TreeRankedUserData> getBestTeamAsList(@Param("time") long timeOfMeasurement);

  @Query(value = FIND_BEST_USER_FROM_TIMERANGE_QUERY)
  List<TreeRankedUserData> getBestUserFromTimeRange(@Param("timeRangeStart") long timeRangeStart,
      @Param("timeRangeEnd") long timeRangeEnd, Pageable Page);

  @Query(value = FIND_BEST_USER_QUERY_FOR_PROJECT, countQuery = COUNT_BEST_USER_QUERY_FOR_PROJECT)
  Page<TreeRankedUserData> getBestUserForProject(@Param("projectName") String projectName,
      @Param("time") long timeOfMeasurement, Pageable page);

  @Query(value = FIND_BEST_TEAM_FOR_PROJECT_QUERY, countQuery = COUNT_BEST_TEAM_FOR_PROJECT_QUERY)
  Page<TreeRankedUserData> getBestTeamsForProject(@Param("projectName") String projectName,
      @Param("time") long timeOfMeasurement, Pageable Page);

  @Query(value = FIND_LAST_PLANTED_TREES_IN_PROJECT_QUERY)
  Page<TimeRankedTreeData> getLastPlantedTreesInProject(@Param("projectName") String projectName, Pageable Page);

}
