package org.dicadeveloper.weplantaforest.reports.rankings;

import org.dicadeveloper.weplantaforest.trees.Tree;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

public interface TreeRankingRepository  extends CrudRepository<Tree, Long> {

    public final static String FIND_LAST_PLANTED_TREES_QUERY = "SELECT tree FROM Tree tree ORDER BY tree.plantedOn DESC";
    
    @Query(FIND_LAST_PLANTED_TREES_QUERY)
    @Transactional(readOnly = true)
    public Page<Tree> findLastPlantedTrees(Pageable pageable);
}
