package org.dicadeveloper.weplantaforest.persist;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "trees")
public class Tree {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private long _id;

    @Column(name = "amount")
    private int _amount;

    @Column(name = "imagePath")
    private String _imagePath;

    @Column(name = "longitude")
    private float _longitude;

    @Column(name = "latitude")
    private float _latitude;

    @Column(name = "submittedOn")
    private long _submittedOn;

    @Column(name = "plantedOn")
    private long _plantedOn;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    private User _owner;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = TreeType.class)
    private TreeType _type;

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

    public String getImagePath() {
        return _imagePath;
    }

    public void setImagePath(String imagePath) {
        _imagePath = imagePath;
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

    public long getSubmittedOn() {
        return _submittedOn;
    }

    public void setSubmittedOn(long submittedOn) {
        _submittedOn = submittedOn;
    }

    public long getPlantedOn() {
        return _plantedOn;
    }

    public void setPlantedOn(long plantedOn) {
        _plantedOn = plantedOn;
    }

    public User getOwner() {
        return _owner;
    }

    public TreeType getType() {
        return _type;
    }

    public void setOwner(User owner) {
        _owner = owner;
    }

    public void setType(TreeType type) {
        _type = type;
    }

    @Override
    public String toString() {
        return "Tree [_id=" + _id + ", _amount=" + _amount + ", _imagePath=" + _imagePath + ", _longitude=" + _longitude + ", _latitude=" + _latitude + ", _submittedOn=" + _submittedOn
                + ", _plantedOn=" + _plantedOn + ", _owner=" + _owner + ", _type=" + _type + "]";
    }

}
