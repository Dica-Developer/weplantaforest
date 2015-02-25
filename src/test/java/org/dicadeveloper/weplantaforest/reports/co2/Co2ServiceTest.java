package org.dicadeveloper.weplantaforest.reports.co2;

import org.junit.Test;
import org.mockito.Mockito;

import static org.mockito.Mockito.when;

import static org.fest.assertions.Assertions.assertThat;

public class Co2ServiceTest {

    @Test
    public void testGetCo2OfAllTrees() {
        Co2Repository co2Repository = Mockito.mock(Co2Repository.class);
        when(co2Repository.countAmountOfTrees()).thenReturn(943L);
        when(co2Repository.getCo2Saving()).thenReturn(4.6789);
        Co2Service co2Service = new Co2Service(co2Repository);
        Co2Dto co2Dto = co2Service.getGetCo2OfAllTrees();
        assertThat(co2Dto.getCo2()).isEqualTo(4.6789);
        assertThat(co2Dto.getTreesCount()).isEqualTo(943);
    }

}
