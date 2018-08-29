package org.dicadeveloper.weplantaforest.projects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import org.dicadeveloper.weplantaforest.views.Views;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.Data;

@Embeddable
@Data
public class AreaPositions {

    @Column(name = "_lat")
    @JsonView(Views.ProjectDetails.class)
    Double lat;

    @Column(name = "_lng")
    @JsonView(Views.ProjectDetails.class)
    Double lng;

}
