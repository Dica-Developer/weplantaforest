package org.dicadeveloper.weplantaforest.projects.offer;

import org.hibernate.validator.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProjectOfferData {
    
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

    @JsonProperty
    boolean isAfforestation;

    String purpose;

    @JsonProperty
    boolean isSelling;
    
    @JsonProperty
    boolean isLeasing;

    String lease;

    String comment;

}
