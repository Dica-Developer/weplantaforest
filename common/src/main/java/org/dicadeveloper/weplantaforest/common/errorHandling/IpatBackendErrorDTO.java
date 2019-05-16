package org.dicadeveloper.weplantaforest.common.errorHandling;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class IpatBackendErrorDTO {

    private List<IpatErrorInfo> errorInfos;

}
