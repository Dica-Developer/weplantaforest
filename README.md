# We Plant A Forest

[![Join the chat at https://gitter.im/Dica-Developer/weplantaforest](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/Dica-Developer/weplantaforest?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

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