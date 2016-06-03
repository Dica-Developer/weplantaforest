package org.dicadeveloper.weplantaforest.dev.h2;

import org.h2.server.web.WebServlet;
import org.springframework.boot.context.embedded.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile({"h2"})
public class H2ConsoleConfig {
    @Bean
    ServletRegistrationBean h2servletRegistration(){
          
        ServletRegistrationBean registrationBean = new ServletRegistrationBean( new WebServlet());
        registrationBean.addUrlMappings("/h2/*");
        return registrationBean;
    }
}
