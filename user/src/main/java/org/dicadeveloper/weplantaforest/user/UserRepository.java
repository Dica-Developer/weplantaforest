package org.dicadeveloper.weplantaforest.user;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends CrudRepository<User, Long> {

    public final static String USER_EXISTS_QUERY = "SELECT COUNT(user) FROM User user WHERE user.name = :name)";
    
    public final static String FIND_PASSWORD_BY_USER_QUERY = "SELECT user.password FROM User user WHERE user.name = :name)";
    
    @Query
    public User findByName(@Param("name") String name);
    
    @Query(value = USER_EXISTS_QUERY)
    public long userExists(@Param("name") String name);
    
    @Query(value = FIND_PASSWORD_BY_USER_QUERY)
    public String getPasswordByUserName(@Param("name") String name);
}
