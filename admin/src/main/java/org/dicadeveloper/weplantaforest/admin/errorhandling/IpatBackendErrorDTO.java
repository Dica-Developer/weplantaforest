package org.dicadeveloper.weplantaforest.admin.errorhandling;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class IpatBackendErrorDTO {

    private final List<IpatErrorInfo> errorInfos;
    
}
