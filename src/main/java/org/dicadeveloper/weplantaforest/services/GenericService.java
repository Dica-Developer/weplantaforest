package org.dicadeveloper.weplantaforest.services;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.domain.Pageable;

public interface GenericService<T, D, ID extends Serializable> {

    D findOne(ID id);

    List<D> findAll();

    List<D> findAll(Pageable page);

    void save(D dto);

    boolean existsAtAll();
}
