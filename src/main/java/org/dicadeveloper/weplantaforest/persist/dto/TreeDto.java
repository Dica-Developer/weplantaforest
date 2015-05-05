package org.dicadeveloper.weplantaforest.persist.dto;

import java.util.Date;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import org.dozer.Mapping;
import org.springframework.hateoas.ResourceSupport;

import com.fasterxml.jackson.annotation.JsonIgnore;

@XmlRootElement
public class TreeDto extends ResourceSupport implements BaseDto {

    @Mapping("_treeId")
    private Long _id;

    private float _longitude;
    @Mapping("_latitude")
    private float _latitude;

    private int _amount;

    private Date _submittedOn;
    @Mapping("_plantedOn")
    private Date _plantedOn;

    private String _treeTypeName;
    private String _ownerName;

    private Long _treeTypeId;

    // TODO figure out how to set this properly
    private int limit = 5, offset = 10; // Getters for these

    // TODO figure out how to set this properly
    private int modelLimit = 100; // Getters for these

    @Mapping("_treeType")
    private TreeTypeDto _treeType;

    @Mapping("_owner")
    private UserDto _owner;

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
        Date result = null;
        if (null != _submittedOn) {
            result = (Date) _submittedOn.clone();
        }
        return result;
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

    public UserDto getOwner() {
        return _owner;
    }

    public void setOwner(UserDto owner) {
        _owner = owner;
    }

    @Override
    public String toString() {
        return "TreeDto [_id=" + _id + ", _longitude=" + _longitude + ", _latitude=" + _latitude + ", _amount=" + _amount + ", _submittedOn=" + _submittedOn + "]";
    }

    public Date getPlantedOn() {
        Date result = null;
        if (null != _plantedOn) {
            result = (Date) _plantedOn.clone();
        }
        return result;
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

    public String getOwnerName() {
        return _ownerName;
    }

    public void setOwnerName(String ownerName) {
        _ownerName = ownerName;
    }

    public Long getTreeTypeId() {
        return _treeTypeId;
    }

    public void setTreeTypeId(Long treeTypeId) {
        _treeTypeId = treeTypeId;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = super.hashCode();
        result = prime * result + _amount;
        result = prime * result + ((_id == null) ? 0 : _id.hashCode());
        result = prime * result + Float.floatToIntBits(_latitude);
        result = prime * result + Float.floatToIntBits(_longitude);
        result = prime * result + ((_plantedOn == null) ? 0 : _plantedOn.hashCode());
        result = prime * result + ((_submittedOn == null) ? 0 : _submittedOn.hashCode());
        result = prime * result + ((_treeType == null) ? 0 : _treeType.hashCode());
        result = prime * result + ((_treeTypeId == null) ? 0 : _treeTypeId.hashCode());
        result = prime * result + ((_treeTypeName == null) ? 0 : _treeTypeName.hashCode());
        result = prime * result + limit;
        result = prime * result + modelLimit;
        result = prime * result + offset;
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (!super.equals(obj))
            return false;
        if (getClass() != obj.getClass())
            return false;
        TreeDto other = (TreeDto) obj;
        if (_amount != other._amount)
            return false;
        if (_id == null) {
            if (other._id != null)
                return false;
        } else if (!_id.equals(other._id))
            return false;
        if (Float.floatToIntBits(_latitude) != Float.floatToIntBits(other._latitude))
            return false;
        if (Float.floatToIntBits(_longitude) != Float.floatToIntBits(other._longitude))
            return false;
        if (_plantedOn == null) {
            if (other._plantedOn != null)
                return false;
        } else if (!_plantedOn.equals(other._plantedOn))
            return false;
        if (_submittedOn == null) {
            if (other._submittedOn != null)
                return false;
        } else if (!_submittedOn.equals(other._submittedOn))
            return false;
        if (_treeType == null) {
            if (other._treeType != null)
                return false;
        } else if (!_treeType.equals(other._treeType))
            return false;
        if (_treeTypeId == null) {
            if (other._treeTypeId != null)
                return false;
        } else if (!_treeTypeId.equals(other._treeTypeId))
            return false;
        if (_treeTypeName == null) {
            if (other._treeTypeName != null)
                return false;
        } else if (!_treeTypeName.equals(other._treeTypeName))
            return false;
        if (limit != other.limit)
            return false;
        if (modelLimit != other.modelLimit)
            return false;
        if (offset != other.offset)
            return false;
        return true;
    }
}
