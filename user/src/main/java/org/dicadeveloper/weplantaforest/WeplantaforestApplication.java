package org.dicadeveloper.weplantaforest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.boot.orm.jpa.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;
import org.springframework.hateoas.config.EnableEntityLinks;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
@EnableEntityLinks
@EntityScan(basePackageClasses = { WeplantaforestApplication.class, Jsr310JpaConverters.class })
public class WeplantaforestApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(WeplantaforestApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurerAdapter() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("http://localhost:8080");
				registry.addMapping("/**/**").allowedOrigins("http://localhost:8080");
			}
		};
	}
}
