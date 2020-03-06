package org.dicadeveloper.weplantaforest.admin.slider;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "MainSliderImage")
public class MainSliderImage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "_imageId")
    private Long imageId;

    @Column(name = "_imageFileName")
    private String imageFileName;

}
