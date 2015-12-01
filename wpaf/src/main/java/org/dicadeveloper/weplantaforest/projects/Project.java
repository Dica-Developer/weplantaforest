package org.dicadeveloper.weplantaforest.projects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.dicadeveloper.weplantaforest.trees.User;
import org.springframework.hateoas.Identifiable;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Entity
@ToString
@Getter
@EqualsAndHashCode
@Table(name = "Plant")
public class Project implements Identifiable<Long> {

	@Id
	@GeneratedValue
	@Column(name = "_plantId")
	private Long id;

	@Column(name = "_name", length = 255)
	private String _name;

	@Column(name = "_description", length = 65535)
	private String _description;

	@Column(name = "_longitude")
	private Float _longitude;

	@Column(name = "_latitude")
	private Float _latitude;

	@Column(name = "_zoom")
	private Integer _zoom;

	@Column
	private Long _shopOpening;

	@Column
	private Long _shopClosing;

	@Column
	private Boolean _shopActive;

	@Column
	private Boolean _visible;

	@Column(name = "_mainImageFileName", length = 255)
	private String _mainImageFileName;

	/**
	 * @deprecated no longer used in new version
	 */
	@Deprecated
	@Column(name = "_googleMapsOverlayImageFileName", length = 200)
	private String _googleMapsOverlayImageFileName;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(nullable = false)
	private User _manager;
}
