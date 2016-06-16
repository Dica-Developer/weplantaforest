package org.dicadeveloper.weplantaforest.code;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.dicadeveloper.weplantaforest.event.Event;
import org.dicadeveloper.weplantaforest.gift.Gift;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CodeGenerator {

    @Autowired
    CodeRepository _codeRepository;

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

 

    public List<Code> generate(final Event event, final int count, final int treeCount) {
        final Calendar cal = Calendar.getInstance();
        final int year = cal.get(Calendar.YEAR);
        final int month = cal.get(Calendar.MONTH);

        int from = 0;
        for (final Code code : event.getCodes()) {
            final int number = code.getNumber();
            if (number > from) {
                from = number + 1;
            }
        }
        final int to = from + count;

        final List<Code> codes = new ArrayList<Code>();
        for (int i = from; i < to; i++) {
            Code code = null;
            while (code == null) {
                code = generate(event, year, month, i);
            }
            code.setTreeCount(treeCount);
            _codeRepository.save(code);
            codes.add(code);
        }
        return codes;
    }

    public List<Code> generate(final Event event, final int count, final float amount) {
        final Calendar cal = Calendar.getInstance();
        final int year = cal.get(Calendar.YEAR);
        final int month = cal.get(Calendar.MONTH);

        int from = 0;
        for (final Code code : event.getCodes()) {
            final int number = code.getNumber();
            if (number > from) {
                from = number + 1;
            }
        }
        final int to = from + count;

        final List<Code> codes = new ArrayList<Code>();
        for (int i = from; i < to; i++) {
            Code code = null;
            while (code == null) {
                code = generate(event, year, month, i);
            }
            code.setAmount(amount);
            _codeRepository.save(code);
            codes.add(code);
        }

        return codes;
    }

    public Code generate(final Gift gift) {
        final Calendar cal = Calendar.getInstance();
        return generate(null, gift, cal.get(Calendar.YEAR), cal.get(Calendar.MONTH), 0);
    }

    public Code generate(final Gift gift, final int year, final int month, final int number) {
        return generate(null, gift, year, month, number);
    }

    public Code generate(final Event event, final int year, final int month, final int number) {
        return generate(event, null, year, month, number);
    }

    private Code generate(final Event event, final Gift gift, int year, final int month, final int number) {
        final Code code = new Code();
        code.setEvent(event);
        code.setGift(gift);
        code.setYear(year);
        code.setMonth(month);
        code.setNumber(number);

        year = (year - 2000) % 30;

        // try 1000 times to generate a code
        for (int i = 0; i < 1000; i++) {
            final StringBuilder key = new StringBuilder();
            // build secure count [small]
            final int countA = random(8);
            final int countB = random(8);
            key.append(small(countA));
            key.append(small(countB));

            // create year [medium]
            final int yearA = random(Math.max(year - 15, 0), Math.min(year, 15));
            final int yearB = year - yearA;
            key.append(medium(yearA));
            key.append(medium(yearB));

            key.append("-");

            // generate number [large]
            float num = number / 16.0f;
            int numberA = (int) (num % 1.0f * 16.0f);
            num = (int) num / 16.0f;
            int numberB = (int) (num % 1.0f * 16.0f);
            num = (int) num / 16.0f;
            int numberC = (int) (num % 1.0f * 16.0f);
            num = (int) num / 16.0f;
            int numberD = (int) (num % 1.0f * 16.0f);

            numberA = numberA + 8 - countB;
            numberB = numberB + 8 + countA;
            numberC = numberC + 8 + countB;
            numberD = numberD + 8 - countA;

            key.append(large(numberD));
            key.append(large(numberA));
            key.append(large(numberC));
            key.append(large(numberB));

            key.append("-");

            // generate part of event id [large]
            float eve = 0.0f;
            if (event != null) {
                eve += event.getId();
            }
            if (gift != null) {
                eve += gift.getId();
            }
            eve /= 16.0f;

            int eventA = (int) (eve % 1.0f * 16.0f);
            eve = (int) eve / 16.0f;
            int eventB = (int) (eve % 1.0f * 16.0f);
            eve = (int) eve / 16.0f;
            int eventC = (int) (eve % 1.0f * 16.0f);
            eve = (int) eve / 16.0f;
            int eventD = (int) (eve % 1.0f * 16.0f);

            eventA = eventA + 8 + countB;
            eventB = eventB + 8 - countA;
            eventC = eventC + 8 - countB;
            eventD = eventD + 8 + countA;

            key.append(large(eventB));
            key.append(large(eventC));
            key.append(large(eventA));
            key.append(large(eventD));

            key.append("-");

            // create month [small]
            final int monthA = random(Math.max(month - 7, 0), Math.min(month, 8));
            final int monthB = month - monthA;
            key.append(small(monthA));
            key.append(small(monthB));

            // calculate checksum [medium]
            final int sum = countA + countB + yearA + yearB + numberA + numberB + numberC + numberD + eventA + eventB + eventC + eventD + monthA + monthB;
            final int missing = 23 - sum % 23;
            final int checkA = random(Math.max(missing - 8, 0), Math.min(missing, 8));
            final int checkB = missing - checkA;
            key.append(medium(checkA));
            key.append(medium(checkB));

            // save code or try generate a new one
            final String codeString = key.toString();
            if (null == _codeRepository.findByCode(codeString)) {
                code.setCode(codeString);
                _codeRepository.save(code);
                break;
            }
        }

        return code;
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
            if (sum % 23 == 0) {
                return _codeRepository.findByCode(code) != null;
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
}
