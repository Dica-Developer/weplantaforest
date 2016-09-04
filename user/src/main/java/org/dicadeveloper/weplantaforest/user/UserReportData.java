package org.dicadeveloper.weplantaforest.user;

import org.dicadeveloper.weplantaforest.reports.co2.Co2Data;

import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@RequiredArgsConstructor
@Getter
@Setter
public class UserReportData {

    @NonNull
    String userName;
    
    @NonNull
    String imageFileName;
    
    @NonNull
    Long regDate;
    
    @NonNull
    Long lastVisit;
    
    @NonNull
    OrganizationType organizationType;
    
    @NonNull
    String teamName;
    
    public String getOrganizationType(){
        return organizationType.getDescription();
    }
    
    long rank;

    Co2Data co2Data;

}
