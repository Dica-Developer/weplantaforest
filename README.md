# We Plant A Forest

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
* ```gradle clean``` - clean the project