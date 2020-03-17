package org.dicadeveloper.weplantaforest.admin;

import org.dicadeveloper.weplantaforest.admin.security.PasswordEncrypter;
import org.dicadeveloper.weplantaforest.admin.security.StatelessAuthenticationFilter;
import org.dicadeveloper.weplantaforest.admin.security.TokenAuthenticationService;
import org.dicadeveloper.weplantaforest.admin.security.UserDetailsService;
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
    private UserDetailsService userDetailsService;

    @Autowired
    private PasswordEncrypter passwordEncrypter;

    @Autowired
    private TokenAuthenticationService tokenAuthenticationService;

    public WebSecurityConfigurerAdapterExt() {
        super(true);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.exceptionHandling().and().anonymous().and().servletApi();
        // .and()
        // .headers()
        // .cacheControl();

        // custom JSON based authentication by POST of
        // {"name":"<name>","password":"<password>"} which sets the
        // token
        // header upon authentication
        http.authorizeRequests().antMatchers(HttpMethod.GET, "/**").hasRole(Role.ADMIN.getIdentifier()).and().authorizeRequests().antMatchers(HttpMethod.POST, "/**")
                .hasRole(Role.ADMIN.getIdentifier()).and().authorizeRequests().antMatchers(HttpMethod.DELETE, "/**").hasRole(Role.ADMIN.getIdentifier()).and().authorizeRequests()
                .antMatchers(HttpMethod.PUT, "/**").hasRole(Role.ADMIN.getIdentifier()).and()

                // no need, cause login is handled in user module
                // .addFilterBefore(new StatelessLoginFilter("/api/login",
                // tokenAuthenticationService, _userDetailsService,
                // authenticationManager()),
                // UsernamePasswordAuthenticationFilter.class)

                // custom Token based authentication based on the header
                // previously
                // given to the client
                .addFilterBefore(new StatelessAuthenticationFilter(tokenAuthenticationService), UsernamePasswordAuthenticationFilter.class);

    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncrypter);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected UserDetailsService userDetailsService() {
        return userDetailsService;
    }
}
