package org.dicadeveloper.weplantaforest.projects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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
public class Image implements Identifiable<Long> {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "_id")
	private Long id;

    @Column(name = "_type", nullable = false)
	private DataType type;

    @Column(name = "_file", nullable = false)
	private String file;
}
