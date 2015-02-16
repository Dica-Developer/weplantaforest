package org.dicadeveloper.weplantaforest.persist;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TreeRepository extends JpaRepository<Tree, Long> {

    public final static String FIND_TREETYPE_ID_BY_TREE_ID_QUERY = "SELECT _type._id FROM Tree tree WHERE tree._id = :id";

    @Query(FIND_TREETYPE_ID_BY_TREE_ID_QUERY)
    public Long findTreeTypeIdById(@Param("id") Long id);

}
