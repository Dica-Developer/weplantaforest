package org.dicadeveloper.weplantaforest.team;

import org.dicadeveloper.weplantaforest.reports.co2.Co2Data;

import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@RequiredArgsConstructor
@Getter
@Setter
public class TeamReportData {
    
    @NonNull
    Long teamId;
  
    @NonNull
    String teamName;
   
    @NonNull
    Long regData;
    
    @NonNull
    String adminName;
    
    @NonNull
    String description;
    
    @NonNull
    Long memberCount;
    
    Co2Data co2Data;
    
    Long rank;
}
