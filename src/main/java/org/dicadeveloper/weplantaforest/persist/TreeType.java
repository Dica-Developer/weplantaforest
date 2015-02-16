package org.dicadeveloper.weplantaforest.persist;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "treeTypes")
public class TreeType {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private long _id;

    @Column(name = "name", unique = true)
    private String _name;

    @Column(name = "description")
    private String _description;

    @Column(name = "imagePath")
    private String _imagePath;

    @Column(name = "infoPath")
    private String _infoPath;

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
}
