package org.dicadeveloper.weplantaforest.statistics;

import java.util.List;

import org.dicadeveloper.weplantaforest.trees.Tree;
import org.springframework.context.annotation.Profile;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

@Profile({ "production", "mysql", "staging" })
public interface StatisticsRepository extends CrudRepository<Tree, Long> {

    public static final String TREES_PER_YEAR_QUERY = "select new org.dicadeveloper.weplantaforest.statistics.TreeAmountStatisticData(sum(tree.amount), DATE_FORMAT(FROM_UNIXTIME(_plantedOn/1000), "
            + " '%Y')) FROM Tree tree GROUP BY DATE_FORMAT(FROM_UNIXTIME(_plantedOn/1000), '%Y')";

    public static final String TREES_PER_MONTH_QUERY = "select new org.dicadeveloper.weplantaforest.statistics.TreeAmountStatisticData(sum(tree.amount), DATE_FORMAT(FROM_UNIXTIME(_plantedOn/1000), "
            + " '%c')) FROM Tree tree WHERE DATE_FORMAT(FROM_UNIXTIME(_plantedOn/1000), '%Y') = :year GROUP BY DATE_FORMAT(FROM_UNIXTIME(_plantedOn/1000), '%c') ORDER BY DATE_FORMAT(FROM_UNIXTIME"
            + "(_plantedOn/1000), '%c')";

    public static final String TREES_PER_ORGTYPE = "select new org.dicadeveloper.weplantaforest.statistics.TreeOrgTypeStatisticData(sum(tree.amount), tree.owner.organizationType) FROM Tree tree "
            + " WHERE " + " tree.owner.organizationType != 4 GROUP BY tree.owner.organizationType ORDER BY tree.owner.organizationType asc";

    public static final String USER_PER_YEAR_QUERY = "select new org.dicadeveloper.weplantaforest.statistics.TreeAmountStatisticData(count(_userId), DATE_FORMAT(FROM_UNIXTIME(_regDate/1000), "
            + " '%Y')) FROM User GROUP BY DATE_FORMAT(FROM_UNIXTIME(_regDate/1000), '%Y')";

    @Query(value = TREES_PER_YEAR_QUERY)
    List<TreeAmountStatisticData> getTreesPerYear();

    @Query(value = TREES_PER_MONTH_QUERY)
    List<TreeAmountStatisticData> getTreesPerMonthForYear(@Param("year") String year);

    @Query(value = TREES_PER_ORGTYPE)
    List<TreeOrgTypeStatisticData> getTreesPerOrgType();

    @Query(value = USER_PER_YEAR_QUERY)
    List<TreeAmountStatisticData> getUserPerYear();

}
