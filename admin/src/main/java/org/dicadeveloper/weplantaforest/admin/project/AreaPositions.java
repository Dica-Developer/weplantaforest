package org.dicadeveloper.weplantaforest.admin.project;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import org.dicadeveloper.weplantaforest.admin.views.Views;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.Data;

@Embeddable
@Data
public class AreaPositions {

    @Column(name = "_lat")
    @JsonView(Views.ProjectData.class)
    Double lat;

    @Column(name = "_lng")
    @JsonView(Views.ProjectData.class)
    Double lng;

}
