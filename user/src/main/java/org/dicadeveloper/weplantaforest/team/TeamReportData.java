package org.dicadeveloper.weplantaforest.team;

import org.dicadeveloper.weplantaforest.reports.co2.Co2Data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@RequiredArgsConstructor
public class TeamReportData {

    public TeamReportData(Long id, String name, Long timeStamp, String adminName, String description, Long memberCount, String imageFileName) {
        this.teamId = id;
        this.teamName = name;
        this.regDate = timeStamp;
        this.adminName = adminName;
        this.description = description;
        this.memberCount = memberCount;
        this.imageFileName = imageFileName;
    }

    @NonNull
    Long teamId;

    @NonNull
    String teamName;

    @NonNull
    String imageFileName;

    @NonNull
    Long regDate;

    @NonNull
    String adminName;

    String description;

    @NonNull
    Long memberCount;

    Co2Data co2Data;

    Long rank;
}
