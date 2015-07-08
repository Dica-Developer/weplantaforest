package org.dicadeveloper.weplantaforest.projects;

import java.util.Date;

import org.dicadeveloper.weplantaforest.persist.dto.BaseDto;
import org.dicadeveloper.weplantaforest.persist.dto.UserDto;
import org.dozer.Mapping;

public class ProjectDto implements BaseDto {

    @Mapping("_name")
    private String _name;

    @Mapping("_shopOpening")
    private Date _shopOpening;

    @Mapping("_shopClosing")
    private Date _shopClosing;

    @Mapping("_id")
    private Long _id;

    @Mapping("_manager")
    private UserDto _manager;

    @Mapping("_shopActive")
    private boolean _active;

    @Mapping("_description")
    private String _description;

    @Mapping("_mainImageFileName")
    private String _imageFileName;

    public ProjectDto() {
    }

    public ProjectDto(String name, Date opening, Date closing, boolean active) {
        _name = name;
        _shopOpening = opening;
        _shopClosing = closing;
        _active = active;
    }

    public void setId(Long id) {
        _id = id;
    }

    public Long getDtoId() {
        return _id;
    }

    public String getName() {
        return _name;
    }

    public void setName(String name) {
        _name = name;
    }

    public Date getShopOpening() {
        return _shopOpening;
    }

    public void setShopOpening(Date shopOpening) {
        _shopOpening = shopOpening;
    }

    public Date getShopClosing() {
        return _shopClosing;
    }

    public void setShopClosing(Date shopClosing) {
        _shopClosing = shopClosing;
    }

    public void setManager(UserDto manager) {
        _manager = manager;
    }

    public UserDto getManager() {
        return _manager;
    }

    public boolean isActive() {
        return _active;
    }

    public void setActive(boolean active) {
        _active = active;
    }

    public void setDescription(String description) {
        _description = description;
    }

    public String getDescription() {
        return _description;
    }

    public void setImageFileName(String imageFileName) {
        _imageFileName = imageFileName;
    }

    public String getImageFileName() {
        return _imageFileName;
    }
}