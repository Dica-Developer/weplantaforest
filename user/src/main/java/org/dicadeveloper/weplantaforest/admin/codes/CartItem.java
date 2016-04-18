package org.dicadeveloper.weplantaforest.admin.codes;

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

import org.dicadeveloper.weplantaforest.treetypes.TreeType;
import org.springframework.hateoas.Identifiable;

import lombok.NoArgsConstructor;

@Entity
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

    // TODO: implement
    private Long _treeId;

    // TODO: remove
    // a real reference?
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "_treeType_treeTypeId")
    private TreeType _treeType;

    private int _amount;

    private Long _plantArticleId;

    @Column(precision = 7, scale = 2)
    private BigDecimal _basePricePerPiece;

    @Column(precision = 7, scale = 2)
    private BigDecimal _scontoPerPiece;

    @Column(precision = 7, scale = 2)
    private BigDecimal _fundingPerPiece;

    @Column(precision = 7, scale = 2)
    private BigDecimal _totalPrice;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "_cart__cartId")
    private Cart cart;

    public Long getId() {
        return id;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(final Cart cart) {
        this.cart = cart;
    }

    // TODO: remove from here
    public TreeType getTreeType() {
        return _treeType;
    }

    public void setTreeType(final TreeType treeType) {
        _treeType = treeType;
    }

    // to here

    public BigDecimal getBasePricePerPiece() {
        return _basePricePerPiece == null ? BigDecimal.ZERO : _basePricePerPiece;
    }

    public void setBasePricePerPiece(final BigDecimal basePricePerPiece) {
        _basePricePerPiece = basePricePerPiece;
    }

    public BigDecimal getScontoPerPiece() {
        return _scontoPerPiece == null ? BigDecimal.ZERO : _scontoPerPiece;
    }

    public void setScontoPerPiece(final BigDecimal scontoPerPiece) {
        _scontoPerPiece = scontoPerPiece;
    }

    public BigDecimal getFundingPerPiece() {
        return _fundingPerPiece == null ? BigDecimal.ZERO : _fundingPerPiece;
    }

    public void setFundingPerPiece(final BigDecimal fundingPerPiece) {
        _fundingPerPiece = fundingPerPiece;
    }

    public BigDecimal getTotalPrice() {
        return _totalPrice == null ? BigDecimal.ZERO : _totalPrice;
    }

    public void setTotalPrice(final BigDecimal totalPrice) {
        _totalPrice = totalPrice;
    }

    public int getAmount() {
        return _amount;
    }

    public void setAmount(final int amount) {
        _amount = amount;
    }

    public Long getPlantArticleId() {
        return _plantArticleId;
    }

    public void setPlantArticleId(final Long plantArticleId) {
        _plantArticleId = plantArticleId;
    }

    public void setTreeId(final Long treeId) {
        _treeId = treeId;
    }

    public Long getTreeId() {
        return _treeId;
    }

    @Override
    public String toString() {
        return "[" + id + "]";
    }
}
