package org.dicadeveloper.weplantaforest.user;

import org.dicadeveloper.weplantaforest.common.support.Language;
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

    String imageFileName;

    @NonNull
    String mail;

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
    Language lang;

    @NonNull
    Boolean newsletter;

    public String getOrganizationType() {
        return organizationType.toString();
    }

    public String getNewsletter() {
        return newsletter ? "JA" : "NEIN";
    }

    long rank;

    Co2Data co2Data;

    boolean isEditAllowed;

}
