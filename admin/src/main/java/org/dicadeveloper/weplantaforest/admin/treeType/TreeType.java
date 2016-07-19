package org.dicadeveloper.weplantaforest.admin.treeType;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.hateoas.Identifiable;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@Table(name = "TreeType")
@ToString(callSuper = true)
@NoArgsConstructor
public class TreeType implements Identifiable<Long> {

    @Id
    @GeneratedValue
    @Column(name = "treeTypeId")
    private Long id;

    @Column(name = "_name", unique = true)
    private String name;

    @Column(name = "_description")
    private String description;

    @Column(name = "_imageFile")
    private String imageFile;

    @Column(name = "_infoLink")
    private String infoLink;

    @Column(name = "_annualCo2SavingInTons")
    private double annualCo2SavingInTons;

}
