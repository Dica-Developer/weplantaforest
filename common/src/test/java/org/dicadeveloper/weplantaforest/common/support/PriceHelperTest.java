package org.dicadeveloper.weplantaforest.common.support;

import static org.assertj.core.api.Assertions.assertThat;

import java.math.BigDecimal;

import org.junit.Test;

public class PriceHelperTest {

    @Test
    public void testBigDecimalToLongVeryLowPriceTwoDecimalPlaces() {
        BigDecimal bd = new BigDecimal(0.01);
        long longValue = PriceHelper.fromBigDecimalToLong(bd);
        assertThat(longValue).isEqualTo(1);
    }

    @Test
    public void testBigDecimalToLongLowPriceTwoDecimalPlaces() {
        BigDecimal bd = new BigDecimal(1.37);
        long longValue = PriceHelper.fromBigDecimalToLong(bd);
        assertThat(longValue).isEqualTo(137);
    }

    @Test
    public void testBigDecimalToLongHighPriceTwoDecimalPlaces() {
        BigDecimal bd = new BigDecimal(133.37);
        long longValue = PriceHelper.fromBigDecimalToLong(bd);
        assertThat(longValue).isEqualTo(13337);
    }

    @Test
    public void testBigDecimalToLongVeryHighPriceTwoDecimalPlaces() {
        BigDecimal bd = new BigDecimal(1001001.67);
        long longValue = PriceHelper.fromBigDecimalToLong(bd);
        assertThat(longValue).isEqualTo(100100167);
    }

    @Test
    public void testBigDecimalToLongMoreThanTwoDecimalPlacesAndRoundUp() {
        BigDecimal bd = new BigDecimal(100.679999);
        long longValue = PriceHelper.fromBigDecimalToLong(bd);
        assertThat(longValue).isEqualTo(10068);
    }

    @Test
    public void testBigDecimalToLongMoreThanTwoDecimalPlacesAndRoundDown() {
        BigDecimal bd = new BigDecimal(100.674444);
        long longValue = PriceHelper.fromBigDecimalToLong(bd);
        assertThat(longValue).isEqualTo(10067);
    }

    @Test
    public void testBigDecimalToLongMoreThanTwoDecimalPlacesAndRoundUpAt5() {
        BigDecimal bd = new BigDecimal(100.675);
        long longValue = PriceHelper.fromBigDecimalToLong(bd);
        assertThat(longValue).isEqualTo(10068);
    }

    @Test
    public void testLongToBigDecimalVeryLowPrice() {
        long lv = 1;
        BigDecimal bigDecimalValue = PriceHelper.fromLongToBigDecimal(lv);
        assertThat(bigDecimalValue.doubleValue()).isEqualTo(0.01);
    }

    @Test
    public void testLongToBigDecimalLowPrice() {
        long lv = 137;
        BigDecimal bigDecimalValue = PriceHelper.fromLongToBigDecimal(lv);
        assertThat(bigDecimalValue.doubleValue()).isEqualTo(1.37);
    }

    @Test
    public void testLongToBigDecimalHighPrice() {
        long lv = 13337;
        BigDecimal bigDecimalValue = PriceHelper.fromLongToBigDecimal(lv);
        assertThat(bigDecimalValue.doubleValue()).isEqualTo(133.37);
    }

    @Test
    public void testLongToBigDecimalVeryHighPrice() {
        long lv = 1333337;
        BigDecimal bigDecimalValue = PriceHelper.fromLongToBigDecimal(lv);
        assertThat(bigDecimalValue.doubleValue()).isEqualTo(13333.37);
    }

    @Test
    public void testCentsToEuro() {
        long cents = 100;
        double euro = PriceHelper.fromCentsToEuro(cents);
        assertThat(euro).isEqualTo(1.0);
    }

}
