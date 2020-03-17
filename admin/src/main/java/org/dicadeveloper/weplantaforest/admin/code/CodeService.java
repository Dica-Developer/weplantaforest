package org.dicadeveloper.weplantaforest.admin.code;

import org.dicadeveloper.weplantaforest.common.code.CodeHelper;
import org.dicadeveloper.weplantaforest.common.errorhandling.ErrorCodes;
import org.dicadeveloper.weplantaforest.common.errorhandling.IpatException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CodeService {

    @Autowired
    CodeRepository codeRepository;

    public Code generateCode() throws IpatException {
        Code code = new Code();
        // save code or try generate a new one
        boolean codeSaved = false;
        while (!codeSaved) {
            final String codeString = CodeHelper.generateCodeString();
            if (null == codeRepository.findByCode(codeString)) {
                code.setCode(codeString);
                codeSaved = true;
                return codeRepository.save(code);
            }
        }
        throw new IpatException(ErrorCodes.COULD_NOT_GENERATE_CODE);
    }

    public boolean isValid(final String code) {
        if (CodeHelper.isValid(code)) {
            return codeRepository.findByCode(code) != null;
        } else {
            return false;
        }
    }
}
