package org.dicadeveloper.weplantaforest.security;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {

    private ObjectMapper objectMapper = new ObjectMapper();

    private final static String ACCOUNT_LOCKED = "User account is locked";

    private final static String BAD_CREDENTIALS = "Bad credentials";

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        response.setStatus(HttpStatus.UNAUTHORIZED.value());

        Map<String, Object> data = new HashMap<>();

        if (exception.getMessage().equals(ACCOUNT_LOCKED)) {
            data.put("reason", "LOCKED");
        } else if (exception.getMessage().equals(BAD_CREDENTIALS)) {
            data.put("reason", "BAD_CREDENTIALS");
        }

        response.getOutputStream().println(objectMapper.writeValueAsString(data));
    }

}
