package org.dicadeveloper.weplantaforest;

import org.glassfish.jersey.linking.DeclarativeLinkingFeature;
import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.stereotype.Component;

@Component
public class JerseyConfig extends ResourceConfig {

    public JerseyConfig() {
        register(DeclarativeLinkingFeature.class);
        packages("org.dicadeveloper.weplantaforest.endpoints");
    }

}
