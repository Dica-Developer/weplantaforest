package org.dicadeveloper.weplantaforest.services;

import java.io.Serializable;
import java.util.List;

import org.dicadeveloper.weplantaforest.persist.dto.BaseDto;
import org.springframework.data.domain.Pageable;

public interface GenericService<T, D extends BaseDto, ID extends Serializable> {

    D findOne(ID id);

    List<D> findAll();

    List<D> findAll(Pageable page);

    /**
     * Persists the given DTO and sets the id on this DTO to allow to use it on
     * persisting referencing DTO's.
     * 
     * @param dto
     */
    void save(D dto);

    boolean existsAtAll();
}
