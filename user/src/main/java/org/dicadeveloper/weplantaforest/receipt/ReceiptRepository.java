package org.dicadeveloper.weplantaforest.receipt;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ReceiptRepository extends CrudRepository<Receipt, Long> {

    
    @Query
    public List<Receipt> findByOwnerId(@Param("ownerId") Long ownerId);
    
}
