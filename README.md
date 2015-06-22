# We Plant A Forest

[![Join the chat at https://gitter.im/Dica-Developer/weplantaforest](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/Dica-Developer/weplantaforest?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Open Issues](http://img.shields.io/github/issues/Dica-Developer/weplantaforest.svg?style=flat-square&label=Open%20Issues)](https://github.com/Dica-Developer/weplantaforest/issues)
[![Build Status](http://img.shields.io/travis/Dica-Developer/weplantaforest/master.svg?style=flat-square&label=Travis%20CI)](https://travis-ci.org/Dica-Developer/weplantaforest)
[![Coverage Status](http://img.shields.io/coveralls/Dica-Developer/weplantaforest/master.svg?style=flat-square&label=Test%20Coverage)](https://coveralls.io/r/Dica-Developer/weplantaforest?branch=master)

### Requirements

* Java 8
* Eclipse Luna / 4.4 (for 4.3.2 see https://wiki.eclipse.org/JDT/Eclipse_Java_8_Support_For_Kepler)

### Build System
We use *Gradle* as our build system. All commands listed here follow the pattern ```gradle <task>'```. That requires *Gradle* to be installed on your system (e.g. ```brew install gradle```). 

How ever if *Gradle* is not installed on your system you can use ```sh gradlew <task>``` instead.

##### Useful commands
* ```gradle tasks``` - list all tasks
* ```gradle eclipse``` - setup eclipse files
* ```gradle run``` - start server
* ```gradle test``` - execute unit tests (open report with ```open build/reports/tests/index.html```
 * for executing single test add ```-Dtest.single=ExampleMainTest```
 * for running tests on mysql add ```-Pmysql``` 
* ```gradle clean``` - clean the project

### IDE Configuration
Setup with the Gradle Integration for Eclipse plugin.

Setup by using the gradle eclipse plugin

Select "Import..." -> "Gradle Project" then build the model and import the plugins you need.

Additional stuff:

Make sure you have the following classes included for static import:
* org.assertj.core.api.Assertions
* org.mockito.Matchers
* com.jayway.restassured.RestAssured

(In Eclipse under Preferences/Java/Editor/Content Assist/Favorites)



### Testing and Developing with MySql
* Create fresh databases:
 * ```drop database weplantaforest; create database weplantaforest;```
 * ```drop database weplantaforest_test; create database weplantaforest_test;```
* Run tests with MySql from Gradle by adding the flag ```-Pmysql```, e.g. ```gradle  test -Pmysql ```
* Run tests with MySql from Eclipse by either:
 * Change existing annotation ```@IntegrationTest({ "spring.profiles.active=test" })``` into ```@IntegrationTest({ "spring.profiles.active=test,mysql-test" })```
 * OR switch the included profiles in ```application-test.properties```
* Change existing MySql Schema (managed by Flyway)
 * Add to the latest (unreleased) ```src/main/resources/db/migration/V*.sql``` script
 * OR create a new script, e.g. ```src/main/resources/db/migration/V1_2__descriptionOfMyChange.sql```
