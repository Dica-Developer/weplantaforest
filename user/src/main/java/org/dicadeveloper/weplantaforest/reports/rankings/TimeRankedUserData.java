package org.dicadeveloper.weplantaforest.reports.rankings;

import org.dicadeveloper.weplantaforest.common.support.DateHelper;

import lombok.Getter;

public class TimeRankedUserData {

    public TimeRankedUserData(String name, Long regDate) {
        this.name = name;
        this.regDate = regDate;

        String[] dateAndTime = DateHelper.getDateAndTimeAsString(regDate);
        this.date = dateAndTime[0];
        this.time = dateAndTime[1];
    }

    @Getter
    String name;
    @Getter
    String date;
    @Getter
    String time;

    Long regDate;
}
