package org.dicadeveloper.weplantaforest.common.errorhandling;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class IpatBackendErrorDTO {

    private List<IpatErrorInfo> errorInfos;

}
