package org.dicadeveloper.weplantaforest.common.testSupport;

public class HashUtil {

    public static String samehash(String s, int level) {
        if (s.length() < 2)
            return s;

        String re;
        String sub2 = s.substring(0, 2);
        char c0 = sub2.charAt(0);
        char c1 = sub2.charAt(1);
        c0 = (char) (c0 + level);
        c1 = (char) (c1 - 31 * level);
        String newsub2 = new String(new char[] { c0, c1 });
        re = newsub2 + s.substring(2);
        return re;
    }
}
