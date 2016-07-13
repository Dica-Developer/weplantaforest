package org.dicadeveloper.weplantaforest;

import org.dicadeveloper.weplantaforest.encryption.PasswordEncrypter;
import org.dicadeveloper.weplantaforest.security.StatelessAuthenticationFilter;
import org.dicadeveloper.weplantaforest.security.StatelessLoginFilter;
import org.dicadeveloper.weplantaforest.security.TokenAuthenticationService;
import org.dicadeveloper.weplantaforest.security.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@Configuration
@Order(1)
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
        http
                .exceptionHandling().and()
                .anonymous().and()
                .servletApi().and()
                .authorizeRequests()
                                
                //allow anonymous resource requests
                .antMatchers("/").permitAll()
                .antMatchers("/browser/**").permitAll()
                
                //allow anonymous POSTs to login
                .antMatchers(HttpMethod.POST, "/api/login").permitAll()
                
                //allow anonymous GETs to API
                .antMatchers(HttpMethod.GET, "/api/**").permitAll()
                
                //defined Admin only API area
                .antMatchers("/admin/**").hasRole("ADMIN")
                
                //all other request need to be authenticated
                .anyRequest().hasRole("USER").and()             
        
                // custom JSON based authentication by POST of {"username":"<name>","password":"<password>"} which sets the token header upon authentication
                .addFilterBefore(new StatelessLoginFilter("/api/login", tokenAuthenticationService, _userDetailsService, authenticationManager()), UsernamePasswordAuthenticationFilter.class)

                // custom Token based authentication based on the header previously given to the client
                .addFilterBefore(new StatelessAuthenticationFilter(tokenAuthenticationService), UsernamePasswordAuthenticationFilter.class)
                .headers().cacheControl();
    }
    
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(_userDetailsService).passwordEncoder(_passwordEncrypter);
    }

    @Override
    protected UserDetailsService userDetailsService() {
        return _userDetailsService;
    }
}
