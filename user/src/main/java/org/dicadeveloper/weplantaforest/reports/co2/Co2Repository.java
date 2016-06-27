package org.dicadeveloper.weplantaforest.reports.co2;

import org.dicadeveloper.weplantaforest.trees.Tree;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

public interface Co2Repository extends PagingAndSortingRepository<Tree, Long> {
    
    public final static String GET_ALL_TREES_AND_CO2_SAVING ="select new org.dicadeveloper.weplantaforest.reports.co2.Co2Data(sum(tree.amount), sum(tree.amount * tree.treeType.annualCo2SavingInTons * ((:time - tree.plantedOn) / 3.1536E10))) from Tree as tree";

    public final static String GET_TREES_AND_CO2_SAVING_FOR_USER ="select new org.dicadeveloper.weplantaforest.reports.co2.Co2Data(sum(tree.amount), sum(tree.amount * tree.treeType.annualCo2SavingInTons * ((:time - tree.plantedOn) / 3.1536E10))) from Tree as tree WHERE tree.owner.id = :userId";
  
    @Query(GET_ALL_TREES_AND_CO2_SAVING)
    Co2Data getAllTreesAndCo2Saving(@Param("time") long timeOfMeasurement);
    
    @Query(GET_TREES_AND_CO2_SAVING_FOR_USER)
    Co2Data getAllTreesAndCo2SavingForUserId(@Param("time") long timeOfMeasurement, @Param("userId") long userId);
}
