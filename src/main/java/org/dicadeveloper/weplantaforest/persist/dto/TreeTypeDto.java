package org.dicadeveloper.weplantaforest.persist.dto;

import org.dozer.Mapping;

public class TreeTypeDto {

    public static final TreeTypeDto NO_TREE_TYPE = new TreeTypeDto();

    @Mapping("_id")
    private long _id;

    @Mapping("_name")
    private String _name;

    @Mapping("_description")
    private String _description;

    @Mapping("_imagePath")
    private String _imagePath;

    @Mapping("_infoPath")
    private String _infoPath;

    public TreeTypeDto() {

    }

    public TreeTypeDto(String name, String description) {
        _name = name;
        _description = description;
    }

    public String getName() {
        return _name;
    }

    public void setName(String name) {
        _name = name;
    }

    public String getDescription() {
        return _description;
    }

    public void setDescription(String description) {
        _description = description;
    }

    public String getImagePath() {
        return _imagePath;
    }

    public void setImagePath(String imagePath) {
        _imagePath = imagePath;
    }

    public String getInfoPath() {
        return _infoPath;
    }

    public void setInfoPath(String infoPath) {
        _infoPath = infoPath;
    }

}
