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

import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.trees.User;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Abo {

    public enum Type {
        TREE, PRICE;
    }

    public enum Period {
        DAYLI, WEEKLY, MONTHLY, QUARTERLY, YEARLY;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "_id")
    private Long id;

    @Column(name = "_type", nullable = false)
    private Type type;

    @Column(name = "_amount", nullable = false)
    private Integer amount;

    @Column(name = "_period", nullable = false)
    private Period period;

    @ManyToOne(optional = true)
    @JoinColumn(name = "_user__userId")
    private User user;

    @Column(name = "_timeStamp", nullable = false)
    private Long timeStamp;

    @Column(name = "_last", nullable = true)
    private Long last;

    @Column(name = "_active", nullable = false)
    private boolean active = false;

    @OneToMany(mappedBy = "abo")
    private List<Param> params = new ArrayList<Param>();

    @OneToMany(mappedBy = "abo")
    private List<Cart> carts = new ArrayList<Cart>();

    @OneToOne(optional = true)
    @JoinColumn(name = "_currentCart__cartId")
    private Cart currentCart;

    public Date getTimeStampAsDate() {
        return new Date(timeStamp);
    }

    public Date getLastAsDate() {
        return new Date(last);
    }

    public void addParam(final Param param) {
        params.add(param);
    }
}
