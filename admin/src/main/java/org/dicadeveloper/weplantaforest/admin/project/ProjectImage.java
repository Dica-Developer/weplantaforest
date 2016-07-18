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

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@ToString
@Getter
@Setter
@EqualsAndHashCode
@Table(name = "PlantImage")
public class ProjectImage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "_imageId")
    private Long imageId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "_plant__plantId", nullable = false)
    private Project project;

    @Column(name = "_title")
    private String title;

    @Column(name = "_text", columnDefinition = "TEXT")
    private String description;

    @Column(name = "_file")
    private String imageFileName;

    @Column(name = "_date")
    private Long date;

}
