package org.dicadeveloper.weplantaforest.abo;

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
import org.dicadeveloper.weplantaforest.user.User;
import org.dicadeveloper.weplantaforest.views.Views;
import org.hibernate.annotations.Cascade;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Abo {

    public enum Period {
        DAYLI, WEEKLY, MONTHLY, QUARTERLY, YEARLY;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "_id")
    @JsonView(Views.AboOverview.class)
    private Long id;

    @Column(name = "_amount", nullable = false)
    @JsonView(Views.AboOverview.class)
    private Integer amount;

    @Column(name = "_period", nullable = false)
    @JsonView(Views.AboOverview.class)
    private Period period;

    @ManyToOne(optional = true)
    @JoinColumn(name = "_user__userId")
    private User user;

    @Column(name = "_timeStamp", nullable = false)
    @JsonView(Views.AboOverview.class)
    private Long timeStamp;

    @Column(name = "_last", nullable = true)
    @JsonView(Views.AboOverview.class)
    private Long last;

    @Column(name = "_active", nullable = false)
    @JsonView(Views.AboOverview.class)
    private boolean active = false;

    @OneToMany(mappedBy = "abo")
    private List<Param> params = new ArrayList<Param>();

    @OneToMany(mappedBy = "abo")
    private List<Cart> carts = new ArrayList<Cart>();

    @OneToOne(optional = true)
    @Cascade({ org.hibernate.annotations.CascadeType.ALL })
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
