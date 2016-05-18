package org.dicadeveloper.weplantaforest.articles;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import org.springframework.hateoas.Identifiable;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Paragraph implements Identifiable<Long>{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "_paragraphId")
    private Long id;

    @Column(name = "_title")
    private String title;

    @Column(name = "_text")
    private String text;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "_article__articleId", nullable = false)
    private Article article;

}
