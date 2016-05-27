package org.dicadeveloper.weplantaforest.common.support;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;

public class DateHelperTest {

    @Test
    public void testGetDateAndTimeFromLong() {
        String[] dateAndTime = DateHelper.getDateAndTimeAsString(90000L);
        assertThat(dateAndTime[0]).isEqualTo("01.01.1970");
        assertThat(dateAndTime[1]).isEqualTo("00:01:30");
    }

    @Test
    public void testGetDateAndTimeFromNull() {
        String[] dateAndTime = DateHelper.getDateAndTimeAsString(null);
        assertThat(dateAndTime[0]).isEqualTo(null);
        assertThat(dateAndTime[1]).isEqualTo(null);
    }

}
