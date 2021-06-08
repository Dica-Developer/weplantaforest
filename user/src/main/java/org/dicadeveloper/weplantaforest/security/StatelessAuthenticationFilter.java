package org.dicadeveloper.weplantaforest.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.dicadeveloper.weplantaforest.user.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

public class StatelessAuthenticationFilter extends GenericFilterBean {

    private final TokenAuthenticationService tokenAuthenticationService;

    private final UserDetailsService userDetailsService;

    public StatelessAuthenticationFilter(TokenAuthenticationService taService, UserDetailsService userDetailsService) {
        this.tokenAuthenticationService = taService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        final Authentication authentication = tokenAuthenticationService.getAuthentication((HttpServletRequest) req);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        if (null != authentication) {
            tokenAuthenticationService.addAuthentication((HttpServletResponse) res, authentication);
        }

        chain.doFilter(req, res);
    }
}