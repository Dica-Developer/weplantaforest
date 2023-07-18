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
    @JsonView({ Views.ShortTreeType.class, Views.PlantedTree.class, Views.OverviewGift.class })
    private Long id;

    @Column(name = "_name", unique = true)
    @JsonView({ Views.PlantedTree.class, Views.ProjectArticle.class, Views.ShortTreeType.class, Views.OverviewGift.class })
    private String name;

    @Column(name = "_description")
    @JsonView({ Views.PlantedTree.class, Views.ProjectArticle.class, Views.ShortTreeType.class, Views.OverviewGift.class })
    private String description;

    @Column(name = "treeImageBW")
    @JsonView({ Views.PlantedTree.class, Views.ProjectArticle.class, Views.OverviewGift.class, Views.ShortTreeType.class })
    private String treeImageBW;

    @Column(name = "treeImageColor")
    @JsonView({ Views.PlantedTree.class, Views.ProjectArticle.class, Views.OverviewGift.class, Views.ShortTreeType.class })    
    private String treeImageColor;

    @Column(name = "fruitImageBW")
    @JsonView({ Views.PlantedTree.class, Views.ProjectArticle.class, Views.OverviewGift.class, Views.ShortTreeType.class })
    private String fruitImageBW;

    @Column(name = "fruitImageColor")
    @JsonView({ Views.PlantedTree.class, Views.ProjectArticle.class, Views.OverviewGift.class, Views.ShortTreeType.class })
    private String fruitImageColor;

    @Column(name = "trunkImageColor")
    @JsonView({ Views.PlantedTree.class, Views.ProjectArticle.class, Views.OverviewGift.class, Views.ShortTreeType.class })
    private String trunkImageColor;

    @Column(name = "fruit")
    @JsonView({ Views.PlantedTree.class, Views.ProjectArticle.class, Views.OverviewGift.class, Views.ShortTreeType.class })
    private String fruit;

    @Column(name = "trunk")
    @JsonView({ Views.PlantedTree.class, Views.ProjectArticle.class, Views.OverviewGift.class, Views.ShortTreeType.class })
    private String trunk;

    @Column(name = "leaf")
    @JsonView({ Views.PlantedTree.class, Views.ProjectArticle.class, Views.OverviewGift.class, Views.ShortTreeType.class })
    private String leaf;

    @Column(name = "_infoLink")
    private String infoLink;

    @Column(name = "_annualCo2SavingInTons")
    private double annualCo2SavingInTons;

}
