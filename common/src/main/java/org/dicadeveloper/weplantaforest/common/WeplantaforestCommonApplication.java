package org.dicadeveloper.weplantaforest.common;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.boot.orm.jpa.EntityScan;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;
import org.springframework.hateoas.config.EnableEntityLinks;

@SpringBootApplication
@EnableEntityLinks
@EntityScan(basePackageClasses = { WeplantaforestCommonApplication.class, Jsr310JpaConverters.class })
public class WeplantaforestCommonApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(WeplantaforestCommonApplication.class, args);
    }
}
