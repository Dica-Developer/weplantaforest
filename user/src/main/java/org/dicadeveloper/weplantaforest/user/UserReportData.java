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
    
    @NonNull
    String aboutMe;
    
    @NonNull
    String location;
    
    @NonNull
    String organisation;
    
    @NonNull
    String homepage;
    
    @NonNull
    Long lang;
    
    @NonNull
    Boolean newsletter;
    
    public String getOrganizationType(){
        return organizationType.getDescription();
    }
    
    public String getNewsletter(){
        return newsletter ? "JA" : "NEIN";
    }
    
    public String getLang(){
        String langString;
        switch (lang.intValue()) {
        case 0:
            langString =  "DEUTSCH";
            break;
        default:
            langString =  "DEUTSCH";
            break;
        }
        
        return langString;
    }
    
    long rank;

    Co2Data co2Data;
    
    boolean isEditAllowed;

}
