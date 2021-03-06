package org.dicadeveloper.weplantaforest.reports.rankings;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TimeRankedTreeData {

    String name;
    int amount;
    long plantedOn;
    String treeTypeName;
    String treeTypeImageName;

}
