package org.dicadeveloper.weplantaforest.trees;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.dicadeveloper.weplantaforest.treetypes.TreeType;
import org.springframework.hateoas.Identifiable;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@ToString
@EqualsAndHashCode
@Getter
@Setter
@Table(name = "Tree")
public class Tree implements Identifiable<Long> {

	@Id
	@GeneratedValue
	@Column(name = "_treeId")
	private Long id;
	@Column(name = "_amount")
	private int amount;
	@Column(name = "_imagePath")
	private String imagePath;
	@Column(name = "_longitude")
	private float longitude;
	@Column(name = "_latitude")
	private float latitude;
	@Column(name = "_submittedOn")
	private long submittedOn;
	@Column(name = "_plantedOn")
	private long plantedOn;

	@ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "_owner__userId")
	private User owner;

	@ManyToOne(fetch = FetchType.LAZY, targetEntity = TreeType.class)
    @JoinColumn(name = "_treeType_treeTypeId")
	private TreeType treeType;
}
