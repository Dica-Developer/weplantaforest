package org.dicadeveloper.weplantaforest.admin.user;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends CrudRepository<User, Long> {

    public final static String USER_EXISTS_QUERY = "SELECT COUNT(user) FROM User user WHERE user.name = :name)";
    
    public final static String FIND_PASSWORD_BY_USER_QUERY = "SELECT user.password FROM User user WHERE user.name = :name)";
    
    public final static String USER_WITH_MAIL_EXISTS_QUERY = "SELECT COUNT(user) FROM User user WHERE user.mail = :mail)";
    
    @Query
    public User findByName(@Param("name") String name);
    
    @Query(value = USER_EXISTS_QUERY)
    public long userExists(@Param("name") String name);
    
    @Query(value = USER_WITH_MAIL_EXISTS_QUERY)
    public long userWithMailExists(@Param("mail") String mail);
        
    @Query(value ="SELECT user FROM User user")
    public Page<User> findAllUser(Pageable page);
    
    @Query
    public List<User> findAllByOrderByNameAsc();
}
