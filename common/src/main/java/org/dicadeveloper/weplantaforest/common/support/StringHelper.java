package org.dicadeveloper.weplantaforest.common.support;

import java.util.regex.Pattern;

public class StringHelper {

    public final static String UNKNOWN_DATATYPE = "Unknown datatype! No \'.\' found in fileName.";

    public static final Pattern EMAIL_PATTERN = Pattern
            .compile("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");

    public static boolean isValidEmail(final String email) {
        return EMAIL_PATTERN.matcher(email.trim().toLowerCase()).matches();
    }

    public static String getDataTypeFromFileName(String fileName) {

        if (fileName.contains(".")) {
            return fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length());
        } else {
            return UNKNOWN_DATATYPE;
        }
    }

    public static String addNumberToFileName(String fileName, int number) {
        if (fileName.contains(".")) {
            String newFileName = fileName;
            String fileType = getDataTypeFromFileName(fileName);
            newFileName = fileName.substring(0, fileName.lastIndexOf("."));
            return newFileName + number + "." + fileType;
        } else {
            return UNKNOWN_DATATYPE;
        }

    }
    
    public static boolean isEmpty(final String queryString) {
        return queryString == null || queryString.trim().length() == 0;
    }

}
