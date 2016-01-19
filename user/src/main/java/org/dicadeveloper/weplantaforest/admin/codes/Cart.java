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

import org.dicadeveloper.weplantaforest.trees.User;
import org.hibernate.annotations.Cascade;
import org.springframework.hateoas.Identifiable;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
public class Cart implements Identifiable<Long> {

	public static class Editor extends PropertyEditorSupport {
		@Override
		public void setAsText(final String text) throws IllegalArgumentException {
		}
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "_cartId")
	private Long id;

	private Long _timeStamp;

	@Enumerated(EnumType.STRING)
	private CartState cartState;

	@OneToMany(mappedBy = "cart", fetch = FetchType.LAZY)
	@Cascade({ org.hibernate.annotations.CascadeType.ALL })
	private List<CartItem> cartItems = new ArrayList<CartItem>();

	@ManyToOne(fetch = FetchType.LAZY)
	private User buyer;

	@ManyToOne
	private Event event;

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

	public CartItem removeCartItem(final Long articleId) {
		for (final CartItem item : cartItems) {
			if (item.getPlantArticleId().equals(articleId)) {
				cartItems.remove(item);
				return item;
			}
		}
		return null;
	}

	public void addCartItem(final CartItem cartItem) {
		if (!containsCartItem(cartItem)) {
			cartItems.add(cartItem);
		}
	}

	public boolean containsCartItem(final CartItem cartItem) {
		for (final CartItem item : cartItems) {
			if (item.getPlantArticleId().equals(cartItem.getPlantArticleId())) {
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
		return new Date(_timeStamp);
	}

	@Transient
	public int getTreeCount() {
		int count = 0;
		for (final CartItem item : cartItems) {
			count += item.getAmount();
		}
		return count;
	}

	@Transient
	public BigDecimal getTotalPrice() {
		BigDecimal total = new BigDecimal(0.00);
		for (final CartItem item : cartItems) {
			total = total.add(item.getTotalPrice());
		}
		return total;
	}

	@Transient
	public List<Long> getPlantArticleIds() {
		final List<Long> ids = new ArrayList<Long>();
		for (final CartItem item : cartItems) {
			ids.add(item.getPlantArticleId());
		}
		return ids;
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
}
