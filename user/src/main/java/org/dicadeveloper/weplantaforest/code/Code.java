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
import org.dicadeveloper.weplantaforest.views.Views;

import com.fasterxml.jackson.annotation.JsonView;

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
    @JsonView(Views.OverviewGift.class)
    private String code;

    @ManyToOne(optional = true)
    @JoinColumn(name ="_event__id")
    private Event event;

    @OneToOne(optional = true)
    @JoinColumn(name ="_gift__id")
    private Gift gift;
    
    @OneToOne(optional = true)
    @JoinColumn(name ="_cart__cartId")
    @JsonView(Views.OverviewGift.class)
    private Cart cart;
    
    @Column(name ="_evaluated",nullable = false)
    private boolean evaluated = false;
    public boolean isGiftCode(){
        return this.gift != null;
    }
    
    public boolean isEventCode(){
        return this.event != null;
    }
    
    //TODO: think about to remove these columns, i don't think they are really necessary
    //only initialized here with default values to avoid constraint violations from the db
    @Column(name ="_year",nullable = false)
    private int year = 0;

    @Column(name ="_month",nullable = false)
    private int month = 0;

    @Column(name ="_number",nullable = false)
    private int number = 0;
    
}
