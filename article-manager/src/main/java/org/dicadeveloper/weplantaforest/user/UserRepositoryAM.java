package org.dicadeveloper.weplantaforest.user;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface UserRepositoryAM extends CrudRepository<UserAM, Long> {

    @Query
    public UserAM findByName(@Param("name") String name);
}
