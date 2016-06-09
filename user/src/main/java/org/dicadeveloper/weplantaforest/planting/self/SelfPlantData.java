package org.dicadeveloper.weplantaforest.planting.self;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter 
public class SelfPlantData {

    String owner;
    long plantedOn;
    
    @Min(1)
    @Max(10)
    int amount;
    
    String treeType;
    String description;
    
    float longitude;
    float latitude;
    
}
