package org.dicadeveloper.weplantaforest.projects;

import org.dicadeveloper.weplantaforest.persist.Tree;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("co2TreeRepository")
public interface ProjectRepository extends JpaRepository<Tree, Long> {

}
