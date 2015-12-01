package org.dicadeveloper.weplantaforest.admin.codes;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.dicadeveloper.weplantaforest.trees.User;
import org.springframework.hateoas.Identifiable;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Entity
@ToString
@EqualsAndHashCode
@Getter
public class Event implements Identifiable<Long> {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "_id")
	private Long id;

	@Column(nullable = false, unique = true)
	private String _name;

	@OneToMany(mappedBy = "_event")
	private List<Coupon> _codes = new ArrayList<Coupon>();

	@ManyToOne
	private Team _team;

	@ManyToOne
	private User _user;

	@Column
	private Integer _valid;

	@OneToMany(mappedBy = "_event")
	private List<Cart> _carts = new ArrayList<Cart>();

	@Column
	private Boolean _userReceiptReceiver = false;

	public int getCodesCount() {
		return _codes.size();
	}

	public boolean getDeleteable() {
		return _carts.size() == 0;
	}

	public void addValid(final int valid) {
		if (_valid == null) {
			_valid = valid;
		} else {
			_valid += valid;
		}
	}

	public int getUnevaluated() {
		int count = 0;
		for (final Coupon code : _codes) {
			if (!code.is_evaluated()) {
				count++;
			}
		}
		return count;
	}

	public Coupon getFirstCode() {
		Coupon last = null;
		for (final Coupon code : _codes) {
			last = code;
			if (!code.is_evaluated()) {
				return code;
			}
		}
		return last;
	}

	public boolean isActive() {
		return _user == null && _valid == null || _user != null && _valid != null;
	}

	public void addCart(final Cart cart) {
		_carts.add(cart);
	}

	public void removeCart(final Cart cart) {
		_carts.remove(cart);
	}

	public int getCartsCount() {
		return _carts.size();
	}

	public boolean getUserReceiptReceiver() {
		return _userReceiptReceiver != null && _userReceiptReceiver;
	}
}
