package org.dicadeveloper.weplantaforest.admin.receipt;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import org.dicadeveloper.weplantaforest.admin.cart.Cart;
import org.dicadeveloper.weplantaforest.admin.user.User;
import org.dicadeveloper.weplantaforest.admin.views.Views;

import com.fasterxml.jackson.annotation.JsonView;

@Entity
public class Receipt {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonView(Views.OverviewCart.class)
    private Long _receiptId;

    @Column(unique = true)
    private String _invoiceNumber;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "_receipt__receiptId")
    private List<Cart> _carts = new ArrayList<Cart>();

    @Column
    private final Long _createdOn;

    @Column
    private Long _sentOn;

    @Column
    private Long _ownerId;

    public Receipt() {
        _createdOn = System.currentTimeMillis();
    }

    public void setInvoiceNumber(final String invoiceNumber) {
        _invoiceNumber = invoiceNumber;
    }

    public String getInvoiceNumber() {
        return _invoiceNumber;
    }

    public String getMaskedInvoiceNumber() {
        return _invoiceNumber.replace("/", "_");
    }

    public static String demaskInvoiceNumber(final String invoiceNumber) {
        return invoiceNumber.replace("_", "/");
    }

    public void setCarts(final List<Cart> carts) {
        _carts = carts;
    }

    public void addCart(final Cart cart) {
        if (!_carts.contains(cart)) {
            _carts.add(cart);
        }
    }

    public void removeCart(final Cart cart) {
        _carts.remove(cart);
    }

    public void clearCarts() {
        _carts.clear();
    }

    public List<Cart> getCarts() {
        return _carts;
    }

    public Long getId() {
        return _receiptId;
    }

    public Long getCreatedOn() {
        return _createdOn;
    }

    public Date getCreatedOnAsDate() {
        if (_createdOn / 1000000000000000000l >= 1) {
            return new Date(_createdOn / 1000000l);
        }
        return new Date(_createdOn);
    }

    public void setSentOn(final Long sentOn) {
        _sentOn = sentOn;
    }

    public void setSent() {
        _sentOn = System.nanoTime();
    }

    public Long getSentOn() {
        return _sentOn;
    }

    public boolean isSent() {
        return _sentOn == null;
    }

    public void setOwnerId(final Long ownerId) {
        _ownerId = ownerId;
    }

    public void setOwner(final User owner) {
        _ownerId = owner.getId();
    }

    public Long getOwnerId() {
        return _ownerId;
    }
}
