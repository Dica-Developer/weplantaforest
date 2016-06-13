package org.dicadeveloper.weplantaforest.admin.codes;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends CrudRepository<Cart, Long> {
    
    public List<Cart> findCartsByIdIn(@Param("id") Long[] ids);

}
