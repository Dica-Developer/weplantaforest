package org.dicadeveloper.weplantaforest.code;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.event.Event;
import org.dicadeveloper.weplantaforest.gift.Gift;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Code {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name ="_id")
    private Long id;

    @Column(name ="_code",unique = true, nullable = false)
    private String code;

    @Column(name ="_year",nullable = false)
    private int year;

    @Column(name ="_month",nullable = false)
    private int month;

    @Column(name ="_number",nullable = false)
    private int number;

    @ManyToOne(optional = true)
    @JoinColumn(name ="_event__id")
    private Event event;

    @OneToOne(optional = true)
    @JoinColumn(name ="_gift__id")
    private Gift gift;

    @Column(name ="_treeCount")
    private int treeCount;

    @Column(name ="_amount")
    private float amount;

    @Column(name ="_evaluated",nullable = false)
    private boolean evaluated = false;

    @OneToOne(optional = true)
    @JoinColumn(name ="_cart__cartId")
    private Cart cart;
}
