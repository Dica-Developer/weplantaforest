package org.dicadeveloper.weplantaforest.trees;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends CrudRepository<User, Long> {

    @Query
    public User findByName(@Param("name") String name);
}
