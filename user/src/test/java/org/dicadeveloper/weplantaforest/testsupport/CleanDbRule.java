package org.dicadeveloper.weplantaforest.testsupport;

import org.flywaydb.core.Flyway;
import org.junit.rules.ExternalResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

/**
 * Cleans (mysql) database between tests.
 */
@Component
@IntegrationTest
public class CleanDbRule extends ExternalResource {
	public final static String X = "";
	@Autowired
	private ApplicationContext _applicationContext;

	@Autowired(required = false)
	private Flyway _flyway;

	@Override
	protected void before() throws Throwable {
		if (_flyway != null) {
			_flyway.clean();
			_flyway.migrate();
		} else {
			// flyway is only enabled for mysql, but not for h2! But for
			// h2-memory u can wipe out db via:
			// "@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)"

		}
	}

}
