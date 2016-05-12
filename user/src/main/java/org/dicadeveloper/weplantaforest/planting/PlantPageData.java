package org.dicadeveloper.weplantaforest.planting;

import java.util.Map;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PlantPageData {

    long actualPrice;

    Map<String, ProjectData> projects;

}
