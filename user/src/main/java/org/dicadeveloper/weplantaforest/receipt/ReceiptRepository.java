package org.dicadeveloper.weplantaforest.receipt;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ReceiptRepository extends CrudRepository<Receipt, Long> {

    @Query
    public List<Receipt> findByOwnerId(@Param("ownerId") Long ownerId);

    @Query(value = "select receipt from Receipt as receipt where receipt.id = :receiptId AND receipt.owner.id = :userId", nativeQuery = false)
    public Optional<Receipt> findByIdAndOwner(Long receiptId, Long userId);

    public boolean existsByReceiptIdAndOwnerId(Long receiptId, Long ownerId);

}
