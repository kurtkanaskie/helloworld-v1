# Hello World

## Overview
Each proxy source code module is self contained with the actual Apigee Edge proxy, config files for Edge Management API calls (e.g. KVMs, target servers), swagger spec and tests.
The key components enabling continuous integration are:
* Jenkins - build engine
* Maven - builder
* Apickli - cucumber extension for RESTful API testing
* Cucumber - Behavior Driven Development
* JMeter - Performance testing

Basically, everything that Jenkins does using Maven and other tools can be done locally, either directly with the tool (e.g. jslint, cucumberjs) or via Maven commands. The sections below show how to do each.

Jenkins projects are set up to run using Maven and Maven runs via configurations in a pom file (pom.xml). Maven follows a phased approach to execute commands and generally the result of that execution is to create a "target" directory to hold the output ultimately results in loading the proxy into Apigee Edge. Some commonly used commands are:
* clean - remove the target directory
* copy-resources - copy the source files to the target applying any filtering or replacement
* package - copy the source files and bundle into zip file for deployment to Apigee
* install - copy, package and install into Apigee
* integration - run integration tests

Here is the tree structure, with a little pruning for brevity:
```
.
├── README.md
├── apiproxy
│   ├── helloworld-v1.xml
│   ├── policies
│   │   ├── AM-Set-Service-Unavailable-Error-Variables.xml
│   │   └── ...
│   ├── proxies
│   │   └── default.xml
│   ├── resources
│   │   └── jsc
│   │       ├── JS-set-target-url.js
│   │       └── ...
│   └── targets
│       └── default.xml
├── config.json
├── helloworld-v1-swagger.json
├── package.json
├── pom.xml
├── target
│   ├── apiproxy
│   │   └── ...
└── test
    ├── apickli
    │   ├── config
    │   │   └── config.json
    │   └── features
    │       ├── errorHandling.feature
    │       ├── health.feature
    │       ├── hmac.feature
    │       ├── step_definitions
    │       │   ├── errorHandling.js
    │       │   ├── factory.js
    │       │   ├── hmac.js
    │       │   ├── init.js
    │       │   └── target.js
    │       ├── support
    │       │   └── env.js
    │       ├── table.feature
    │       └── target.feature
    ├── hmacTools.js
    └── jmeter
        ├── helloworld.jmx
        └── helloworld_dev.csv
```

####Tests
To see what "tags" are in the tests for cucumberjs run `grep @ *.features` or `find . -name *.feature -exec grep @ {} \;`
```
@intg
    @invalidhmac
    @invalidclientid
    @invalid-clientid-for-resource
    @missingrequiredfields
    @missingrequiredfields
    @missingrequiredfields
    @missingrequiredfields
    @missingrequiredfields
    @foo
    @foobar
@health
    @get-ping
    @get-status
@hmac
    @hmac-get
    @hmac-post
    @hmac-put
    @hmac-delete
@table
@target
    @target
    @ensure-target
```

###Maven
####Jenkins Commands
The Jenkins build server runs Maven with this command for each of the feature branches. Note the use of `-Duser.name=yourname-`. That is so the build and deploy to Apigee creates a separate proxy with a separate basepath to allow independent feature development. Your proxy will show up with a name (e.g. helloworld-yourname-v1) and basepath (e.g. /helloworld/yourname-v1).

NOTE: The use of user.name option is important, if omitted, Maven will use your username from the system you are running on. If set to nothing (-Duser.name=) then you will be using the "standard" proxy.

```
mvn -P dev clean install -Duser.name=yourname- -Dtfs.changeset=${TFS_CHANGESET} -Dbuild.tag=${BUILD_TAG} -DtestType=@intg
```

For other environments (e.g. dev, qa, uat, prod) the user.name is left blank, so the build puts the proxy into the final form with the final basepath (e.g. helloworld-v1, /helloworld/v1).

```
mvn -P dev clean install -Duser.name= -Dtfs.changeset=${TFS_CHANGESET} -Dbuild.tag=${BUILD_TAG} -DtestType=@intg
```

