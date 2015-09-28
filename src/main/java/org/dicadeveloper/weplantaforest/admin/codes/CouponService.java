package org.dicadeveloper.weplantaforest.admin.codes;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

@Service
public class CouponService {

    private static class Values {
        public final int small;

        public final int medium;

        public final int large;

        public Values(final int s, final int m, final int l) {
            small = s;
            medium = m;
            large = l;
        }

        public static Values create(final int s, final int m, final int l) {
            return new Values(s, m, l);
        }
    }

    private static final Pattern CODE_PATTERN = Pattern.compile("[A-Z0-9^IJO0]{4}-[A-Z0-9^IJO0]{4}-[A-Z0-9^IJO0]{4}-[A-Z0-9^IJO0]{4}");

    private static final Map<Character, Values> _crypt = new HashMap<Character, Values>();

    static {
        _crypt.put('A', Values.create(5, 6, 14));
        _crypt.put('B', Values.create(2, 9, 12));
        _crypt.put('C', Values.create(4, 1, 21));
        _crypt.put('D', Values.create(1, 14, 26));
        _crypt.put('E', Values.create(1, 5, 4));
        _crypt.put('F', Values.create(4, 2, 20));
        _crypt.put('G', Values.create(0, 14, 18));
        _crypt.put('H', Values.create(3, 2, 13));
        _crypt.put('K', Values.create(5, 13, 28));
        _crypt.put('L', Values.create(5, 15, 10));
        _crypt.put('M', Values.create(3, 8, 11));
        _crypt.put('N', Values.create(7, 0, 30));
        _crypt.put('P', Values.create(3, 4, 1));
        _crypt.put('Q', Values.create(6, 11, 23));
        _crypt.put('R', Values.create(6, 3, 27));
        _crypt.put('S', Values.create(1, 12, 3));
        _crypt.put('T', Values.create(6, 4, 22));
        _crypt.put('U', Values.create(2, 13, 9));
        _crypt.put('V', Values.create(0, 9, 2));
        _crypt.put('W', Values.create(7, 7, 31));
        _crypt.put('X', Values.create(2, 12, 19));
        _crypt.put('Y', Values.create(7, 11, 17));
        _crypt.put('Z', Values.create(0, 0, 25));
        _crypt.put('1', Values.create(7, 15, 29));
        _crypt.put('2', Values.create(6, 10, 16));
        _crypt.put('3', Values.create(4, 6, 0));
        _crypt.put('4', Values.create(5, 11, 7));
        _crypt.put('5', Values.create(0, 7, 5));
        _crypt.put('6', Values.create(2, 8, 15));
        _crypt.put('7', Values.create(3, 1, 6));
        _crypt.put('8', Values.create(1, 5, 24));
        _crypt.put('9', Values.create(4, 3, 8));
    }

    public boolean isValid(final String code) {
        final Matcher matcher = CODE_PATTERN.matcher(code);
        if (matcher.matches()) {
            int sum = 0;
            for (int i = 0; i < 2; i++) {
                final char c = code.charAt(i);
                sum += _crypt.get(c).small;
            }
            for (int i = 2; i < 4; i++) {
                final char c = code.charAt(i);
                sum += _crypt.get(c).medium;
            }
            for (int i = 5; i < 9; i++) {
                final char c = code.charAt(i);
                sum += _crypt.get(c).large;
            }
            for (int i = 10; i < 14; i++) {
                final char c = code.charAt(i);
                sum += _crypt.get(c).large;
            }
            for (int i = 15; i < 17; i++) {
                final char c = code.charAt(i);
                sum += _crypt.get(c).small;
            }
            for (int i = 17; i < 19; i++) {
                final char c = code.charAt(i);
                sum += _crypt.get(c).medium;
            }
        }
        return false;
    }

    private static int random(final int to) {
        return random(0, to);
    }

    private static int random(final int from, final int to) {
        return (int) (from + Math.random() * (to - from));
    }

    private static char small(final int v) {
        final List<Character> cs = new ArrayList<Character>();
        for (final Character c : _crypt.keySet()) {
            final Values values = _crypt.get(c);
            if (values.small == v) {
                cs.add(c);
            }
        }

        final int max = cs.size() - 1;
        return cs.get(random(max));
    }

    private static char medium(final int v) {
        final List<Character> cs = new ArrayList<Character>();
        for (final Character c : _crypt.keySet()) {
            final Values values = _crypt.get(c);
            if (values.medium == v) {
                cs.add(c);
            }
        }

        final int max = cs.size() - 1;
        return cs.get(random(max));
    }

    private static char large(final int v) {
        for (final Character c : _crypt.keySet()) {
            final Values values = _crypt.get(c);
            if (values.large == v) {
                return c;
            }
        }
        return '0';
    }

    public List<Coupon> generateCoupons(Long eventId, int numberOfCoupons, int numberOfTrees) {
        return new ArrayList<>();
    }
}
