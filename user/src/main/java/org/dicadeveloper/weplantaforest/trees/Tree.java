package org.dicadeveloper.weplantaforest.trees;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.dicadeveloper.weplantaforest.projects.ProjectArticle;
import org.dicadeveloper.weplantaforest.treetypes.TreeType;
import org.dicadeveloper.weplantaforest.user.User;
import org.dicadeveloper.weplantaforest.views.Views;
import org.springframework.hateoas.Identifiable;

import com.fasterxml.jackson.annotation.JsonView;

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
    @JsonView(Views.PlantedTree.class)
    private Long id;

    @Column(name = "_amount")
    @JsonView(Views.PlantedTree.class)
    private int amount;

    @Column(name = "_imagePath")
    private String imagePath;

    @Column(name = "_longitude")
    @JsonView(Views.PlantedTree.class)
    private float longitude;
 
    @Column(name = "_latitude")
    @JsonView(Views.PlantedTree.class)
    private float latitude;

    @Column(name = "_submittedOn")
    @JsonView(Views.PlantedTree.class)
    private long submittedOn;

    @Column(name = "_plantedOn")
    @JsonView(Views.PlantedTree.class)
    private long plantedOn;

    @Column(name ="_desc", columnDefinition = "TEXT")
    @JsonView(Views.PlantedTree.class)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "_owner__userId")
    @JsonView(Views.PlantedTree.class)
    private User owner;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = TreeType.class)
    @JoinColumn(name = "_treeType_treeTypeId")
    @JsonView(Views.PlantedTree.class)
    private TreeType treeType;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "_plantArticle__articleId")
    @JsonView(Views.PlantedTree.class)
    private ProjectArticle projectArticle;
}
