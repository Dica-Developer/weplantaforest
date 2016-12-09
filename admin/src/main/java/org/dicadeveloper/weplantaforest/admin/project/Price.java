package org.dicadeveloper.weplantaforest.admin.project;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Transient;

import org.dicadeveloper.weplantaforest.views.Views;

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
public class Price {

    public enum ScontoType {
        NONE, PERCENT, ABSOLUT
    };

    @Id
    @Column(name = "_priceId")
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonView(Views.ProjectArticle.class)
    private Long priceId;

    @Column(name = "_scontoType", nullable = false)
    @Enumerated(EnumType.STRING)
    @JsonView(Views.ProjectArticle.class)
    private ScontoType scontoType = ScontoType.NONE;

    @Column(name = "_amount", precision = 7, scale = 2)
    @JsonView(Views.ProjectArticle.class)
    private BigDecimal amount = BigDecimal.ZERO;

    @Column(name = "_funding", precision = 7, scale = 2)
    @JsonView(Views.ProjectArticle.class)
    private BigDecimal funding = BigDecimal.ZERO;

    @Column(name = "_sconto", precision = 7, scale = 2)
    @JsonView(Views.ProjectArticle.class)
    private BigDecimal sconto = BigDecimal.ZERO;

    @Column(name = "_marge", precision = 7, scale = 2, nullable = true)
    @JsonView(Views.ProjectArticle.class)
    private BigDecimal marge = BigDecimal.ZERO;

    @Transient
    private Short nrToSconto;
}
