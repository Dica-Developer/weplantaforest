package org.dicadeveloper.weplantaforest.admin.code;

import java.util.List;

import org.dicadeveloper.weplantaforest.admin.event.Event;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface CodeRepository extends CrudRepository<Code, Long> {

    public final static String FIND_CODE_BY_EVENT_ID_QUERY = "SELECT code FROM Code code WHERE code.event.id = :eventId";

    @Query
    public Code findByCode(@Param("code") String code);

    @Query(value = FIND_CODE_BY_EVENT_ID_QUERY)
    public List<Code> findByEventId(@Param(value = "eventId") Long eventId);

    @Query
    public List<Code> findByEvent(@Param(value = "event") Event event);
}
