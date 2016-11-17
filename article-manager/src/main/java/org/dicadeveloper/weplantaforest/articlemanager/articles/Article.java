package org.dicadeveloper.weplantaforest.articlemanager.articles;

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

import org.dicadeveloper.weplantaforest.articlemanager.user.User;
import org.dicadeveloper.weplantaforest.articlemanager.views.Views;
import org.dicadeveloper.weplantaforest.common.support.Language;
import org.springframework.hateoas.Identifiable;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Article implements Identifiable<Long> {
    public enum ArticleType {
        HOME, WHAT_WE_DO, NEWS, PARTNER, HELP_US, FAQ, LINKS, ABOUT_US, DISCLAIMER, KNOWLEDGEBASE, OUR_GOALS, OUR_CODEX, THE_IDEA, THE_TEAM, JOBS, IMPRESS, PRESS, NEWSLETTER, FINANCIALS, BLOG;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "_articleId")
    @JsonView({ Views.UserArticleView.class, Views.UserArticleShortView.class})
    private Long id;

    @Column(name = "_createdOn")
    @JsonView({ Views.UserArticleView.class})
    private Long createdOn;

    @Column(name = "_lastEditedOn")
    @JsonView({ Views.UserArticleView.class})
    private Long lastEditedOn;

    @Column(name = "_articleType")
    @JsonView({ Views.UserArticleView.class})
    private ArticleType articleType;

    @Column(name = "_lang", nullable = false)
    private Language lang;

    @Column(name = "_showFull", nullable = false)
    @JsonView({ Views.UserArticleView.class})
    private boolean showFull;

    @Column(name = "_title")
    @JsonView({ Views.UserArticleView.class, Views.UserArticleShortView.class})
    private String title;

    @Column(name = "_intro", columnDefinition = "TEXT")
    @JsonView({ Views.UserArticleView.class, Views.UserArticleShortView.class})
    private String intro;

    @Column(name = "_imageFileName")
    @JsonView({ Views.UserArticleView.class, Views.UserArticleShortView.class})
    private String imageFileName;

    @Column(name = "_imageCopyrights")
    @JsonView({ Views.UserArticleView.class})
    private String imageDescription;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "_owner__userId", nullable = false)
    @JsonView({ Views.UserArticleView.class})
    private User owner;

    @Column(name = "_visible")
    private boolean visible;

    @OneToMany(mappedBy = "article", fetch = FetchType.LAZY)
    @JsonView({ Views.UserArticleView.class})
    private List<Paragraph> paragraphs;

}
