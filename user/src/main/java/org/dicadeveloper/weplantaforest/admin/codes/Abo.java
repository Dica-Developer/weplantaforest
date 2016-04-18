package org.dicadeveloper.weplantaforest.admin.codes;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.dicadeveloper.weplantaforest.trees.User;

@Entity
public class Abo {

    public enum Type {
        TREE, PRICE;
    }

    public enum Period {
        DAYLI, WEEKLY, MONTHLY, QUARTERLY, YEARLY;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long _id;

    @Column(nullable = false)
    private Type _type;

    @Column(nullable = false)
    private Integer _amount;

    @Column(nullable = false)
    private Period _period;

    @ManyToOne(optional = true)
    @JoinColumn(name = "_user__userId")
    private User _user;

    @Column(nullable = false)
    private Long _timeStamp;

    @Column(nullable = true)
    private Long _last;

    @Column(nullable = false)
    private boolean _active = false;

    @OneToMany(mappedBy = "_abo")
    private List<Param> _params = new ArrayList<Param>();

    @OneToMany(mappedBy = "_abo")
    private List<Cart> _carts = new ArrayList<Cart>();

    @OneToOne(optional = true)
    @JoinColumn(name = "_currentCart__cartId")
    private Cart _currentCart;

    public void setType(final Type type) {
        _type = type;
    }

    public Type getType() {
        return _type;
    }

    public void setAmount(final Integer amount) {
        _amount = amount;
    }

    public Integer getAmount() {
        return _amount;
    }

    public void setPeriod(final Period period) {
        _period = period;
    }

    public Period getPeriod() {
        return _period;
    }

    public void setUser(final User user) {
        _user = user;
    }

    public User getUser() {
        return _user;
    }

    public void setTimeStamp(final Long timeStamp) {
        _timeStamp = timeStamp;
    }

    public Long getTimeStamp() {
        return _timeStamp;
    }

    public Date getTimeStampAsDate() {
        return new Date(_timeStamp);
    }

    public void setLast(final Long last) {
        _last = last;
    }

    public Long getLast() {
        return _last;
    }

    public Date getLastAsDate() {
        return new Date(_last);
    }

    public void setId(final Long id) {
        _id = id;
    }

    public Long getId() {
        return _id;
    }

    public void setCurrentCart(final Cart currentCart) {
        _currentCart = currentCart;
    }

    public Cart getCurrentCart() {
        return _currentCart;
    }

    public void setCarts(final List<Cart> carts) {
        _carts = carts;
    }

    public List<Cart> getCarts() {
        return _carts;
    }

    public void setParams(final List<Param> params) {
        _params = params;
    }

    public List<Param> getParams() {
        return _params;
    }

    public void addParam(final Param param) {
        _params.add(param);
    }

    public void setActive(final boolean active) {
        _active = active;
    }

    public boolean isActive() {
        return _active;
    }
}
