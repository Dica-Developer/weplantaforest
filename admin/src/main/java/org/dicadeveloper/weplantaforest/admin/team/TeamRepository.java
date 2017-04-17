package org.dicadeveloper.weplantaforest.admin.team;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface TeamRepository extends CrudRepository<Team, Long> {

    @Query
    public Team findByName(@Param("name") String name);

    @Query
    public List<Team> findAllByOrderByNameAsc();
}
