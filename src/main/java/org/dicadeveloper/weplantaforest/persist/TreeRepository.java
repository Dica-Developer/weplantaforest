package org.dicadeveloper.weplantaforest.persist;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TreeRepository extends JpaRepository<Tree, Long> {
    // nothing to do for now
}
