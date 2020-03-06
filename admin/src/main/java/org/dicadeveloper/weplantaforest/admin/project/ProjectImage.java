package org.dicadeveloper.weplantaforest.admin.project;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.dicadeveloper.weplantaforest.admin.views.Views;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@ToString
@Getter
@Setter
@EqualsAndHashCode
@Table(name = "PlantImage")
@NoArgsConstructor
public class ProjectImage {

    public ProjectImage(String title, String description, Long date) {
        this.title = title;
        this.description = description;
        this.date = date;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "_imageId")
    @JsonView(Views.ProjectImage.class)
    private Long imageId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "_plant__plantId", nullable = false)
    private Project project;

    @Column(name = "_title")
    @JsonView(Views.ProjectImage.class)
    private String title;

    @Column(name = "_text", columnDefinition = "TEXT")
    @JsonView(Views.ProjectImage.class)
    private String description;

    @Column(name = "_file")
    @JsonView(Views.ProjectImage.class)
    private String imageFileName;

    @Column(name = "_date")
    @JsonView(Views.ProjectImage.class)
    private Long date;

}
