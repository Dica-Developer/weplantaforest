package org.dicadeveloper.weplantaforest.reports.co2;

import org.dicadeveloper.weplantaforest.trees.Tree;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

public interface Co2Repository extends PagingAndSortingRepository<Tree, Long> {

    public final static String GET_ALL_TREES_AND_CO2_SAVING = "select new org.dicadeveloper.weplantaforest.reports.co2.Co2Data(sum(tree.amount), sum(tree.amount * tree.treeType.annualCo2SavingInTons * ((:time - tree.plantedOn) / 3.1536E10))) from Tree as tree where tree.plantedOn <= :time";

    public final static String GET_TREES_AND_CO2_SAVING_FOR_USER_ID = "select new org.dicadeveloper.weplantaforest.reports.co2.Co2Data(COALESCE(sum(tree.amount),0), COALESCE(sum(tree.amount * tree.treeType.annualCo2SavingInTons * ((:time - tree.plantedOn) / 3.1536E10)),0.0)) from Tree as tree WHERE tree.owner.id = :userId";

    public final static String GET_TREES_AND_CO2_SAVING_FOR_USERNAME = "select new org.dicadeveloper.weplantaforest.reports.co2.Co2Data(COALESCE(sum(tree.amount),0), COALESCE(sum(tree.amount * tree.treeType.annualCo2SavingInTons * ((:time - tree.plantedOn) / 3.1536E10)),0.0))"
            + " from Tree as tree WHERE tree.owner.name = :name";

    public final static String GET_TREES_AND_CO2_SAVING_FOR_TEAM = "select new org.dicadeveloper.weplantaforest.reports.co2.Co2Data(sum(tree.amount), sum(tree.amount * tree.treeType.annualCo2SavingInTons * ((:time - tree.plantedOn) / 3.1536E10)))"
            + " from Tree as tree WHERE tree.owner.team.name = :teamName";

    @Query(GET_ALL_TREES_AND_CO2_SAVING)
    Co2Data getAllTreesAndCo2Saving(@Param("time") long timeOfMeasurement);

    @Query(GET_TREES_AND_CO2_SAVING_FOR_USERNAME)
    Co2Data getAllTreesAndCo2SavingForUserName(@Param("time") long timeOfMeasurement, @Param("name") String name);

    @Query(GET_TREES_AND_CO2_SAVING_FOR_TEAM)
    Co2Data getAllTreesAndCo2SavingForTeam(@Param("time") long timeOfMeasurement, @Param("teamName") String teamName);

    // TODO: subqueries doesn't work for from clause, so there has to be another
    // solution
    // select count(*) from (select sum(tree._amount) from Tree AS tree GROUP BY
    // tree._owner__userId
    // having sum(tree._amount) >= (select sum(_amount) from Tree WHERE
    // _owner__userId = 3935)) a;
    // @Query(value= "SELECT COUNT(*) FROM ( SELECT SUM(tree._amount) FROM Tree
    // AS tree GROUP BY tree._owner__userId HAVING SUM(tree._amount) >= ( SELECT
    // SUM(_amount) FROM Tree WHERE _owner__userId = ?1)) a", nativeQuery= true)
    // Long getUserRanking(@Param("userId") long userId);

}
