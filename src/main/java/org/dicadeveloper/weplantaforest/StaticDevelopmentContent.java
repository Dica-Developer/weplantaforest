package org.dicadeveloper.weplantaforest;

import java.io.File;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class StaticDevelopmentContent extends WebMvcConfigurerAdapter {

    private Log log = LogFactory.getLog(StaticDevelopmentContent.class);

    @Value("${static.path}")
    private String _staticPath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        if (_staticPath != null && !_staticPath.isEmpty()) {
            String absoluteStaticPath = (new File(_staticPath)).getAbsolutePath() + "/";
            log.info("Loading static resources also from: " + absoluteStaticPath);
            registry.addResourceHandler("/**").addResourceLocations("file:" + absoluteStaticPath);
        }
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("redirect:/index.html");
    }
}
