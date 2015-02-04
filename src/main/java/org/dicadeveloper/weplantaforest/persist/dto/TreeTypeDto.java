package org.dicadeveloper.weplantaforest.persist.dto;

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

    // TODO figure out how to set this properly
    private int limit = 5, offset = 10; // Getters for these

    // TODO figure out how to set this properly
    private int modelLimit = 100; // Getters for these

    @XmlElementWrapper(name = "links")
    @XmlElement(name = "link")
    @InjectLinks({
            @InjectLink(style = Style.ABSOLUTE, rel = "self", value = PATHS.PATH_TREE_TYPES + "/{value}", bindings = { @Binding("${instance.id}") }),
            @InjectLink(style = Style.ABSOLUTE, rel = "parent", value = PATHS.PATH_TREE_TYPES),
            @InjectLink(style = Style.ABSOLUTE, value = PATHS.PATH_TREE_TYPES + "query/offset/{offset}/limit/{limit}", condition = "${instance.offset + instance.limit < instance.modelLimit}", bindings = {
                    @Binding(name = "offset", value = "${instance.offset + instance.limit}"), @Binding(name = "limit", value = "${instance.limit}") }, rel = "next"),
            @InjectLink(style = Style.ABSOLUTE, value = PATHS.PATH_TREE_TYPES + "query/offset/{offset}/limit/{limit}", condition = "${instance.offset - instance.limit >= 0}", bindings = {
                    @Binding(name = "offset", value = "${instance.offset - instance.limit}"), @Binding(name = "limit", value = "${instance.limit}") }, rel = "prev") })
    @XmlJavaTypeAdapter(Link.JaxbAdapter.class)
    List<Link> links;

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

    public long getId() {
        return _id;
    }

    public List<Link> getLinks() {
        return links;
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
