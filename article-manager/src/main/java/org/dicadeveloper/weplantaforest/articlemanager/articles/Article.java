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

import com.fasterxml.jackson.annotation.JsonView;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Article {
    public enum ArticleType {
        HOME(true), WHAT_WE_DO(false), NEWS(false), PARTNER(true), HELP_US(false), FAQ(true), LINKS(false), ABOUT_US(true), DISCLAIMER(false), KNOWLEDGEBASE(false), OUR_GOALS(false), OUR_CODEX(false), THE_IDEA(false), THE_TEAM(false), JOBS(false), IMPRESS(true), PRESS(false), NEWSLETTER(false), FINANCIALS(true), BLOG(true), PRIVACY(true), TERMS(true), CONTACT(true), TREE_SERVICE(true), AWARDS(true);
        private boolean isUsed;
        
        ArticleType(boolean isUsed) {
            this.isUsed = isUsed;
        }
        
        public boolean isUsed() {
            return this.isUsed;
        }
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "_articleId")
    @JsonView({ Views.UserArticleView.class, Views.UserArticleShortView.class, Views.BackofficeArticleOverview.class, Views.BackofficeArticleView.class})
    private Long id;

    @Column(name = "_createdOn")
    @JsonView({ Views.UserArticleView.class, Views.BackofficeArticleOverview.class, Views.BackofficeArticleView.class, Views.UserArticleShortView.class})
    private Long createdOn;

    @Column(name = "_lastEditedOn")
    @JsonView({ Views.UserArticleView.class, Views.BackofficeArticleOverview.class})
    private Long lastEditedOn;

    @Column(name = "_articleType")
    @JsonView({ Views.UserArticleView.class, Views.BackofficeArticleOverview.class, Views.BackofficeArticleView.class})
    private ArticleType articleType;

    @Column(name = "_lang", nullable = false)
    @JsonView({Views.BackofficeArticleOverview.class, Views.BackofficeArticleView.class})
    private Language lang;

    @Column(name = "_showFull", nullable = false)
    @JsonView({ Views.UserArticleView.class, Views.BackofficeArticleView.class})
    private boolean showFull;

    @Column(name = "_title")
    @JsonView({ Views.UserArticleView.class, Views.UserArticleShortView.class, Views.BackofficeArticleOverview.class, Views.BackofficeArticleView.class})
    private String title;

    @Column(name = "_intro", columnDefinition = "TEXT")
    @JsonView({ Views.UserArticleView.class, Views.UserArticleShortView.class, Views.BackofficeArticleOverview.class, Views.BackofficeArticleView.class})
    private String intro;

    @Column(name = "_imageFileName")
    @JsonView({ Views.UserArticleView.class, Views.UserArticleShortView.class, Views.BackofficeArticleView.class})
    private String imageFileName;

    @Column(name = "_imageCopyrights")
    @JsonView({ Views.UserArticleView.class, Views.BackofficeArticleView.class})
    private String imageDescription;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "_owner__userId", nullable = false)
    @JsonView({ Views.UserArticleView.class, Views.UserArticleShortView.class, Views.BackofficeArticleOverview.class, Views.BackofficeArticleView.class})
    private User owner;

    @Column(name = "_visible")
    @JsonView(Views.BackofficeArticleView.class)
    private boolean visible;

    @OneToMany(mappedBy = "article", fetch = FetchType.LAZY)
    @JsonView({ Views.UserArticleView.class, Views.BackofficeArticleView.class})
    private List<Paragraph> paragraphs;

}
