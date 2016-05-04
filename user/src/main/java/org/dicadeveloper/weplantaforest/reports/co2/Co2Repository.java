package org.dicadeveloper.weplantaforest.reports.co2;

import org.dicadeveloper.weplantaforest.trees.Tree;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

public interface Co2Repository extends PagingAndSortingRepository<Tree, Long> {

    @Query("select new org.dicadeveloper.weplantaforest.reports.co2.Co2Data(sum(tree.amount), sum(tree.amount * tree.treeType.annualCo2SavingInTons * ((:time - tree.plantedOn) / 3.1536E10))) from Tree as tree")
    Co2Data getAllTreesAndCo2Saving(@Param("time") long timeOfMeasurement);
}
