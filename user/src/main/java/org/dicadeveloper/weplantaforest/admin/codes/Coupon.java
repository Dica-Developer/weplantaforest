package org.dicadeveloper.weplantaforest.admin.codes;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import org.springframework.hateoas.Identifiable;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

/**
 * Minimal version of what used to be the 'Code' entity in IPAT.
 */
@Entity(name = "Code")
@Getter
@ToString
@EqualsAndHashCode
public class Coupon implements Identifiable<Long> {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "_id")
	private Long id;

	@Column(unique = true, nullable = false)
	private String _code;

	// TODO review, creationDate ?
	@Column(nullable = false)
	private int _year;
	@Column(nullable = false)
	private int _month;

	// TODO to be removed (not used really)
	@Deprecated
	@Column(nullable = false)
	private int _number = -1;

	@ManyToOne(optional = true)
	private Event _event;

	@Column
	private int _treeCount;

	@Column(nullable = false)
	private boolean _evaluated = false;
}
