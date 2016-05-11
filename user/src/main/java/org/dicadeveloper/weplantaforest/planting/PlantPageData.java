package org.dicadeveloper.weplantaforest.planting;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PlantPageData {
    
    double targetedPrice;
    
    List<ProjectData> projects;

}
