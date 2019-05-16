package org.dicadeveloper.weplantaforest.admin.project;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import org.dicadeveloper.weplantaforest.admin.views.Views;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.Data;

@Embeddable
@Data
public class AreaPositions implements Comparable<AreaPositions>{

    @Column(name = "_lat")
    @JsonView(Views.ProjectData.class)
    Double lat;

    @Column(name = "_lng")
    @JsonView(Views.ProjectData.class)
    Double lng;

    @Column(name = "_order")
    @JsonView(Views.ProjectData.class)
    Integer order;

    @Override
    public int compareTo(AreaPositions ap) {
        if(this.order == ap.order) {
            return 0;
        }else if(this.order > ap.order) {
            return 1;
        }else {
            return -1;
        }
    }
}
