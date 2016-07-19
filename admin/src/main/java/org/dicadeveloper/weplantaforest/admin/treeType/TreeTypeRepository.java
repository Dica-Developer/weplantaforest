package org.dicadeveloper.weplantaforest.admin.treeType;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface TreeTypeRepository extends CrudRepository<TreeType, Long> {

    @Query
    public TreeType findByName(@Param("name") String name);

    @Query(value = "SELECT count(id) > 0 FROM TreeType")
    public boolean existsAtAll();
}
