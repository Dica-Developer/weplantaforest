package org.dicadeveloper.weplantaforest.admin.project;

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

import org.dicadeveloper.weplantaforest.admin.tree.Tree;
import org.dicadeveloper.weplantaforest.admin.treeType.TreeType;
import org.dicadeveloper.weplantaforest.admin.views.Views;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "PlantArticle")
public class ProjectArticle {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "_articleId")
    @JsonView(Views.ProjectArticle.class)
    private Long articleId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "_plant__plantId", nullable = false)
    @JsonIgnore
    private Project project;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "_treeType_treeTypeId", nullable = false)
    @JsonView(Views.ProjectArticle.class)
    private TreeType treeType;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "_price__priceId", nullable = false)
    @JsonView(Views.ProjectArticle.class)
//    @Cascade(CascadeType.ALL)
    private Price price;


    @Column(name = "_amount")
    @JsonView(Views.ProjectArticle.class)
    private Long amount;

    @OneToMany(mappedBy = "projectArticle")
    @JsonIgnore
    private List<Tree> trees;
}