package org.dicadeveloper.weplantaforest.projects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.dicadeveloper.weplantaforest.base.Base;

@Entity
public class Image implements Base {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long _id;

    @Column(nullable = false)
    private DataType _type;

    @Column(nullable = false)
    private String _file;

    public void setId(final Long id) {
        _id = id;
    }

    public long getId() {
        return _id;
    }

    public void setType(final DataType type) {
        _type = type;
    }

    public DataType getType() {
        return _type;
    }

    public void setFile(final String file) {
        _file = file;
    }

    public String getFile() {
        return _file;
    }
}
