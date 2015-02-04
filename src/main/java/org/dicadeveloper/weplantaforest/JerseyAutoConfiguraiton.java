package org.dicadeveloper.weplantaforest;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;
import javax.ws.rs.ApplicationPath;

import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.spring.SpringComponentProvider;
import org.glassfish.jersey.servlet.ServletContainer;
import org.glassfish.jersey.servlet.ServletProperties;
import org.springframework.beans.factory.ListableBeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.boot.autoconfigure.web.DispatcherServletAutoConfiguration;
import org.springframework.boot.context.embedded.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.core.annotation.Order;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.filter.RequestContextFilter;

@Configuration
@ConditionalOnClass({ SpringComponentProvider.class, ServletRegistration.class })
@ConditionalOnBean(ResourceConfig.class)
@ConditionalOnWebApplication
@Order(Ordered.HIGHEST_PRECEDENCE)
@AutoConfigureBefore(DispatcherServletAutoConfiguration.class)
public class JerseyAutoConfiguraiton implements WebApplicationInitializer {
    @Autowired
    private ListableBeanFactory context;

    @Autowired
    private ResourceConfig config;

    private String path;

    @PostConstruct
    public void path() {
        path = findPath(AnnotationUtils.findAnnotation(config.getClass(), ApplicationPath.class));
    }

    @Bean
    @ConditionalOnMissingBean
    public RequestContextFilter requestContextFilter() {
        return new RequestContextFilter();
    }

    @Bean
    @ConditionalOnMissingBean(name = "jerseyServletRegistration")
    public ServletRegistrationBean jerseyServletRegistration() {
        Class<? extends ResourceConfig> configType = config.getClass();
        ServletRegistrationBean registration = new ServletRegistrationBean(new ServletContainer(), path);
        registration.addInitParameter(ServletProperties.JAXRS_APPLICATION_CLASS, configType.getName());
        registration.setName("jerseyServlet");
        return registration;
    }

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        // We need to switch *off* the Jersey WebApplicationInitializer because it
        // will try and register a ContextLoaderListener which we don't need
        servletContext.setInitParameter("contextConfigLocation", "<NONE>");
    }

    private static String findPath(ApplicationPath annotation) {
        // Jersey doesn't like to be the default servlet, so map to /* as a fallback
        if (annotation == null) {
            return "/*";
        }
        String path = annotation.value();
        return path.isEmpty() || path.equals("/") ? "/*" : path + "/*";
    }
}
