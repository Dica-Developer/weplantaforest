package org.dicadeveloper.weplantaforest.admin.code;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import org.dicadeveloper.weplantaforest.admin.cart.Cart;
import org.dicadeveloper.weplantaforest.admin.event.Event;
import org.dicadeveloper.weplantaforest.admin.gift.Gift;
import org.dicadeveloper.weplantaforest.admin.views.Views;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Code {

    @Id
    @JsonView(Views.CodeOverview.class)
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name ="_id")
    private Long id;

    @JsonView(Views.CodeOverview.class)
    @Column(name ="_code",unique = true, nullable = false)
    private String code;

    @ManyToOne(optional = true)
    @JoinColumn(name ="_event__id")
    private Event event;

    @OneToOne(optional = true)
    @JoinColumn(name ="_gift__id")
    private Gift gift;
    
    @OneToOne(optional = true)
    @JoinColumn(name ="_cart__cartId")
    @JsonView(Views.CodeOverview.class)
    private Cart cart;

}
