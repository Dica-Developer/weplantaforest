package org.dicadeveloper.weplantaforest.articlemanager;

import org.dicadeveloper.weplantaforest.articlemanager.security.PasswordEncrypter;
import org.dicadeveloper.weplantaforest.articlemanager.security.StatelessAuthenticationFilter;
import org.dicadeveloper.weplantaforest.articlemanager.security.TokenAuthenticationService;
import org.dicadeveloper.weplantaforest.articlemanager.security.UserDetailsService;
import org.dicadeveloper.weplantaforest.common.user.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@Configuration
public class WebSecurityConfigurerAdapterExt extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService _userDetailsService;

    @Autowired
    private PasswordEncrypter _passwordEncrypter;

    @Autowired
    private TokenAuthenticationService tokenAuthenticationService;

    public WebSecurityConfigurerAdapterExt() {
        super(true);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.exceptionHandling()
            .and()
            .anonymous()
            .and()
            .servletApi();
            // .and()
            // .headers()
            // .cacheControl();

        // custom JSON based authentication by POST of
        // {"name":"<name>","password":"<password>"} which sets the
        // token
        // header upon authentication
        http
        .authorizeRequests()
            .antMatchers(HttpMethod.GET, "/backOffice/**")
            .hasAnyRole(Role.ADMIN.getIdentifier(), Role.ARTICLE_MANAGER.getIdentifier())
            // .hasRole(Role.ADMIN.getIdentifier())
            .and()
            .authorizeRequests()
            .antMatchers(HttpMethod.POST, "/backOffice/**")
            .hasAnyRole(Role.ADMIN.getIdentifier(), Role.ARTICLE_MANAGER.getIdentifier())
            .and()
            .authorizeRequests()
            .antMatchers(HttpMethod.DELETE, "/backOffice/**")
            .hasAnyRole(Role.ADMIN.getIdentifier(), Role.ARTICLE_MANAGER.getIdentifier())
            .and()
            .authorizeRequests()
            .antMatchers(HttpMethod.POST, "/**/upload/**")
            .hasAnyRole(Role.ADMIN.getIdentifier(), Role.ARTICLE_MANAGER.getIdentifier())
            .and()

            // no need, cause login is handled in user module
            // .addFilterBefore(new StatelessLoginFilter("/api/login",
            // tokenAuthenticationService, _userDetailsService,
            // authenticationManager()),
            // UsernamePasswordAuthenticationFilter.class)

            // custom Token based authentication based on the header previously
            // given to the client
            .addFilterBefore(new StatelessAuthenticationFilter(tokenAuthenticationService), UsernamePasswordAuthenticationFilter.class);

    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(_userDetailsService)
            .passwordEncoder(_passwordEncrypter);
    }

    @Override
    protected UserDetailsService userDetailsService() {
        return _userDetailsService;
    }
}
