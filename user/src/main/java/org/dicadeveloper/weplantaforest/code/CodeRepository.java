package org.dicadeveloper.weplantaforest.code;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface CodeRepository extends CrudRepository<Code, Long>{

    @Query
    public Code findByCode(@Param("code") String code);
    
}
