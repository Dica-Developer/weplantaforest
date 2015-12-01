package org.dicadeveloper.weplantaforest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.boot.orm.jpa.EntityScan;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;
import org.springframework.hateoas.config.EnableEntityLinks;

@SpringBootApplication
@EnableEntityLinks
@EntityScan(basePackageClasses = { WeplantaforestApplication.class, Jsr310JpaConverters.class })
public class WeplantaforestApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(WeplantaforestApplication.class, args);
	}
}
