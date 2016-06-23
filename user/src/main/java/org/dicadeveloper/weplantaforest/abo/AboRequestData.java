package org.dicadeveloper.weplantaforest.abo;

import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBag;

import lombok.Getter;

@Getter
public class AboRequestData {
    
    int amount;
    String period;
    
    PlantBag plantBag;

}
