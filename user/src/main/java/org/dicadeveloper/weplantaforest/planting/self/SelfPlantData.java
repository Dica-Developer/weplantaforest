package org.dicadeveloper.weplantaforest.planting.self;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter 
public class SelfPlantData {

    String owner;
    long plantedOn;
    int amount;
    
    String treeType;
    String description;
    
    float longitude;
    float latitude;
    
}
