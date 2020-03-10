package org.dicadeveloper.weplantaforest.treetypes;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.dicadeveloper.weplantaforest.views.Views;

import com.fasterxml.jackson.annotation.JsonView;

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
public class TreeType {

    @Id
    @GeneratedValue
    @Column(name = "treeTypeId")
    @JsonView({ Views.ShortTreeType.class, Views.PlantedTree.class })
    private Long id;

    @Column(name = "_name", unique = true)
    @JsonView({ Views.PlantedTree.class, Views.ProjectArticle.class, Views.ShortTreeType.class })
    private String name;

    @Column(name = "_description")
    private String description;

    @Column(name = "_imageFile")
    @JsonView({ Views.PlantedTree.class, Views.ProjectArticle.class })
    private String imageFile;

    @Column(name = "_infoLink")
    private String infoLink;

    @Column(name = "_annualCo2SavingInTons")
    private double annualCo2SavingInTons;

}
