package org.dicadeveloper.weplantaforest.admin.gift;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import org.dicadeveloper.weplantaforest.admin.code.Code;
import org.dicadeveloper.weplantaforest.admin.user.User;
import org.hibernate.annotations.Cascade;

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
    private User consignor;

    @ManyToOne(optional = true)
    @JoinColumn(name = "_recipient__userId")
    private User recipient;

    @OneToOne(optional = true)
    @JoinColumn(name = "_code__id")
    @Cascade({ org.hibernate.annotations.CascadeType.ALL })
    private Code code;

    @Column(name = "_status")
    private Status status;

}
