package org.dicadeveloper.weplantaforest.reports.co2;

import org.dicadeveloper.weplantaforest.trees.Tree;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

public interface Co2Repository extends PagingAndSortingRepository<Tree, Long> {

	@Query("SELECT sum(_amount) FROM Tree")
	Long countAmountOfTrees();

	// FIXME for performance reason we don't need a resolution of milliseconds
	// hours or minutes should be enough. that would allow the db to cache the
	// query
	// @Query("select sum(tree._amount * tree._treeType._annualCo2SavingInTons *
	// ((CURRENT_TIMESTAMP - tree._plantedOn) / 3.1536E10)) from Tree as tree")
	@Query("select sum(tree._amount * tree._treeType.annualCo2SavingInTons * ((:timeOfMeasurement - tree._plantedOn) / 3.1536E10)) from Tree as tree")
	Double getCo2Saving(@Param("timeOfMeasurement") long timeOfMeasurement);
}
