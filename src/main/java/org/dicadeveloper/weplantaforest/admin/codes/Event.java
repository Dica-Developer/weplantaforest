package org.dicadeveloper.weplantaforest.admin.codes;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.dicadeveloper.weplantaforest.trees.User;

@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long _id;

    @Column(nullable = false, unique = true)
    private String _name;

    @OneToMany(mappedBy = "_event")
    private List<Coupon> _codes = new ArrayList<Coupon>();

    @ManyToOne
    private Team _team;

    @ManyToOne
    private User _user;

    @Column
    private Integer _valid;

    @OneToMany(mappedBy = "_event")
    private List<Cart> _carts = new ArrayList<Cart>();

    @Column
    private Boolean _userReceiptReceiver = false;

    public Team getTeam() {
        return _team;
    }

    public List<Coupon> getCodes() {
        return _codes;
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

    public void setTeam(final Team team) {
        _team = team;
    }

    public void setCodes(final List<Coupon> codes) {
        _codes = codes;
    }

    public int getCodesCount() {
        return _codes.size();
    }

    public boolean getDeleteable() {
        return _carts.size() == 0;
    }

    public void setUser(final User user) {
        _user = user;
    }

    public User getUser() {
        return _user;
    }

    public void setValid(final Integer valid) {
        _valid = valid;
    }

    public Integer getValid() {
        return _valid;
    }

    public void addValid(final int valid) {
        if (_valid == null) {
            _valid = valid;
        } else {
            _valid += valid;
        }
    }

    public int getUnevaluated() {
        int count = 0;
        for (final Coupon code : _codes) {
            if (!code.isEvaluated()) {
                count++;
            }
        }
        return count;
    }

    public Coupon getFirstCode() {
        Coupon last = null;
        for (final Coupon code : _codes) {
            last = code;
            if (!code.isEvaluated()) {
                return code;
            }
        }
        return last;
    }

    public boolean isActive() {
        return _user == null && _valid == null || _user != null && _valid != null;
    }

    public void setCarts(final List<Cart> carts) {
        _carts = carts;
    }

    public void addCart(final Cart cart) {
        _carts.add(cart);
    }

    public void removeCart(final Cart cart) {
        _carts.remove(cart);
    }

    public List<Cart> getCarts() {
        return _carts;
    }

    public int getCartsCount() {
        return _carts.size();
    }

    public void setUserReceiptReceiver(boolean userReceiptReceiver) {
        _userReceiptReceiver = userReceiptReceiver;
    }

    public boolean getUserReceiptReceiver() {
        return _userReceiptReceiver != null && _userReceiptReceiver;
    }
}
