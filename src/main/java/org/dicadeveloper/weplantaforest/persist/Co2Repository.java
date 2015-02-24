package org.dicadeveloper.weplantaforest.persist;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

//FIXME it seems the repository has to lay in the persist folder. Why?
@Repository("co2TreeRepository")
public interface Co2Repository extends JpaRepository<Tree, Long> {

    @Query("SELECT sum(_amount) FROM Tree")
    long countAmountOfTrees();

    // FIXME for performance reason we don't need a resolution of milliseconds
    // hours or minutes should be enough. that would allow the db to cache the
    // query
    @Query("select sum(tree._amount * tree._type._annualCo2SavingInTons * ((CURRENT_TIMESTAMP - tree._plantedOn)/3.1536E10)) from Tree as tree")
    double getCo2Saving();

}
