package org.dicadeveloper.weplantaforest.trees;

import org.dicadeveloper.weplantaforest.base.GenericService;

public interface UserService extends GenericService<User, UserDto, Long> {

    @Override
    void save(UserDto treeTypeDto);

    UserDto findByName(String name);
}
