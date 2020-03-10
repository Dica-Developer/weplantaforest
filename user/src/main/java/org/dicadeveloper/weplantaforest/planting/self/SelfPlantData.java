package org.dicadeveloper.weplantaforest.planting.self;

import javax.validation.constraints.Min;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SelfPlantData {

    long plantedOn;

    @Min(1)
    int amount;

    Long treeTypeId;
    String description;

    String imageName;

    float longitude;
    float latitude;

}
