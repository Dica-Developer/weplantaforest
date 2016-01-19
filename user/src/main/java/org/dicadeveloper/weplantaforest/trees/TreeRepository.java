package org.dicadeveloper.weplantaforest.trees;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository("treeRepository")
@Transactional
public interface TreeRepository extends CrudRepository<Tree, Long> {

	public final static String FIND_TREETYPE_ID_BY_TREE_ID_QUERY = "SELECT tree.treeType.id  FROM Tree tree WHERE tree.id = :id";

	@Query(value = FIND_TREETYPE_ID_BY_TREE_ID_QUERY)
	@Transactional(readOnly = true)
	public Long findTreeTypeIdByTreeId(@Param("id") Long treeId);
}
