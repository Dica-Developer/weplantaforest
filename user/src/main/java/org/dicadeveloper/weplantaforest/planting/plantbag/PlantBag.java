package org.dicadeveloper.weplantaforest.planting.plantbag;

import java.util.HashMap;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PlantBag {

    long targetPrice;
    long actualPrice;

    HashMap<String, ProjectData> projects = new HashMap<String, ProjectData>();

    @Getter
    @Setter
    @NoArgsConstructor
    public static class ProjectData {

        HashMap<String, PlantItem> plantItems = new HashMap<String, PlantItem>();

        @NoArgsConstructor
        @Getter
        @Setter
        public static class PlantItem {

            int amount;

            long treePrice;

        }

    }

}
