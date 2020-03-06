package org.dicadeveloper.weplantaforest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EntityScan(basePackageClasses = { WeplantaforestApplication.class, Jsr310JpaConverters.class })
@EnableCaching
@EnableScheduling
public class WeplantaforestApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(WeplantaforestApplication.class, args);
    }

    @Bean
    public ReloadableResourceBundleMessageSource messageSource() {
        ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
        messageSource.setBasenames("classpath:messages/mail-messages", "classpath:messages/validation-messages", "classpath:messages/certificate", "classpath:messages/gift");
        return messageSource;
    }
}
