package org.dicadeveloper.weplantaforest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.boot.orm.jpa.EntityScan;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;
import org.springframework.hateoas.config.EnableEntityLinks;

@SpringBootApplication
@EnableEntityLinks
@EntityScan(basePackageClasses = { WeplantaforestApplication.class, Jsr310JpaConverters.class })
@EnableCaching
public class WeplantaforestApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(WeplantaforestApplication.class, args);      
    }
    
    @Bean
    public ReloadableResourceBundleMessageSource messageSource() {
        ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
        messageSource.setBasenames("classpath:messages/mail-messages", "classpath:messages/validation-messages");
        return messageSource;
    }
}
