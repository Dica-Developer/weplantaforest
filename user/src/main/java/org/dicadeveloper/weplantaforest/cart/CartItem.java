package org.dicadeveloper.weplantaforest.cart;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.hateoas.Identifiable;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class CartItem implements Identifiable<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "_cartItemId")
    private Long id;

    // TODO: remove
    // is always NULL?
    // @Column(length = 100)
    // private String _plantName;

    @Column(name = "_treeId")
    private Long treeId;

    // // TODO: remove
    // // a real reference?
    // @OneToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "_treeType_treeTypeId")
    // private TreeType tt;

    @Column(name = "_amount")
    private int amount;

    @Column(name = "_plantArticleId")
    private Long plantArticleId;

    @Column(name = "_basePricePerPiece", precision = 7, scale = 2)
    private BigDecimal basePricePerPiece = BigDecimal.ZERO;

    @Column(name = "_scontoPerPiece", precision = 7, scale = 2)
    private BigDecimal scontoPerPiece = BigDecimal.ZERO;

    @Column(name = "_fundingPerPiece", precision = 7, scale = 2)
    private BigDecimal fundingPerPiece = BigDecimal.ZERO;

    @Column(name = "_totalPrice", precision = 7, scale = 2)
    private BigDecimal totalPrice = BigDecimal.ZERO;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "_cart__cartId")
    private Cart cart;

    @Override
    public String toString() {
        return "[" + id + "]";
    }
}