The use of TFS_CHANGESET and BUILD_TAG enable TFS related information to be capture in the proxy description field. It relies on a special tag `BUILDINFO` in the proxy xml file (e.g. helloworld-v1.xml). Maven replacer plugin "replaces" that string with:
```
<replacement>
    <token>@BUILDINFO</token>
    <value>${tfs.changeset} ${build.tag} ===</value>
</replacement>
```

NOTE: If you get a strange error from Maven about replacement `named capturing group is missing trailing '}'` there is something wrong with your options or replacements settings.

In addition to "replacing" that string other Maven phases (e.g. process-resources) do some inline replacement to support the feature proxy.
The most important change is to the `test/apickli/config/config.json` file which changes the basepath for the proxy so the tests go to the correct feature proxy in Apigee.


##Local Install and Set Up
In each source directory there is a `package.json` file that holds the required node packages.

* Install node
* Install maven
* Install Apickli and cucumberjs
    * cd source directory
    * `npm install` (creates node_modules)
    * `npm install -g cucumberjs` (installs command line tools per OS (e.g. cucumberjs)


##Running Tests Locally
Often it is necessary to interate over tests for a feature development. Since Apickli/Cucumber tests are mostly text based, its easy to do this locally. 
Here are the steps:
1 Install your feature proxy to Apigee if you are creating a new feature, otherwise just get a copy of the exising proxy you are building tests for.
2 Run Maven to copy resources and "replace" things. 
    * `mvn -P dev clean process-resources  -Duser.name=yourname- `
3 `cd target/apickli/features` directory and run tests by tag or by feature file
    * cucumberjs test/apickli/features --tags @intg
    * cucumberjs errorHandling.feature

Alternatively, you can run the tests via Maven
* `mvn -P dev process-resources -Duser.name=yourname- exec:exec@integration -DtestType=@get-ping`

NOTE: the initial output from cucumber shows the proxy and basepath being used
```
    [yourname]$ cucumberjs test/apickli/features --tags @invalid-clientid-for-resource
==> helloworld api: [sage-dev.apigee.net, /helloworld/yourname-v1]
    @intg
    Feature: Error handling

      As an API consumer
      I want consistent and meaningful error responses
      So that I can handle the errors correctly

      @invalid-clientid-for-resource
      Scenario: GET with invalid clientId for resource
        Given I set clientId header to `invalidClientId`
        When I GET /ping
        Then response code should be 400
        And response header Content-Type should be application/json
        And response body path $.message should be missing or invalid clientId
```

##Other Miscellaneous Commands
####Install and Run Tests by tag as default username (branch helloworld-kurtv1)
* mvn -P dev install -DtestType=@health,@intg

####Install and Run Tests by tag as specified username (branch helloworld-kurt-v1)
* mvn -P dev clean install -DtestType=@health,@intg -Duser.name=yourname-

####Install and Run Tests by tag as no username (master)
* mvn -P dev clean install -DtestType=@health,@intg -Duser.name=

####Process-resources and Run Tests by tag
* mvn -P test process-resources -Duser.name=kurtmac-
* mvn -P test exec:exec@integration -DtestType=@health

###JMeter
jmeter -n -l output.txt -t test/jmeter/helloworld.jmx -DtestData=helloworld_dev.csv -DthreadNum=1 -DrampUpPeriodSecs=1 -DloopCount=-1 -Drecycle=false

###JSLint
* jslint apiproxy/resources/jsc
* mvn -P dev jshint:lint
* mvn -P dev jshint:lint@jslint

###Aplicki / Cucumber Standalone Tests
* cucumberjs test/apickli/features/ping.feature
* cucumberjs test/apickli/features --tags @health
* cucumberjs test/apickli/features --tags @intg
* cucumberjs test/apickli/features --tags @hmac
* cucumberjs test/apickli/features --tags @intg,@health,@hmac


####Diffing apiproxy directories
* diff -q --suppress-common-lines -r --side-by-side apiproxy-prev apiproxy -W 240
* diff --suppress-common-lines -r --side-by-side apiproxy-prev apiproxy -W 240
