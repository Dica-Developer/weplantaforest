package org.dicadeveloper.weplantaforest.code;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.dicadeveloper.weplantaforest.common.code.CodeHelper;
import org.dicadeveloper.weplantaforest.event.Event;
import org.dicadeveloper.weplantaforest.gift.Gift;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CodeGenerator {

    @Autowired
    CodeRepository _codeRepository;

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
            Code code = generate(event, year, month, i);
            codes.add(code);
        }
        return codes;
    }

    public List<Code> generate(final Event event, final int count, final float price) {
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
            Code code = generate(event, year, month, i);
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

    private Code generate(final Event event, final Gift gift, int year, final int month, int number) {
        Code code = new Code();
        code.setEvent(event);
        code.setGift(gift);
        code.setYear(year);
        code.setMonth(month);
        code.setNumber(number);

        // save code or try generate a new one
        boolean codeSaved = false;
        while (!codeSaved) {
            final String codeString = CodeHelper.generateCodeString();
            if (null == _codeRepository.findByCode(codeString)) {
                code.setCode(codeString);
                code = _codeRepository.save(code);
                codeSaved = true;
            }
        }
        return code;
    }

    public boolean isValid(final String code) {
        if (CodeHelper.isValid(code)) {
            return _codeRepository.findByCode(code) != null;
        } else {
            return false;
        }
    }
}
