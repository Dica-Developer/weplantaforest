package org.dicadeveloper.weplantaforest.gift;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import org.dicadeveloper.weplantaforest.code.Code;
import org.dicadeveloper.weplantaforest.user.User;
import org.dicadeveloper.weplantaforest.views.Views;
import org.hibernate.annotations.Cascade;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Gift {

    public static enum Status {
        NEW, REDEEMED, UNREDEEMED
    };

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "_consignor__userId")
    @JsonView(Views.OverviewGift.class)
    private User consignor;

    @ManyToOne(optional = true)
    @JoinColumn(name = "_recipient__userId")
    @JsonView(Views.OverviewGift.class)
    private User recipient;

    @OneToOne(optional = true)
    @JoinColumn(name = "_code__id")
    @Cascade({ org.hibernate.annotations.CascadeType.ALL })
    @JsonView(Views.OverviewGift.class)
    private Code code;

    @Column(name = "_status")
    @JsonView(Views.OverviewGift.class)
    private Status status;

}
