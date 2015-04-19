package org.dicadeveloper.weplantaforest.persist.dto;

import java.util.Date;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import org.dozer.Mapping;
import org.springframework.hateoas.ResourceSupport;

import com.fasterxml.jackson.annotation.JsonIgnore;

@XmlRootElement
public class TreeDto extends ResourceSupport implements BaseDto {

    @Mapping(value = "_id")
    private Long _id;

    private float _longitude;

    private float _latitude;

    private int _amount;

    private Date _submittedOn;

    private String _treeTypeName;

    private Long _treeTypeId;

    // TODO figure out how to set this properly
    private int limit = 5, offset = 10; // Getters for these

    // TODO figure out how to set this properly
    private int modelLimit = 100; // Getters for these

    // @Mapping("_type")
    private TreeTypeDto _treeType;

    private Date _plantedOn;

    public TreeDto() {
    }

    public TreeDto(float latitude, float longitude, int amount) {
        _latitude = latitude;
        _longitude = longitude;
        _amount = amount;
        _submittedOn = new Date();
    }

    @Override
    public void setId(Long id) {
        _id = id;
    }

    @XmlElement(name = "dtoID")
    public Long getDtoId() {
        return _id;
    }

    public int getAmount() {
        return _amount;
    }

    public void setAmount(int amount) {
        _amount = amount;
    }

    public float getLongitude() {
        return _longitude;
    }

    public void setLongitude(float longitude) {
        _longitude = longitude;
    }

    public float getLatitude() {
        return _latitude;
    }

    public void setLatitude(float latitude) {
        _latitude = latitude;
    }

    public Date getSubmittedOn() {
        return (Date) _submittedOn.clone();
    }

    public void setSubmittedOn(Date submittedOn) {
        _submittedOn = (Date) submittedOn.clone();
    }

    @JsonIgnore
    public int getLimit() {
        return limit;
    }

    @JsonIgnore
    public int getOffset() {
        return offset;
    }

    @JsonIgnore
    public int getModelLimit() {
        return modelLimit;
    }

    @JsonIgnore
    public TreeTypeDto getTreeType() {
        return _treeType;
    }

    public void setTreeType(TreeTypeDto treeType) {
        _treeType = treeType;
    }

    @Override
    public String toString() {
        return "TreeDto [_id=" + _id + ", _longitude=" + _longitude + ", _latitude=" + _latitude + ", _amount=" + _amount + ", _submittedOn=" + _submittedOn + "]";
    }

    public Date getPlantedOn() {
        return (Date) _plantedOn.clone();
    }

    public void setPlantedOn(Date plantedOn) {
        _plantedOn = (Date) plantedOn.clone();
    }

    public String getTreeTypeName() {
        return _treeTypeName;
    }

    public void setTreeTypeName(String treeTypeName) {
        _treeTypeName = treeTypeName;
    }

    public Long getTreeTypeId() {
        return _treeTypeId;
    }

    public void setTreeTypeId(Long treeTypeId) {
        _treeTypeId = treeTypeId;
    }

}
