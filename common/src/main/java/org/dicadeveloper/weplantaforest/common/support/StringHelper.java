package org.dicadeveloper.weplantaforest.common.support;

public class StringHelper {

    public final static String UNKNOWN_DATATYPE = "Unknown datatype! No \'.\' found in fileName.";

    public static String getDataTypeFromFileName(String fileName) {

        if (fileName.contains(".")) {
            return fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length());
        } else {
            return UNKNOWN_DATATYPE;
        }
    }

}
