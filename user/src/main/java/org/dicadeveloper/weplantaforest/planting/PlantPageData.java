package org.dicadeveloper.weplantaforest.planting;

import java.util.HashMap;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PlantPageData {

    long targetPrice;
    long actualPrice;

    HashMap<String, ProjectData> projects;

    @Getter
    @Setter
    @NoArgsConstructor
    public static class ProjectData {

        HashMap<String, PlantItem> plantItems;

        @NoArgsConstructor
        @Getter
        @Setter
        public static class PlantItem {

            int amount;

            long treePrice;

        }

    }

}
