package org.dicadeveloper.weplantaforest.common.support;

import java.math.BigDecimal;

public class PriceHelper {

    public static long fromBigDecimalToLong(BigDecimal bigDecimalValue) {
        double doubleValue = bigDecimalValue.doubleValue() * 100.0;
        doubleValue = Math.round(doubleValue);
        return (long) doubleValue;
    }

    public static BigDecimal fromLongToBigDecimal(long longValue) {
        double doubleValue = ((double) longValue / 100.0);
        return new BigDecimal(doubleValue);
    }

    public static double fromCentsToEuro(long cents) {
        return ((double) cents / 100.0);
    }

}
