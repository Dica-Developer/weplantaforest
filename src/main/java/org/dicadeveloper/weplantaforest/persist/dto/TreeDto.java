package org.dicadeveloper.weplantaforest.persist.dto;

import java.util.Date;
import java.util.List;

import javax.ws.rs.core.Link;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

import org.dicadeveloper.weplantaforest.PATHS;
import org.dozer.Mapping;
import org.glassfish.jersey.linking.Binding;
import org.glassfish.jersey.linking.InjectLink;
import org.glassfish.jersey.linking.InjectLink.Style;
import org.glassfish.jersey.linking.InjectLinks;

@XmlRootElement
public class TreeDto {

    @Mapping("_id")
    private long _id;

    @Mapping("_longitude")
    private float _longitude;

    @Mapping("_latitude")
    private float _latitude;

    @Mapping("_amount")
    private int _amount;

    @Mapping("_submittedOn")
    private Date _submittedOn;

    @Mapping("_type")
    private TreeTypeDto _type;

    // TODO figure out how to set this properly
    private int limit = 5, offset = 10; // Getters for these

    // TODO figure out how to set this properly
    private int modelLimit = 100; // Getters for these

    @XmlElementWrapper(name = "links")
    @XmlElement(name = "link")
    @InjectLinks({
            @InjectLink(style = Style.ABSOLUTE, rel = "self", value = PATHS.PATH_TREES + "/{value}", bindings = { @Binding("${instance.id}") }),
            @InjectLink(style = Style.ABSOLUTE, rel = "parent", value = PATHS.PATH_TREES),
            @InjectLink(style = Style.ABSOLUTE, rel = "type", value = PATHS.PATH_TREE_TYPES + "/{value}", bindings = { @Binding("${instance.treeType.id}") }),
            @InjectLink(style = Style.ABSOLUTE, value = PATHS.PATH_TREES + "query/offset/{offset}/limit/{limit}", condition = "${instance.offset + instance.limit < instance.modelLimit}", bindings = {
                    @Binding(name = "offset", value = "${instance.offset + instance.limit}"), @Binding(name = "limit", value = "${instance.limit}") }, rel = "next"),
            @InjectLink(style = Style.ABSOLUTE, value = PATHS.PATH_TREES + "query/offset/{offset}/limit/{limit}", condition = "${instance.offset - instance.limit >= 0}", bindings = {
                    @Binding(name = "offset", value = "${instance.offset - instance.limit}"), @Binding(name = "limit", value = "${instance.limit}") }, rel = "prev") })
    @XmlJavaTypeAdapter(Link.JaxbAdapter.class)
    List<Link> links;

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

    @XmlTransient
    public TreeTypeDto getTreeType() {
        return _type;
    }

    public void setTreeType(TreeTypeDto type) {
        _type = type;
    }

    public List<Link> getLinks() {
        return links;
    }

    public void setLinks(List<Link> _links) {
        links = _links;
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

    @Override
    public String toString() {
        return "TreeDto [_id=" + _id + ", _longitude=" + _longitude + ", _latitude=" + _latitude + ", _amount=" + _amount + ", _submittedOn=" + _submittedOn + ", _type=" + _type + "]";
    }

}
