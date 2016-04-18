package org.dicadeveloper.weplantaforest.trees;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends CrudRepository<User, Long> {

    public final static String FIND_BY_NAME_QUERY = "SELECT user FROM User user WHERE user.name = :name";

    @Query(FIND_BY_NAME_QUERY)
    public User findByName(@Param("name") String name);
}
