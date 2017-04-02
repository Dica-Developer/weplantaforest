package org.dicadeveloper.weplantaforest.admin.code;

import java.util.List;

import org.dicadeveloper.weplantaforest.admin.event.Event;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface CodeRepository extends CrudRepository<Code, Long>{

    @Query
    public Code findByCode(@Param("code") String code);
    
    public List<Code> findByEvent(@Param(value = "event") Event event);
    
}
