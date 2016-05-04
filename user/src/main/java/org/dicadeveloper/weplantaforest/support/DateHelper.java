package org.dicadeveloper.weplantaforest.support;

import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateHelper {

    static Format format = new SimpleDateFormat("dd.MM.yyyy HH:mm:ss");

    public static String[] getDateAndTimeAsString(Long timeStamp) {
        String[] dateAndTime = new String[2];

        if (null != timeStamp) {

            Date regDate = new Date(timeStamp);
            String dateTimeAsString = format.format(regDate);
            String date = dateTimeAsString.substring(0, 10);
            String time = dateTimeAsString.substring(11, 19);

            dateAndTime[0] = date;
            dateAndTime[1] = time;
        }

        return dateAndTime;
    }

}
