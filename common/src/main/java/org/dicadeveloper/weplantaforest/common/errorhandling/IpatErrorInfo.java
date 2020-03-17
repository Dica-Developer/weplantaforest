package org.dicadeveloper.weplantaforest.common.errorhandling;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IpatErrorInfo {

    public IpatErrorInfo(String errorCode, String... textParams) {
        this.errorCode = errorCode;
        this.errorParams = textParams;
    }

    String errorCode;

    private Object[] errorParams;

}
