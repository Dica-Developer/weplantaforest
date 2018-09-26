package org.dicadeveloper.weplantaforest.admin.cart;

import java.beans.PropertyEditorSupport;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Transient;

import org.dicadeveloper.weplantaforest.admin.abo.Abo;
import org.dicadeveloper.weplantaforest.admin.code.Code;
import org.dicadeveloper.weplantaforest.admin.event.Event;
import org.dicadeveloper.weplantaforest.admin.receipt.Receipt;
import org.dicadeveloper.weplantaforest.admin.tree.Tree;
import org.dicadeveloper.weplantaforest.admin.user.User;
import org.dicadeveloper.weplantaforest.admin.views.Views;
import org.hibernate.annotations.Cascade;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
public class Cart {

    public static class Editor extends PropertyEditorSupport {
        @Override
        public void setAsText(final String text) throws IllegalArgumentException {
        }
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "_cartId")
    @JsonView({Views.OverviewCart.class, Views.CodeOverview.class, Views.CartDetails.class})
    private Long id;

    @Column(name = "_timeStamp")
    @JsonView({Views.OverviewCart.class, Views.CartDetails.class})
    private Long timeStamp;

    @Enumerated(EnumType.STRING)
    @Column(name = "_cartState")
    @JsonView({Views.OverviewCart.class, Views.CodeOverview.class})
    private CartState cartState;

    @OneToMany(mappedBy = "cart", fetch = FetchType.LAZY)
    @Cascade({ org.hibernate.annotations.CascadeType.ALL })
    @JsonView({Views.CartDetails.class})
    private List<CartItem> cartItems = new ArrayList<CartItem>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "_buyer__userId")
    @JsonView(Views.OverviewCart.class)
    private User buyer;

    @ManyToOne
    @JoinColumn(name = "_event__id")
    private Event event;

    @Column(name = "_callbackParams", length = 1024)
    private String callbackParams;

    @Column(name = "_callBackVzid", length = 32)
    private String callBackVzid;

    @Column(name = "_callBackStrasse", length = 32)
    private String callBackStrasse;

    @Column(name = "_callBackTimestamp", length = 32)
    private String callBackTimestamp;

    @Column(name = "_callBackFirma", length = 256)
    @JsonView(Views.OverviewCart.class)
    private String callBackFirma;

    @Column(name = "_callBackBanktransactionid", length = 32)
    private String callBackBanktransactionid;

    @Column(name = "_callBackVorname", length = 128)
    @JsonView(Views.OverviewCart.class)
    private String callBackVorname;

    @Column(name = "_callBackPlz", length = 16)
    private String callBackPlz;

    @Column(name = "_callBackStatus", length = 32)
    private String callBackStatus;

    @Column(name = "_callBackNachname", length = 128)
    @JsonView(Views.OverviewCart.class)
    private String callBackNachname;

    @Column(name = "_callBackOrt", length = 128)
    private String callBackOrt;

    @Column(name = "_callBackBetrag", length = 16)
    private String callBackBetrag;

    @Column(name = "_callBackLand", length = 16)
    private String callBackLand;

    @Column(name = "_callBackEmail", length = 256)
    private String callBackEmail;

    @Column(name = "_callBackTrackingcode", length = 32)
    private String callBackTrackingcode;

    @Column(name = "_callBackTransactionid", length = 64)
    private String callBackTransactionid;

    @Column(name = "_callBackOid", length = 32)
    private String callBackOid;

    @Column(name = "_callBackMethod", length = 128)
    private String callBackMethod;

    @Column(name = "_callBackZahlungsart", length = 32)
    @JsonView(Views.OverviewCart.class)
    private String callBackZahlungsart;

    @Column(name = "_callBackFirmanzusatz", length = 256)
    private String callBackFirmanzusatz;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "_abo__id", nullable = true)
    private Abo abo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "_receipt__receiptId")
    @JsonView(Views.OverviewCart.class)
    private Receipt receipt;

    @OneToOne(optional = true)
    @JoinColumn(name = "_code__id")
    private Code code;

    @Column(name = "_receiptable")
    @JsonView(Views.OverviewCart.class)
    private boolean receiptable;

    @Column(name = "_receiptSent")
    @JsonView(Views.OverviewCart.class)
    private boolean receiptSent;

    @Transient
    private boolean gift = false;

    /**
     * Target price in case this card was generated for an price based code.
     */
    @Column(name = "_targetedPrice")
    private float targetedPrice;

    public CartItem removeCartItem(final Long articleId) {
        for (final CartItem item : cartItems) {
            if (item.getTree()
                    .getProjectArticle()
                    .getArticleId()
                    .equals(articleId)) {
                cartItems.remove(item);
                return item;
            }
        }
        return null;
    }

    public void addCartItem(final CartItem cartItem) {
        if (!containsCartItem(cartItem)) {
            cartItems.add(cartItem);
            cartItem.setCart(this);
        }
    }

    public boolean containsCartItem(final CartItem cartItem) {
        for (final CartItem item : cartItems) {
            if (item.getTree()
                    .getProjectArticle()
                    .getArticleId()
                    .equals(cartItem.getTree()
                                    .getProjectArticle()
                                    .getArticleId())) {
                return true;
            }
        }
        return false;
    }

    public void removeCartItem(final CartItem cartItem) {
        cartItems.remove(cartItem);
    }

    public boolean isFilled() {
        return !cartItems.isEmpty();
    }

    public Date getTimeStampAsDate() {
        return new Date(timeStamp);
    }

    @Transient
    @JsonView({Views.OverviewCart.class, Views.CartDetails.class})
    public int getTreeCount() {
        int count = 0;
        for (Tree tree : getTrees()) {
            count += tree.getAmount();
        }
        return count;
    }

    @Transient
    @JsonView({Views.OverviewCart.class, Views.CartDetails.class})
    public BigDecimal getTotalPrice() {
        BigDecimal total = new BigDecimal(0.00);
        for (final CartItem item : cartItems) {
            if(item.getTotalPrice() != null){
                total = total.add(item.getTotalPrice());                
            }
        }
        return total;
    }

    @Transient
    public List<Long> getPlantArticleIds() {
        final List<Long> ids = new ArrayList<Long>();
        for (Tree tree : getTrees()) {
            ids.add(tree.getProjectArticle()
                        .getArticleId());
        }
        return ids;
    }

    @Transient
    public List<Tree> getTrees() {
        final List<Tree> trees = new ArrayList<Tree>();
        for (final CartItem item : cartItems) {
            if (item.getTree() != null) {
                trees.add(item.getTree());
            }
        }
        return trees;
    }

}
