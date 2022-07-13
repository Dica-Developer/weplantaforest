package org.dicadeveloper.weplantaforest.admin.event;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface EventRepository extends CrudRepository<Event, Long> {

  @Query
  public Event findByName(@Param("name") String name);
}
