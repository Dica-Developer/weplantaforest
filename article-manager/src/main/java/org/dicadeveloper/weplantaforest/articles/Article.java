package org.dicadeveloper.weplantaforest.articles;

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
import javax.persistence.Transient;

import org.dicadeveloper.weplantaforest.common.support.Language;
import org.dicadeveloper.weplantaforest.user.User;
import org.springframework.hateoas.Identifiable;

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
    private Long id;

    @Column(name = "_createdOn")
    private Long createdOn;

    @Column(name = "_lastEditedOn")
    private Long lastEditedOn;

    @Column(name = "_articleType")
    private ArticleType articleType;

    @Column(name = "_lang", nullable = false)
    private Language lang;

    @Column(name = "_showFull", nullable = false)
    private boolean showFull;

    @Column(name = "_title")
    private String title;

    @Column(name = "_intro", columnDefinition = "TEXT")
    private String intro;

    @Column(name = "_imageFileName")
    private String imageFileName;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "_owner__userId", nullable = false)
    private User owner;

    @Column(name = "_visible")
    private boolean visible;

    @Transient
    @OneToMany(mappedBy = "article")
    private List<Paragraph> paragraphs;

}
