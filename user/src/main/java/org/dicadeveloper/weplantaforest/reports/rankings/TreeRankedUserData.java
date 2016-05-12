package org.dicadeveloper.weplantaforest.reports.rankings;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Getter
@AllArgsConstructor
@RequiredArgsConstructor
public class TreeRankedUserData {

    @NonNull
    String name;

    @NonNull
    Long amount;

    Double co2Saved;

}
