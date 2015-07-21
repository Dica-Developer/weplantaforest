package org.dicadeveloper.weplantaforest.base;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface GenericService<T, D extends BaseDto, ID extends Serializable> {

    D findOne(ID id);

    List<D> findAll();

    Page<D> findAll(Pageable page);

    /**
     * Persists the given DTO and sets the id on this DTO to allow to use it on persisting referencing DTO's.
     * 
     * @param dto
     */
    void save(D dto);

    boolean existsAtAll();

    public long count();
}
