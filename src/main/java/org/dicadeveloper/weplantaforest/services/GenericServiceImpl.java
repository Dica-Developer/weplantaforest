package org.dicadeveloper.weplantaforest.services;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.ArrayList;
import java.util.List;

import org.dicadeveloper.weplantaforest.persist.Base;
import org.dicadeveloper.weplantaforest.persist.dto.BaseDto;
import org.dozer.DozerBeanMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.google.common.collect.Lists;

public class GenericServiceImpl<T extends Base, D extends BaseDto, ID extends Serializable> implements GenericService<T, D, ID> {

    @Autowired
    protected JpaRepository<T, ID> _repository;

    @Autowired
    protected DozerBeanMapper _mapper;

    protected Class<T> _entityClass;

    protected Class<D> _dtoClass;

    @SuppressWarnings("unchecked")
    public GenericServiceImpl() {
        ParameterizedType genericSuperclass = (ParameterizedType) getClass().getGenericSuperclass();
        _entityClass = (Class<T>) genericSuperclass.getActualTypeArguments()[0];
        _dtoClass = (Class<D>) genericSuperclass.getActualTypeArguments()[1];
    }

    @Override
    public D findOne(ID id) {
        return _mapper.map(_repository.findOne(id), _dtoClass);
    }

    @Override
    public List<D> findAll() {
        List<D> result = Lists.newArrayList();
        for (T t : _repository.findAll()) {
            result.add(_mapper.map(t, _dtoClass));
        }
        return result;
    }

    @Override
    public List<D> findAll(Pageable page) {
        List<D> result = new ArrayList<D>(page.getPageSize());
        for (T t : _repository.findAll(page)) {
            result.add(_mapper.map(t, _dtoClass));
        }
        return result;
    }

    @Override
    public void save(D dto) {
        T entity = _repository.saveAndFlush(_mapper.map(dto, _entityClass));
        dto.setId(entity.getId());
    }

    /**
     * Returns true in case at least one entity exists otherwise false.
     */
    @Override
    public boolean existsAtAll() {
        return _repository.count() > 0;
    }

}
