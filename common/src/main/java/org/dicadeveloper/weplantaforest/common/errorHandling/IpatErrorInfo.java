package org.dicadeveloper.weplantaforest.common.errorHandling;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IpatErrorInfo {

    String errorCode;
        
    private Object[] errorParams;
    
}
