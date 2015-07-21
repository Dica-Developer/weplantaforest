package org.dicadeveloper.weplantaforest.treetypes;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TreeTypeRepository extends JpaRepository<TreeType, Long> {

    public final static String FIND_BY_NAME_QUERY = "SELECT type FROM TreeType type WHERE type._name = :name";

    @Query(FIND_BY_NAME_QUERY)
    public TreeType findByName(@Param("name") String name);
}
