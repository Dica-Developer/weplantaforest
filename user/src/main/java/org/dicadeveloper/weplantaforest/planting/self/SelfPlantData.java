package org.dicadeveloper.weplantaforest.planting.self;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SelfPlantData {

    long plantedOn;

    @Min(1)
    @Max(10)
    int amount;

    Long treeTypeId;
    String description;

    String imageName;

    float longitude;
    float latitude;

}
