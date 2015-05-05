package org.dicadeveloper.weplantaforest.services;

import org.dicadeveloper.weplantaforest.persist.User;
import org.dicadeveloper.weplantaforest.persist.dto.UserDto;

public interface UserService extends GenericService<User, UserDto, Long> {

    @Override
    void save(UserDto treeTypeDto);

    UserDto findByName(String name);
}
