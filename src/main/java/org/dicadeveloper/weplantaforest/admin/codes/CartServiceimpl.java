package org.dicadeveloper.weplantaforest.admin.codes;

import org.dicadeveloper.weplantaforest.base.GenericServiceImpl;
import org.dozer.DozerBeanMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartServiceimpl extends GenericServiceImpl<Cart, CartDto, Long> implements CartService {

    @Autowired
    public CartServiceimpl(DozerBeanMapper mapper, CartRepository repository) {
        super(mapper, repository);
    }
}
