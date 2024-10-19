# We Plant A Forest

[![Join the chat at https://gitter.im/Dica-Developer/weplantaforest](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/Dica-Developer/weplantaforest?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Open Issues](http://img.shields.io/github/issues/Dica-Developer/weplantaforest.svg?style=flat-square&label=Open%20Issues)](https://github.com/Dica-Developer/weplantaforest/issues)
[![Build Status](http://img.shields.io/travis/Dica-Developer/weplantaforest/master.svg?style=flat-square&label=Travis%20CI)](https://travis-ci.org/Dica-Developer/weplantaforest)
[![Coverage Status](http://img.shields.io/coveralls/Dica-Developer/weplantaforest/master.svg?style=flat-square&label=Test%20Coverage)](https://coveralls.io/r/Dica-Developer/weplantaforest?branch=master)
[![WATCHING YOUR NODE.JS DEPENDENCIES.](https://david-dm.org/Dica-Developer/weplantaforest.svg)](https://david-dm.org/)


### Dev Requirements

* Java 11
* Eclipse
* Gradle (./gradlew)
* NodeJs (https://github.com/creationix/nvm)

### Build System
We use *Gradle* as our build system. All commands listed here follow the pattern ```gradle <task>'```. 
If *Gradle* is not installed on your system you can use ```sh gradlew <task>``` instead.

##### Useful commands
* ```gradlew tasks``` - list all tasks
* ```gradlew eclipse``` - setup eclipse files
* ```gradlew run``` - start server for UI development
* ```gradlew bootRun``` - start server for development (refreshes static resources)
* ```gradlew test``` - execute unit tests (open report with ```open build/reports/tests/index.html```
 * for executing single test add ```-Dtest.single=ExampleMainTest```
 * for running tests on mysql add ```-Pmysql``` 
* ```gradlew clean``` - clean the project

### IDE Configuration
Setup with the Gradle Integration for Eclipse plugin.

Setup by using the gradle eclipse plugin

Select "Import..." -> "Gradle Project" then build the model and import the plugins you need.

Additional stuff:

Make sure you have the following classes included for static import:
* lombok
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

### Starting the backend and the UI

```
./gradlew user:bootRun
./gradlew article-manager:bootRun
ui/node_modules/.bin/http-server --cors ui/client-react/
cd ui; webpack -w
```
Now you can open a browser window with:

```
open http://localhost:8080
```

### Troubleshooting
P: I get an error while starting a gradle task.
  `Could not open terminal for stdout: could not get termcap entry`

A: Paste following command in current before executing gradle
  `export GRADLE_OPTS=-Dorg.gradle.native=false`


## Run the app with ssr and dockerized(local)

### Build the frontend app 
 cd ui2022 --> docker build -f Dockerfile-node -t ipat-test-frontend-node .

### Build Nginx

 cd ui2022 --> docker build -f Dockerfile-nginx -t ipat-test-nginx .

### Build the backend app(same image for all 3 backend modules)

from root: docker build -f Dockerfile-api -t ipat-test-api .

### Build Mysql image

docker build -f Dockerfile-mysql -t ipat-test-mysql .

### Run the app

docker-compose up



# Deploy/Build staging

- build node container:
- go to /ui2022
docker build -f Dockerfile-node-staging --no-cache -t ipat-staging-frontend-node .

- save as tar:
docker save -o ipat-staging-frontend-node.tar  ipat-staging-frontend-node

- scp to server
scp ipat-staging-frontend-node.tar ipat@212.122.43.153:/home/ipat/ipat-staging

- ssh to server- cd into ipat-staging

- load into docker 
docker load -i ipat-staging-frontend-node.tar 

====================================================

- build nginx container
- go to /ui2022
docker build --no-cache -f Dockerfile-nginx-staging -t ipat-staging-nginx .

- save as tar
docker save -o ipat-staging-nginx.tar ipat-staging-nginx

- scp to server
scp ipat-staging-nginx.tar ipat@212.122.43.153:/home/ipat/ipat-staging

- ssh to server- cd into ipat-staging

- load into docker 
docker load -i ipat-staging-nginxe.tar 

====================================================
IMPORTANT: set spring.profiles.active in application.properties in every module(user,admin,article-manager) to staging,staging-secret

- build api container
docker build -f Dockerfile-api -t ipat-staging-api .

- save as tar
docker save -o ipat-staging-api.tar ipat-staging-api

- scp to server
scp ipat-staging-api.tar ipat@212.122.43.153:/home/ipat/ipat-staging

- ssh to server- cd into ipat-staging

- load into docker 
docker load -i ipat-staging-api.tar 