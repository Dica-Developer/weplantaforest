package org.dicadeveloper.weplantaforest.admin.abo;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface AboRepository extends CrudRepository<Abo, Long> {

    public final static String FIND_ABOS_BY_USER_ID = "SELECT abo FROM Abo abo WHERE abo.user.id = :userId";
    
    public final static String FIND_ACTIVE_ABOS = "SELECT abo FROM Abo abo WHERE abo.active = true";

    @Query(value = FIND_ABOS_BY_USER_ID)
    public List<Abo> findAbosByUserId(@Param("userId") long userId);
    
    @Query(value = FIND_ACTIVE_ABOS)
    public List<Abo> findAllActiveAbos();

}
