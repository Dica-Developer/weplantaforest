package org.dicadeveloper.weplantaforest.certificate;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.user.User;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Certificate {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "_certId")
    private Long certId;

    @Column(name = "_number", nullable = false, unique = true)
    private String number;

    @ManyToOne(optional = false)
    @JoinColumn(name = "_creator__userId")
    private User creator;

    @Column(name = "_text", columnDefinition = "TEXT")
    private String text;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinTable(name = "Certificate_Cart", joinColumns = { @JoinColumn(name = "Certificate__certId", nullable = false, updatable = false) }, inverseJoinColumns = {
            @JoinColumn(name = "_carts__cartId", nullable = false, updatable = false) })
    private List<Cart> carts = new ArrayList<Cart>();

    public String generateAndSetNumber(final int certificates) {
        long treeCount = 0;
        for (final Cart cart : carts) {
            treeCount += cart.getTreeCount();
        }
        final StringBuilder sb = new StringBuilder();
        sb.append(creator.getId());
        sb.append(".");
        sb.append(certificates);
        sb.append("-");
        sb.append(treeCount);

        this.number = sb.toString();

        return sb.toString();
    }

    public void addCart(final Cart cart) {
        carts.add(cart);
    }

}
