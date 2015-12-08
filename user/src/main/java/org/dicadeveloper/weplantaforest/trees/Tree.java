package org.dicadeveloper.weplantaforest.trees;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.dicadeveloper.weplantaforest.treetypes.TreeType;
import org.springframework.hateoas.Identifiable;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Entity
@ToString
@EqualsAndHashCode
@Getter
@Table(name = "Tree")
public class Tree implements Identifiable<Long> {

	@Id
	@GeneratedValue
	@Column(name = "_treeId")
	private Long id;
	@Column(name = "_amount")
	private int _amount;
	@Column(name = "_imagePath")
	private String _imagePath;
	@Column(name = "_longitude")
	private float _longitude;
	@Column(name = "_latitude")
	private float _latitude;
	@Column(name = "_submittedOn")
	private long _submittedOn;
	@Column(name = "_plantedOn")
	private long _plantedOn;

	@ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
	private User _owner;

	@ManyToOne(fetch = FetchType.LAZY, targetEntity = TreeType.class)
	private TreeType _treeType;
}
