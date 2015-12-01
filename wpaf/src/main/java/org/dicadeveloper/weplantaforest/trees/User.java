package org.dicadeveloper.weplantaforest.trees;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.dicadeveloper.weplantaforest.admin.codes.Team;
import org.springframework.hateoas.Identifiable;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Entity
@Getter
@ToString
@EqualsAndHashCode
@Table(name = "User")
public class User implements Identifiable<Long> {

	@Id
	@GeneratedValue
	@Column(name = "_userId")
	private Long id;

	@Column(unique = true, name = "_name")
	private String _name;

	@Column(name = "_enabled", nullable = false)
	private boolean _enabled = false;

	@Column(name = "_banned", nullable = false)
	private boolean _banned = false;

	@ManyToOne(optional = true)
	private Team _team;
}
