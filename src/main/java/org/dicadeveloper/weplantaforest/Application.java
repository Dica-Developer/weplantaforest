package org.dicadeveloper.weplantaforest;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.boot.orm.jpa.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.hateoas.config.EnableEntityLinks;

@ComponentScan
@SpringBootApplication
@EnableEntityLinks
@EnableAutoConfiguration
@EnableJpaRepositories(basePackages = { "org.dicadeveloper.weplantaforest.persist", "org.dicadeveloper.weplantaforest.reports.co2", "org.dicadeveloper.weplantaforest.projects" })
@Import({ DataSourceConfiguration.class, HATEOASConfiguration.class })
@EntityScan({ "org.dicadeveloper.weplantaforest.persist", "org.dicadeveloper.weplantaforest.projects" })
public class Application extends SpringBootServletInitializer {
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(Application.class);
    }

    public static void main(String[] args) {
        new Application().configure(new SpringApplicationBuilder(Application.class)).run(args);
    }
}
