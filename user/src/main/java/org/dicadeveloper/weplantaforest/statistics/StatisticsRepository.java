package org.dicadeveloper.weplantaforest.statistics;

import java.util.List;

import org.dicadeveloper.weplantaforest.trees.Tree;
import org.springframework.context.annotation.Profile;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

@Profile({"production", "mysql", "staging"})
public interface StatisticsRepository extends CrudRepository<Tree, Long>{

    public final static String TREES_PER_YEAR_QUERY = "select new org.dicadeveloper.weplantaforest.statistics.TreeAmountStatisticData(sum(tree.amount), DATE_FORMAT(FROM_UNIXTIME(_plantedOn/1000), '%c')) FROM Tree tree WHERE DATE_FORMAT(FROM_UNIXTIME(_plantedOn/1000), '%Y') = :year GROUP BY DATE_FORMAT(FROM_UNIXTIME(_plantedOn/1000), '%c') ORDER BY DATE_FORMAT(FROM_UNIXTIME(_plantedOn/1000), '%c')";
    
    @Query(value = TREES_PER_YEAR_QUERY)
    List<TreeAmountStatisticData> getTreesPerMonthForYear(@Param("year") String year);
    
}
