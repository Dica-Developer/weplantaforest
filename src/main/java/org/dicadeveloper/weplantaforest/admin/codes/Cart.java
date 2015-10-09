package org.dicadeveloper.weplantaforest.admin.codes;

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

import org.dicadeveloper.weplantaforest.base.Base;
import org.dicadeveloper.weplantaforest.trees.User;
import org.hibernate.annotations.Cascade;

@Entity
public class Cart implements Base {

    public static class Editor extends PropertyEditorSupport {
        @Override
        public void setAsText(final String text) throws IllegalArgumentException {
        }
    }

    public Cart() {
        // for hibernate
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long _cartId;

    private Long _timeStamp;

    @Enumerated(EnumType.STRING)
    private CartState _cartState;

    @OneToMany(mappedBy = "_cart", fetch = FetchType.LAZY)
    @Cascade({ org.hibernate.annotations.CascadeType.ALL })
    private List<CartItem> _cartItems = new ArrayList<CartItem>();

    @ManyToOne(fetch = FetchType.LAZY)
    private User _buyer;

    @ManyToOne
    private Event _event;

    @Column(length = 1024)
    private String _callbackParams;

    @Column(length = 32)
    private String _callBackVzid;

    @Column(length = 32)
    private String _callBackStrasse;

    @Column(length = 32)
    private String _callBackTimestamp;

    @Column(length = 256)
    private String _callBackFirma;

    @Column(length = 32)
    private String _callBackBanktransactionid;

    @Column(length = 128)
    private String _callBackVorname;

    @Column(length = 16)
    private String _callBackPlz;

    @Column(length = 32)
    private String _callBackStatus;

    @Column(length = 128)
    private String _callBackNachname;

    @Column(length = 128)
    private String _callBackOrt;

    @Column(length = 16)
    private String _callBackBetrag;

    @Column(length = 16)
    private String _callBackLand;

    @Column(length = 256)
    private String _callBackEmail;

    @Column(length = 32)
    private String _callBackTrackingcode;

    @Column(length = 64)
    private String _callBackTransactionid;

    @Column(length = 32)
    private String _callBackOid;

    @Column(length = 128)
    private String _callBackMethod;

    @Column(length = 32)
    private String _callBackZahlungsart;

    @Column(length = 256)
    private String _callBackFirmanzusatz;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = true)
    private Abo _abo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "_receipt__receiptId")
    private Receipt _receipt;

    @OneToOne(optional = true)
    private Coupon _code;

    @Transient
    private boolean _gift = false;

    /**
     * Target price in case this card was generated for an price based code.
     */
    @Column
    private float _targetedPrice;

    public long getId() {
        return _cartId;
    }

    public User getBuyer() {
        return _buyer;
    }

    public void setBuyer(final User buyer) {
        _buyer = buyer;
    }

    public int getCartItemCount() {
        return _cartItems.size();
    }

    public List<CartItem> getCartItems() {
        return _cartItems;
    }

    public CartItem removeCartItem(final Long articleId) {
        for (final CartItem item : _cartItems) {
            if (item.getPlantArticleId().equals(articleId)) {
                _cartItems.remove(item);
                return item;
            }
        }
        return null;
    }

    public void setCartItems(final List<CartItem> cartItems) {
        _cartItems = cartItems;
    }

    public void addCartItem(final CartItem cartItem) {
        if (!containsCartItem(cartItem)) {
            _cartItems.add(cartItem);
        }
    }

    public boolean containsCartItem(final CartItem cartItem) {
        for (final CartItem item : _cartItems) {
            if (item.getPlantArticleId().equals(cartItem.getPlantArticleId())) {
                return true;
            }
        }
        return false;
    }

    public void removeCartItem(final CartItem cartItem) {
        _cartItems.remove(cartItem);
    }

    public boolean isFilled() {
        return !_cartItems.isEmpty();
    }

    public Long getTimeStamp() {
        return _timeStamp;
    }

    public void setTimeStamp(final Long timeStamp) {
        _timeStamp = timeStamp;
    }

    public Date getTimeStampAsDate() {
        return new Date(_timeStamp);
    }

    public CartState getCartState() {
        return _cartState;
    }

    public void setCartState(final CartState cartState) {
        _cartState = cartState;
    }

    @Transient
    public int getTreeCount() {
        int count = 0;
        for (final CartItem item : _cartItems) {
            count += item.getAmount();
        }
        return count;
    }

    @Transient
    public BigDecimal getTotalPrice() {
        BigDecimal total = new BigDecimal(0.00);
        for (final CartItem item : _cartItems) {
            total = total.add(item.getTotalPrice());
        }
        return total;
    }

    @Transient
    public List<Long> getPlantArticleIds() {
        final List<Long> ids = new ArrayList<Long>();
        for (final CartItem item : _cartItems) {
            ids.add(item.getPlantArticleId());
        }
        return ids;
    }

    public String getCallbackParams() {
        return _callbackParams;
    }

    public void setCallbackParams(final String params) {
        _callbackParams = params;
    }

    public String getCallBackVzid() {
        return _callBackVzid;
    }

    public void setCallBackVzid(final String backVzid) {
        _callBackVzid = backVzid;
    }

    public String getCallBackStrasse() {
        return _callBackStrasse;
    }

    public void setCallBackStrasse(final String backStrasse) {
        _callBackStrasse = backStrasse;
    }

    public String getCallBackTimestamp() {
        return _callBackTimestamp;
    }

    public Date getCallBackTimestampAsDate() {
        if (_callBackTimestamp == null) {
            return null;
        }
        return new Date(Long.parseLong(_callBackTimestamp) * 1000); // its php,
                                                                    // sec since
                                                                    // 1970, not
                                                                    // msec
    }

    public void setCallBackTimestamp(final String backTimestamp) {
        _callBackTimestamp = backTimestamp;
    }

    public String getCallBackFirma() {
        return _callBackFirma;
    }

    public void setCallBackFirma(final String backFirma) {
        _callBackFirma = backFirma;
    }

    public String getCallBackBanktransyctionid() {
        return _callBackBanktransactionid;
    }

    public void setCallBackBanktransyctionid(final String backBanktransyctionid) {
        _callBackBanktransactionid = backBanktransyctionid;
    }

    public String getCallBackVorname() {
        return _callBackVorname;
    }

    public void setCallBackVorname(final String backVorname) {
        _callBackVorname = backVorname;
    }

    public String getCallBackPlz() {
        return _callBackPlz;
    }

    public void setCallBackPlz(final String backPlz) {
        _callBackPlz = backPlz;
    }

    public String getCallBackStatus() {
        return _callBackStatus;
    }

    public void setCallBackStatus(final String backStatus) {
        _callBackStatus = backStatus;
    }

    public String getCallBackNachname() {
        return _callBackNachname;
    }

    public void setCallBackNachname(final String backNachname) {
        _callBackNachname = backNachname;
    }

    public String getCallBackOrt() {
        return _callBackOrt;
    }

    public void setCallBackOrt(final String backOrt) {
        _callBackOrt = backOrt;
    }

    public String getCallBackBetrag() {
        return _callBackBetrag;
    }

    public void setCallBackBetrag(final String backBetrag) {
        _callBackBetrag = backBetrag;
    }

    public String getCallBackLand() {
        return _callBackLand;
    }

    public void setCallBackLand(final String backLand) {
        _callBackLand = backLand;
    }

    public String getCallBackEmail() {
        return _callBackEmail;
    }

    public void setCallBackEmail(final String backEmail) {
        _callBackEmail = backEmail;
    }

    public String getCallBackTrackingcode() {
        return _callBackTrackingcode;
    }

    public void setCallBackTrackingcode(final String backTrackingcode) {
        _callBackTrackingcode = backTrackingcode;
    }

    public String getCallBackOid() {
        return _callBackOid;
    }

    public void setCallBackOid(final String backOid) {
        _callBackOid = backOid;
    }

    public String getCallBackMethod() {
        return _callBackMethod;
    }

    public void setCallBackMethod(final String backMethod) {
        _callBackMethod = backMethod;
    }

    public String getCallBackZahlungsart() {
        return _callBackZahlungsart;
    }

    public void setCallBackZahlungsart(final String backZahlungsart) {
        _callBackZahlungsart = backZahlungsart;
    }

    public String getCallBackFirmanzusatz() {
        return _callBackFirmanzusatz;
    }

    public void setCallBackFirmanzusatz(final String backFirmanzusatz) {
        _callBackFirmanzusatz = backFirmanzusatz;
    }

    public String getCallBackTransactionid() {
        return _callBackTransactionid;
    }

    public void setCallBackTransactionid(final String backTransactionid) {
        _callBackTransactionid = backTransactionid;
    }

    public void setReceipt(final Receipt receipt) {
        _receipt = receipt;
    }

    public Receipt getReceipt() {
        return _receipt;
    }

    @Override
    public String toString() {
        return "[" + _cartId + "]";
    }

    public void setEvent(final Event event) {
        _event = event;
    }

    public Event getEvent() {
        return _event;
    }

    public void setAbo(final Abo abo) {
        _abo = abo;
    }

    public Abo getAbo() {
        return _abo;
    }

    public void setCode(final Coupon code) {
        _code = code;
    }

    public Coupon getCode() {
        return _code;
    }

    public void setGift(final boolean gift) {
        _gift = gift;
    }

    public boolean isGift() {
        return _gift;
    }

    public float getTargetedPrice() {
        return _targetedPrice;
    }

    public void setTargetedPrice(float targetedPrice) {
        _targetedPrice = targetedPrice;
    }
}
