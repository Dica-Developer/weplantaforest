package org.dicadeveloper.weplantaforest.admin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.boot.orm.jpa.EntityScan;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;
import org.springframework.hateoas.config.EnableEntityLinks;

@SpringBootApplication
@EnableEntityLinks
@EntityScan(basePackageClasses = { WeplantaforestAdminApplication.class, Jsr310JpaConverters.class })
@ComponentScan(basePackages = {"org.dicadeveloper.weplantaforest.*"})
@EnableCaching
public class WeplantaforestAdminApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(WeplantaforestAdminApplication.class, args);
    }
}
