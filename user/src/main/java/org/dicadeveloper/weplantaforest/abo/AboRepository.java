package org.dicadeveloper.weplantaforest.abo;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface AboRepository extends CrudRepository<Abo, Long> {

    public final static String FIND_ABOS_BY_USER_ID = "SELECT abo FROM Abo abo WHERE abo.user.id = :userId";

    @Query(value = FIND_ABOS_BY_USER_ID)
    public List<Abo> findAbosByUserId(@Param("userId") long userId);

}
