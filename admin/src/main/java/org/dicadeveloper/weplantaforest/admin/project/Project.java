package org.dicadeveloper.weplantaforest.admin.project;

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

import org.dicadeveloper.weplantaforest.admin.user.User;
import org.dicadeveloper.weplantaforest.admin.views.Views;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    @JsonView({Views.ProjectNameAndId.class, Views.ProjectData.class})
    private Long id;

    @Column(name = "_name", length = 255)
    @JsonView({Views.ProjectNameAndId.class, Views.ProjectData.class,Views.CartDetails.class})
    private String name;

    @Column(name = "_description", length = 65535, columnDefinition = "TEXT")
    @JsonView(Views.ProjectData.class)
    private String description;

    @Column(name = "_longitude")
    @JsonView(Views.ProjectData.class)
    private Float longitude;

    @Column(name = "_latitude")
    @JsonView(Views.ProjectData.class)
    private Float latitude;

    @Column(name = "_shopActive")
    @JsonView(Views.ProjectData.class)
    private Boolean shopActive;

    @Column(name = "_visible")
    @JsonView(Views.ProjectData.class)
    private Boolean visible;

    @Column(name = "_mainImageFileName", length = 255)
    @JsonView(Views.ProjectData.class)
    private String imageFileName;

    /**
     * @deprecated no longer used in new version
     */
    @Deprecated
    @Column(name = "_googleMapsOverlayImageFileName", length = 200)
    private String _googleMapsOverlayImageFileName;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "_manager__userId", nullable = false)
    @JsonView(Views.ProjectData.class)
    private User manager;

    @OneToMany(mappedBy = "project", fetch = FetchType.LAZY)
 //   @Cascade(CascadeType.ALL)
    @JsonIgnoreProperties("project")
    private List<ProjectArticle> articles;
    
    @OneToMany(mappedBy = "project", fetch = FetchType.LAZY)
    private List<ProjectImage> images;
}
