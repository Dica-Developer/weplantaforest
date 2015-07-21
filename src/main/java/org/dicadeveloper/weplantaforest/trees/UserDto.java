package org.dicadeveloper.weplantaforest.trees;

import javax.xml.bind.annotation.XmlRootElement;

import org.dicadeveloper.weplantaforest.base.BaseDto;
import org.dozer.Mapping;
import org.springframework.hateoas.Identifiable;

@XmlRootElement
public class UserDto implements Identifiable<Long>, BaseDto {

    public static final UserDto NO_USER = new UserDto();

    @Mapping("_userId")
    private Long _id;
    @Mapping("_name")
    private String _name;
    @Mapping("_enabled")
    private boolean _enabled = false;
    @Mapping("_banned")
    private boolean _banned = false;

    public UserDto() {

    }

    public UserDto(String name) {
        _name = name;
    }

    @Override
    public void setId(Long id) {
        _id = id;
    }

    @Override
    public Long getId() {
        return _id;
    }

    public String getName() {
        return _name;
    }

    public void setName(String name) {
        _name = name;
    }

    public void setEnabled(boolean enabled) {
        _enabled = enabled;
    }

    public boolean isEnabled() {
        return _enabled;
    }

    public void setBanned(boolean banned) {
        _banned = banned;
    }

    public boolean isBanned() {
        return _banned;
    }

}
