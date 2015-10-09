package org.dicadeveloper.weplantaforest.trees;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.dicadeveloper.weplantaforest.admin.codes.Team;
import org.dicadeveloper.weplantaforest.base.Base;

@Entity
@Table(name = "User")
public class User implements Base {

    @Id
    @GeneratedValue
    @Column(name = "_userId")
    private long _userId;

    @Column(unique = true, name = "_name")
    private String _name;

    @Column(name = "_enabled", nullable = false)
    private boolean _enabled = false;
    @Column(name = "_banned", nullable = false)
    private boolean _banned = false;

    @ManyToOne(optional = true)
    private Team _team;

    public long getId() {
        return _userId;
    }

    public void setId(long id) {
        _userId = id;
    }

    public String getName() {
        return _name;
    }

    public void setName(String name) {
        _name = name;
    }

    public void setEnabled(boolean enabled) {
        _enabled = enabled;
    }

    public boolean isEnabled() {
        return _enabled;
    }
}
