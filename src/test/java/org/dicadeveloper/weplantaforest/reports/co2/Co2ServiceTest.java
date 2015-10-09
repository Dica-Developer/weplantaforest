package org.dicadeveloper.weplantaforest.reports.co2;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Matchers.anyLong;
import static org.mockito.Mockito.when;

import org.junit.Test;
import org.mockito.Mockito;

public class Co2ServiceTest {

    @Test
    public void testGetCo2OfAllTrees() {
        Co2Repository co2Repository = Mockito.mock(Co2Repository.class);
        when(co2Repository.countAmountOfTrees()).thenReturn(943L);
        when(co2Repository.getCo2Saving(anyLong())).thenReturn(4.6789);
        Co2Service co2Service = new Co2Service(co2Repository);
        Co2Dto co2Dto = co2Service.getGetCo2OfAllTrees();
        assertThat(co2Dto.getCo2()).isEqualTo(4.6789);
        assertThat(co2Dto.getTreesCount()).isEqualTo(943);
    }

}
