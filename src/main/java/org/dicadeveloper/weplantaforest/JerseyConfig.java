package org.dicadeveloper.weplantaforest;

import org.codehaus.jackson.jaxrs.JacksonJsonProvider;
import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.stereotype.Component;

@Component
public class JerseyConfig extends ResourceConfig {

    public JerseyConfig() {
        register(JacksonJsonProvider.class);
        packages("org.dicadeveloper.weplantaforest.endpoints");
    }
}
