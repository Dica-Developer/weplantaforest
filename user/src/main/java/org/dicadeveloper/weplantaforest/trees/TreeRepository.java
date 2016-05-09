package org.dicadeveloper.weplantaforest.trees;

import org.dicadeveloper.weplantaforest.projects.ProjectArticle;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository("treeRepository")
@Transactional
public interface TreeRepository extends CrudRepository<Tree, Long> {

    public final static String FIND_TREETYPE_ID_BY_TREE_ID_QUERY = "SELECT tree.treeType.id  FROM Tree tree WHERE tree.id = :id";

    public final static String COUNT_ALREADY_PLANTED_TREES_BY_PROJECTARTICLE = "SELECT sum(tree.amount)  FROM Tree tree WHERE tree.projectArticle = :projectArticle";

    @Query(value = FIND_TREETYPE_ID_BY_TREE_ID_QUERY)
    @Transactional(readOnly = true)
    public Long findTreeTypeIdByTreeId(@Param("id") Long treeId);

    @Query(COUNT_ALREADY_PLANTED_TREES_BY_PROJECTARTICLE)
    public Long countAlreadyPlantedTreesByProjectArticle(@Param("projectArticle") ProjectArticle projectArticle);
}
