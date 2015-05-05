package org.dicadeveloper.weplantaforest.persist;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository("treeRepository")
public interface TreeRepository extends JpaRepository<Tree, Long> {

    public final static String FIND_TREETYPE_ID_BY_TREE_ID_QUERY = "SELECT tree._treeType.treeTypeId  FROM Tree tree WHERE tree._treeId = :id";

    @Query(value = FIND_TREETYPE_ID_BY_TREE_ID_QUERY)
    @Transactional(readOnly = true)
    public Long findTreeTypeIdByTreeId(@Param("id") Long treeId);

}
