package org.dicadeveloper.weplantaforest.reports.rankings;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor
public class TreeRankedUserData {

    String name;
    Long amount;
    Double co2Saved;

}
