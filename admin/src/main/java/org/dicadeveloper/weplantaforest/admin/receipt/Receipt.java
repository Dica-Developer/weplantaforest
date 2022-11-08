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
    @Column(name = "_receiptId")
    private Long receiptId;

    @Column(unique = true, name = "_invoiceNumber")
    private String invoiceNumber;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "_receipt__receiptId")
    private List<Cart> carts = new ArrayList<Cart>();

    @Column(name = "_createdOn")
    private final Long createdOn;

    @Column(name = "_sentOn")
    @JsonView(Views.OverviewCart.class)
    private Long sentOn;

    @Column(name = "_ownerId")
    private Long ownerId;

    public Receipt() {
        createdOn = System.currentTimeMillis();
    }

    public void setInvoiceNumber(final String invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
    }

    public String getInvoiceNumber() {
        return invoiceNumber;
    }

    public String getMaskedInvoiceNumber() {
        return invoiceNumber.replace("/", "_");
    }

    public static String demaskInvoiceNumber(final String invoiceNumber) {
        return invoiceNumber.replace("_", "/");
    }

    public void setCarts(final List<Cart> carts) {
        this.carts = carts;
    }

    public void addCart(final Cart cart) {
        if (!carts.contains(cart)) {
            carts.add(cart);
        }
    }

    public void removeCart(final Cart cart) {
        carts.remove(cart);
    }

    public void clearCarts() {
        carts.clear();
    }

    public List<Cart> getCarts() {
        return carts;
    }

    public Long getId() {
        return receiptId;
    }

    public Long getCreatedOn() {
        return createdOn;
    }

    public Date getCreatedOnAsDate() {
        if (createdOn / 1000000000000000000L >= 1) {
            return new Date(createdOn / 1000000L);
        }
        return new Date(createdOn);
    }

    public void setSentOn(final Long sentOn) {
        this.sentOn = sentOn;
    }

    public void setSent() {
        sentOn = System.currentTimeMillis();
    }

    public Long getSentOn() {
        return sentOn;
    }

    public boolean isSent() {
        return sentOn == null;
    }

    public void setOwnerId(final Long ownerId) {
        this.ownerId = ownerId;
    }

    public void setOwner(final User owner) {
        ownerId = owner.getId();
    }

    public Long getOwnerId() {
        return ownerId;
    }
}
