package org.dicadeveloper.weplantaforest.projects;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.dicadeveloper.weplantaforest.Views;
import org.dicadeveloper.weplantaforest.trees.Tree;
import org.dicadeveloper.weplantaforest.treetypes.TreeType;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@ToString
@Getter
@Setter
@EqualsAndHashCode
@Table(name = "plantarticle")
public class ProjectArticle {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "_articleId")
    @JsonView({Views.Project.class})
    private Long articleId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "_plant__plantId", nullable = false)
    private Project project;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "_treeType_treeTypeId", nullable = false)
    @JsonView({Views.Project.class})
    private TreeType treeType;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "_price__priceId", nullable = false)
    @JsonView({Views.Project.class})
    private Price price;

    @Column(name = "_description", length = 20000)
    private String description;

    @Column(name = "_amount")
    @JsonView({Views.Project.class})
    private Long amount;

    @OneToMany(mappedBy = "projectArticle")
    private List<Tree> trees;
}