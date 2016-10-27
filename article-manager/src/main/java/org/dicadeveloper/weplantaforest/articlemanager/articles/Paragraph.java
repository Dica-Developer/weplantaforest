package org.dicadeveloper.weplantaforest.articlemanager.articles;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import org.dicadeveloper.weplantaforest.articlemanager.views.Views;
import org.springframework.hateoas.Identifiable;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Paragraph implements Identifiable<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "_paragraphId")
    private Long id;

    @Column(name = "_title")
    @JsonView({ Views.UserArticleView.class})
    private String title;

    @Column(name = "_text", columnDefinition = "TEXT")
    @JsonView({ Views.UserArticleView.class})
    private String text;
    
    @Column(name = "_imageFileName")
    @JsonView({ Views.UserArticleView.class})
    private String imageFileName;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "_article__articleId", nullable = false)
    private Article article;

}
