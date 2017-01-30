package org.dicadeveloper.weplantaforest.planting;

import org.dicadeveloper.weplantaforest.planting.plantbag.PlantBag;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;

@Getter
@AllArgsConstructor
public class PlantForUserRequest {
    
    public PlantForUserRequest(){
        
    }

    private long userId;
    
    private @NonNull PlantBag plantBag;
}
