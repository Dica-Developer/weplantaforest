package org.dicadeveloper.weplantaforest.admin.codes;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository("teamRepository")
public interface TeamRepository  extends CrudRepository<Team, Long>{

}
