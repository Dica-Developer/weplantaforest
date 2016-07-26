package org.dicadeveloper.weplantaforest.receipt;

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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.user.User;
import org.dicadeveloper.weplantaforest.views.Views;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Receipt {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonView(Views.ReceiptOverview.class)
    @Column(name = "_receiptId")
    private Long receiptId;

    @Column(name = "_invoiceNumber", unique = true)
    @JsonView(Views.ReceiptOverview.class)
    private String invoiceNumber;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "_receipt__receiptId")
    private List<Cart> carts = new ArrayList<Cart>();

    @Column(name = "_createdOn")
    @JsonView(Views.ReceiptOverview.class)
    private final Long createdOn;

    @Column
    private Long sentOn;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "_ownerId")
    private User owner;

    public Receipt() {
        createdOn = System.currentTimeMillis();
    }

    public String getMaskedInvoiceNumber() {
        return invoiceNumber.replace("/", "_");
    }

    public static String demaskInvoiceNumber(final String invoiceNumber) {
        return invoiceNumber.replace("_", "/");
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

    public Date getCreatedOnAsDate() {
        if (createdOn / 1000000000000000000l >= 1) {
            return new Date(createdOn / 1000000l);
        }
        return new Date(createdOn);
    }

    public void setSent() {
        sentOn = System.nanoTime();
    }

    public boolean isSent() {
        return sentOn == null;
    }
}
