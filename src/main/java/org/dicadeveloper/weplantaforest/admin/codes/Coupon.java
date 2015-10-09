package org.dicadeveloper.weplantaforest.admin.codes;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import org.dicadeveloper.weplantaforest.base.Base;

/**
 * Minimal version of what used to be the 'Code' entity in IPAT.
 */
@Entity(name = "Code")
public class Coupon implements Base {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long _id;

    @Column(unique = true, nullable = false)
    private String _code;

    // TODO review, creationDate ?
    @Column(nullable = false)
    private int _year;
    @Column(nullable = false)
    private int _month;

    // TODO to be removed (not used really)
    @Deprecated
    @Column(nullable = false)
    private int _number = -1;

    @ManyToOne(optional = true)
    private Event _event;

    @Column
    private int _treeCount;

    @Column(nullable = false)
    private boolean _evaluated = false;

    public void setId(final Long id) {
        _id = id;
    }

    public void setCode(final String code) {
        _code = code;
    }

    public String getCode() {
        return _code;
    }

    public void setYear(final int year) {
        _year = year;
    }

    public int getYear() {
        return _year;
    }

    public void setMonth(final int month) {
        _month = month;
    }

    public int getMonth() {
        return _month;
    }

    public void setEvent(final Event event) {
        _event = event;
    }

    public Event getEvent() {
        return _event;
    }

    public void setTreeCount(final int treeCount) {
        _treeCount = treeCount;
    }

    public int getTreeCount() {
        return _treeCount;
    }

    public void setEvaluated(final boolean evaluated) {
        _evaluated = evaluated;
    }

    public boolean isEvaluated() {
        return _evaluated;
    }

    @Override
    public long getId() {
        // TODO Auto-generated method stub
        return 0;
    }

}
