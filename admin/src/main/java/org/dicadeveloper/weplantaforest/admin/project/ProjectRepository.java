package org.dicadeveloper.weplantaforest.admin.project;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository("projectRepository")
public interface ProjectRepository extends CrudRepository<Project, Long> {

    @Query
    public Project findByName(@Param("name") String name);

    @Query(value = "SELECT p FROM Project p where p.shopActive=true")
    @Transactional(readOnly = true)
    public Page<Project> active(Pageable pageable);
}
