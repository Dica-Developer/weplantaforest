package org.dicadeveloper.weplantaforest.trees;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.dicadeveloper.weplantaforest.admin.codes.Team;
import org.springframework.hateoas.Identifiable;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@EqualsAndHashCode
@Table(name = "User")
public class User implements Identifiable<Long> {

	@Id
	@GeneratedValue
	@Column(name = "_userId")
	private Long id;

	@Column(unique = true, name = "_name")
	private String name;

	@Column(name = "_enabled", nullable = false)
	private boolean enabled = false;

	@Column(name = "_banned", nullable = false)
	private boolean banned = false;

	@ManyToOne(optional = true)
    @JoinColumn(name="_team__teamId")	
	private Team team;
}
