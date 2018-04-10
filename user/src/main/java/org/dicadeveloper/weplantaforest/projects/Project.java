package org.dicadeveloper.weplantaforest.projects;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.dicadeveloper.weplantaforest.user.User;
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
@Table(name = "Plant")
public class Project {

    @Id
    @GeneratedValue
    @Column(name = "_plantId")
    private Long id;

    @Column(name = "_name", length = 255)
    @JsonView(Views.PlantedTree.class)
    private String name;

    @Column(name = "_description", length = 65535, columnDefinition = "TEXT")
    private String description;

    @Column(name = "_longitude")
    private Float longitude;

    @Column(name = "_latitude")
    private Float latitude;

    @Column(name = "_zoom")
    private Integer zoom;

    @Column(name = "_shopOpening")
    private Long shopOpening;

    @Column(name = "_shopClosing")
    private Long shopClosing;

    @Column(name = "_shopActive")
    private Boolean shopActive;

    @Column(name = "_visible")
    private Boolean visible;

    @Column(name = "_mainImageFileName", length = 255)
    private String imageFileName;

    /**
     * @deprecated no longer used in new version
     */
    @Deprecated
    @Column(name = "_googleMapsOverlayImageFileName", length = 200)
    private String _googleMapsOverlayImageFileName;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "_manager__userId", nullable = false)
    private User manager;

    @OneToMany(mappedBy = "project", fetch = FetchType.LAZY)
    private List<ProjectArticle> articles;
    
    @OneToMany(mappedBy = "project", fetch = FetchType.LAZY)
    private List<ProjectImage> images;
}
