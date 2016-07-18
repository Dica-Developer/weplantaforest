package org.dicadeveloper.weplantaforest.admin.tree;

import java.util.List;

import org.dicadeveloper.weplantaforest.admin.project.ProjectArticle;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository("treeRepository")
@Transactional
public interface TreeRepository extends PagingAndSortingRepository<Tree, Long> {

    public final static String FIND_TREETYPE_ID_BY_TREE_ID_QUERY = "SELECT tree.treeType.id  FROM Tree tree WHERE tree.id = :id";

    public final static String COUNT_ALREADY_PLANTED_TREES_BY_PROJECTARTICLE = "SELECT COALESCE(sum(tree.amount), 0)  FROM Tree tree WHERE tree.projectArticle = :projectArticle";
    
    public final static String FIND_TREES_BY_USER_ID_QUERY = "SELECT tree  FROM Tree tree WHERE tree.owner.id = :ownerId";
    
    public final static String FIND_TREES_BY_PROJECT_ID_QUERY = "SELECT tree  FROM Tree tree WHERE tree.projectArticle.project.id = :projectId";

    @Query(value = FIND_TREETYPE_ID_BY_TREE_ID_QUERY)
    @Transactional(readOnly = true)
    public Long findTreeTypeIdByTreeId(@Param("id") Long treeId);

    @Query(COUNT_ALREADY_PLANTED_TREES_BY_PROJECTARTICLE)
    public Long countAlreadyPlantedTreesByProjectArticle(@Param("projectArticle") ProjectArticle projectArticle);
    
    @Query(value = FIND_TREES_BY_USER_ID_QUERY)
    public Page<Tree> findTreesByUserId(@Param("ownerId") Long ownerId, Pageable page);
    
    @Query(value = FIND_TREES_BY_PROJECT_ID_QUERY)
    public Page<Tree> findTreesByProjectId(@Param("projectId") Long projectId, Pageable page);
    
    public List<Tree> findTreesByIdIn(@Param("id") List<Long> ids);
}
