package org.dicadeveloper.weplantaforest.errorhandling;

import javax.servlet.http.HttpServletResponse;

import org.dicadeveloper.weplantaforest.common.errorhandling.IpatBackendErrorDTO;
import org.dicadeveloper.weplantaforest.common.errorhandling.IpatException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class IpatExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = IpatException.class)
    public ResponseEntity<IpatBackendErrorDTO> handleIpatException(HttpServletResponse response, IpatException ex) {
        return new ResponseEntity<IpatBackendErrorDTO>(new IpatBackendErrorDTO(ex.getErrorInfos()), HttpStatus.BAD_REQUEST);
    }
}
