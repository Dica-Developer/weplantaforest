package org.dicadeveloper.weplantaforest.persist.dto;

import java.util.Date;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import org.dozer.Mapping;

@XmlRootElement
public class TreeDto {

    @Mapping("_id")
    @XmlElement(name = "_id")
    private long _id;

    @Mapping("_longitude")
    private float _longitude;

    @Mapping("_latitude")
    private float _latitude;

    @Mapping("_amount")
    private int _amount;

    @Mapping("_submittedOn")
    private Date _submittedOn;

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

    @Override
    public String toString() {
        return "TreeDto [_id=" + _id + ", _longitude=" + _longitude + ", _latitude=" + _latitude + ", _amount=" + _amount + "]";
    }

}
