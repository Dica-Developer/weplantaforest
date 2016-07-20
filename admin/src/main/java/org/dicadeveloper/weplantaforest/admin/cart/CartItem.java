package org.dicadeveloper.weplantaforest.admin.cart;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import org.dicadeveloper.weplantaforest.admin.tree.Tree;
import org.dicadeveloper.weplantaforest.views.Views;
import org.hibernate.annotations.Cascade;
import org.springframework.hateoas.Identifiable;

import com.fasterxml.jackson.annotation.JsonView;

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

    @OneToOne(fetch = FetchType.LAZY)
    @Cascade({ org.hibernate.annotations.CascadeType.ALL })
    @JoinColumn(name = "_treeId")
    @JsonView(Views.OverviewCart.class)
    private Tree tree;

    @Column(name = "_plantArticleId")
    private Long projectArticleId;

    @Column(name = "_amount")
    private int amount;

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

    private void calcAndSetTotalPrice() {
        if (tree != null) {
            double totalPrice = tree.getAmount() * (tree.getProjectArticle()
                                                        .getPrice()
                                                        .getAmount()
                                                        .doubleValue()
                    - scontoPerPiece.doubleValue() - fundingPerPiece.doubleValue());
            this.totalPrice = new BigDecimal(totalPrice);
        } else {
            this.totalPrice = BigDecimal.ZERO;
        }
    }

    public void setTree(Tree tree) {
        this.tree = tree;
        this.basePricePerPiece = tree.getProjectArticle()
                                     .getPrice()
                                     .getAmount();
        this.fundingPerPiece = tree.getProjectArticle()
                                   .getPrice()
                                   .getFunding();
        this.scontoPerPiece = tree.getProjectArticle()
                                  .getPrice()
                                  .getSconto();
        this.projectArticleId = tree.getProjectArticle()
                                    .getArticleId();
        this.amount = tree.getAmount();
        calcAndSetTotalPrice();
    }

    @Override
    public String toString() {
        return "[" + id + "]";
    }
}
