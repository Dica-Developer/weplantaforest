package org.dicadeveloper.weplantaforest.trees;

import org.dicadeveloper.weplantaforest.base.GenericServiceImpl;
import org.dozer.DozerBeanMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl extends GenericServiceImpl<User, UserDto, Long> implements UserService {

    @Autowired
    public UserServiceImpl(DozerBeanMapper mapper, UserRepository repository) {
        super(mapper, repository);
    }

    @Override
    public void save(UserDto userDto) {
        super.save(userDto);
    }

    @Override
    public UserDto findByName(String name) {
        UserRepository userRepo = (UserRepository) _repository;
        User user = userRepo.findByName(name);
        if (user == null) {
            return UserDto.NO_USER;
        }
        return _mapper.map(user, _dtoClass);
    }

}
