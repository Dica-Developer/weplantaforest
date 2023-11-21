package org.dicadeveloper.weplantaforest.projects;

import java.util.List;

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

    @Query(value = "SELECT p FROM Project p where p.shopActive=true AND p.visible=true")
    @Transactional(readOnly = true)
    public Page<Project> active(Pageable pageable);

    @Query(value = "SELECT project FROM Project project WHERE project.name like %:searchValue%")
    public List<Project> searchProjects(@Param("searchValue") String searchValue);
}
