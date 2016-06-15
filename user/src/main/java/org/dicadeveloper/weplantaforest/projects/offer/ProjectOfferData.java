package org.dicadeveloper.weplantaforest.projects.offer;

import org.hibernate.validator.constraints.NotEmpty;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProjectOfferData {

    Long userId;
    
    String first;
    @NotEmpty
    String name;
    @NotEmpty
    String mail;

    @NotEmpty
    String location;
    @NotEmpty
    String size;
    @NotEmpty
    String owner;

    boolean isAfforestation;

    String purpose;

    boolean isSelling;
    boolean isLeasing;

    String Lease;

    String comment;

}
