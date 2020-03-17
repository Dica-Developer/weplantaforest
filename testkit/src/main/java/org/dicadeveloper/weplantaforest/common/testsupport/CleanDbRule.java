package org.dicadeveloper.weplantaforest.common.testsupport;

import org.flywaydb.core.Flyway;
import org.junit.rules.ExternalResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.stereotype.Component;

/**
 * Cleans (mysql) database between tests.
 */
@Component
@SpringBootTest
public class CleanDbRule extends ExternalResource {

    @Autowired(required = false)
    private Flyway flyway;

    @Override
    protected void before() throws Throwable {
        if (flyway != null) {
            flyway.clean();
            flyway.migrate();
        } else {
            // flyway is only enabled for mysql, but not for h2! But for
            // h2-memory u can wipe out db via:
            // "@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)"

        }
    }

}
