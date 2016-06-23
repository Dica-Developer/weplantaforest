package org.dicadeveloper.weplantaforest.event;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.dicadeveloper.weplantaforest.admin.codes.Team;
import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.code.Code;
import org.dicadeveloper.weplantaforest.user.User;
import org.hibernate.annotations.Cascade;
import org.springframework.hateoas.Identifiable;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Event implements Identifiable<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "_id")
    private Long id;

    @Column(name = "_name", nullable = false, unique = true)
    private String name;

    @OneToMany(mappedBy = "event")
    @Cascade({ org.hibernate.annotations.CascadeType.ALL })
    private List<Code> codes = new ArrayList<Code>();

    @ManyToOne
    @JoinColumn(name = "_team__teamId")
    private Team team;

    @ManyToOne
    @JoinColumn(name = "_user__userId")
    private User user;

    @Column(name ="_valid")
    private Integer valid;

    @OneToMany(mappedBy = "event")
    private List<Cart> carts = new ArrayList<Cart>();

    @Column(name ="_userReceiptReceiver")
    private Boolean userReceiptReceiver = false;

}
