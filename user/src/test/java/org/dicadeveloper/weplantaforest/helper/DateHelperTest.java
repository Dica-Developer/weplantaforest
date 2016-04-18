package org.dicadeveloper.weplantaforest.helper;

import static org.assertj.core.api.Assertions.assertThat;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = WeplantaforestApplication.class)
@IntegrationTest({ "spring.profiles.active=test" })
public class DateHelperTest {

    @Test
    public void testGetDateAndTimeAsString() {
        String[] dateAndTime = DateHelper.getDateAndTimeAsString(50000L);

        assertThat(dateAndTime[0]).isEqualTo("31.12.1969");
        assertThat(dateAndTime[1]).isEqualTo("16:00:50");
    }

}
