package org.dicadeveloper.weplantaforest.persist.dto;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

import org.dozer.Mapping;
import org.springframework.hateoas.Identifiable;

@XmlRootElement
public class TreeTypeDto implements Identifiable<Long> {

    public static final TreeTypeDto NO_TREE_TYPE = new TreeTypeDto();

    @Mapping("_id")
    private Long _id;

    @Mapping("_name")
    private String _name;

    @Mapping("_description")
    private String _description;

    @Mapping("_imagePath")
    private String _imagePath;

    @Mapping("_infoPath")
    private String _infoPath;

    // TODO figure out how to set this properly
    private int limit = 5, offset = 10; // Getters for these

    // TODO figure out how to set this properly
    private int modelLimit = 100; // Getters for these

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

    @Override
    public Long getId() {
        return _id;
    }

    @XmlTransient
    public int getLimit() {
        return limit;
    }

    @XmlTransient
    public int getOffset() {
        return offset;
    }

    @XmlTransient
    public int getModelLimit() {
        return modelLimit;
    }

}
