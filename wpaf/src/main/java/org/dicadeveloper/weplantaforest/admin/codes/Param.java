package org.dicadeveloper.weplantaforest.admin.codes;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Param {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long _id;

    @Column(nullable = false)
    private String _name;

    @Column(nullable = false, length = 10000)
    private String _value;

    @ManyToOne
    private Abo _abo;

    public Param() {
    }

    public Param(final String name, final String value) {
        _name = name;
        _value = value;
    }

    public void setValue(final String value) {
        _value = value;
    }

    public String getValue() {
        return _value;
    }

    public void setName(final String name) {
        _name = name;
    }

    public String getName() {
        return _name;
    }

    public void setId(final Long id) {
        _id = id;
    }

    public Long getId() {
        return _id;
    }

    public void setAbo(final Abo abo) {
        _abo = abo;
    }

    public Abo getAbo() {
        return _abo;
    }
}
