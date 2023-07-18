package org.dicadeveloper.weplantaforest.admin.treeType;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.dicadeveloper.weplantaforest.admin.views.Views;

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
    @JsonView({ Views.ProjectArticle.class, Views.TreesByUser.class })
    private Long id;

    @Column(name = "_name", unique = true)
    @JsonView({ Views.ProjectArticle.class, Views.CartDetails.class, Views.TreesByUser.class })
    private String name;

    @Column(name = "_description", columnDefinition = "TEXT")
    @JsonView({ Views.ProjectArticle.class, Views.CartDetails.class, Views.TreesByUser.class })
    private String description;

    @Column(name = "treeImageBW")
    @JsonView({ Views.ProjectArticle.class, Views.CartDetails.class, Views.TreesByUser.class })
    private String treeImageBW;

    @Column(name = "treeImageColor")
    @JsonView({ Views.ProjectArticle.class, Views.CartDetails.class, Views.TreesByUser.class })
    private String treeImageColor;

    @Column(name = "fruitImageBW")
    @JsonView({ Views.ProjectArticle.class, Views.CartDetails.class, Views.TreesByUser.class })
    private String fruitImageBW;

    @Column(name = "fruitImageColor")
    @JsonView({ Views.ProjectArticle.class, Views.CartDetails.class, Views.TreesByUser.class })
    private String fruitImageColor;

    @Column(name = "trunkImageColor")
    @JsonView({ Views.ProjectArticle.class, Views.CartDetails.class, Views.TreesByUser.class })
    private String trunkImageColor;

    @Column(name = "fruit")
    @JsonView({ Views.ProjectArticle.class, Views.CartDetails.class, Views.TreesByUser.class })
    private String fruit;

    @Column(name = "trunk")
    @JsonView({ Views.ProjectArticle.class, Views.CartDetails.class, Views.TreesByUser.class })
    private String trunk;

    @Column(name = "leaf")
    @JsonView({ Views.ProjectArticle.class, Views.CartDetails.class, Views.TreesByUser.class })
    private String leaf;

    @Column(name = "_infoLink")
    private String infoLink;

    @Column(name = "_annualCo2SavingInTons")
    private double annualCo2SavingInTons;

}
