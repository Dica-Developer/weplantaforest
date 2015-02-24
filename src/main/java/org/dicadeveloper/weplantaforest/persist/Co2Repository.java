package org.dicadeveloper.weplantaforest.persist;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

//FIXME it seems the repository has to lay in the persist folder. Why?
@Repository("co2TreeRepository")
public interface Co2Repository extends JpaRepository<Tree, Long> {

    @Query("SELECT sum(_amount) FROM Tree")
    long countAmountOfTrees();

}
