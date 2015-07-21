package org.dicadeveloper.weplantaforest.trees;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.dicadeveloper.weplantaforest.persist.Base;
import org.dicadeveloper.weplantaforest.persist.TreeType;
import org.dicadeveloper.weplantaforest.persist.User;

@Entity
@Table(name = "Tree")
public class Tree implements Base {

    @Id
    @GeneratedValue
    @Column(name = "_treeId")
    private long _treeId;
    @Column(name = "_amount")
    private int _amount;
    @Column(name = "_imagePath")
    private String _imagePath;
    @Column(name = "_longitude")
    private float _longitude;
    @Column(name = "_latitude")
    private float _latitude;
    @Column(name = "_submittedOn")
    private long _submittedOn;
    @Column(name = "_plantedOn")
    private long _plantedOn;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    private User _owner;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = TreeType.class)
    private TreeType _treeType;

    public long getId() {
        return _treeId;
    }

    public void setId(long id) {
        _treeId = id;
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

    public void setOwner(User owner) {
        _owner = owner;
    }

    public TreeType getTreeType() {
        return _treeType;
    }

    public void setTreeType(TreeType treeType) {
        _treeType = treeType;
    }

    @Override
    public String toString() {
        return "Tree [_id=" + _treeId + ", _amount=" + _amount + ", _imagePath=" + _imagePath + ", _longitude=" + _longitude + ", _latitude=" + _latitude + ", _submittedOn=" + _submittedOn
                + ", _plantedOn=" + _plantedOn + ", _owner=" + _owner + ", _type=" + _treeType + "]";
    }

}
