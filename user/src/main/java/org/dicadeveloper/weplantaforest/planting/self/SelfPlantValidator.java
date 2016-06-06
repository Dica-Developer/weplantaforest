package org.dicadeveloper.weplantaforest.planting.self;

import org.springframework.stereotype.Component;

@Component
public class SelfPlantValidator {

    protected boolean isSelfPlantDataValid(SelfPlantData selfPlantData) {
        return (selfPlantData.getAmount() <= 10);
    }

}
