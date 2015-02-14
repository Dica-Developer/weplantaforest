package org.dicadeveloper.weplantaforest.persist.dto;

import java.util.Date;

import org.dozer.Mapping;

public class TreeDto {

    @Mapping("_id")
    public long _id;

    @Mapping("_longitude")
    public float _longitude;

    @Mapping("_latitude")
    public float _latitude;

    @Mapping("_amount")
    public int _amount;

    @Mapping("_submittedOn")
    public Date _submittedOn;

    @Mapping("_type")
    private TreeTypeDto _type;

    // TODO figure out how to set this properly
    public int limit = 5, offset = 10; // Getters for these

    // TODO figure out how to set this properly
    public int modelLimit = 100; // Getters for these

    public TreeDto() {
    }

    public TreeDto(float latitude, float longitude, int amount) {
        _latitude = latitude;
        _longitude = longitude;
        _amount = amount;
        _submittedOn = new Date();
    }

    public long getId() {
        return _id;
    }

    public void setId(long id) {
        _id = id;
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
        return _submittedOn;
    }

    public void setSubmittedOn(Date submittedOn) {
        _submittedOn = submittedOn;
    }

    public TreeTypeDto getTreeType() {
        return _type;
    }

    public void setTreeType(TreeTypeDto type) {
        _type = type;
    }

    public int getLimit() {
        return limit;
    }

    public int getOffset() {
        return offset;
    }

    public int getModelLimit() {
        return modelLimit;
    }

    @Override
    public String toString() {
        return "TreeDto [_id=" + _id + ", _longitude=" + _longitude + ", _latitude=" + _latitude + ", _amount=" + _amount + ", _submittedOn=" + _submittedOn + ", _type=" + _type + "]";
    }

}
