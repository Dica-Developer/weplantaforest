package org.dicadeveloper.weplantaforest.persist;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {

    public final static String FIND_BY_NAME_QUERY = "SELECT user FROM User user WHERE user._name = :name";

    @Query(FIND_BY_NAME_QUERY)
    public User findByName(@Param("name") String name);
}
