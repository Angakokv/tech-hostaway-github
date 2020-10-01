# Description
1. **docs/Answers.pdf** - contains answers щn questions.
2. **e2e/test-suites/smoke-suite/ui-task** - contains automated tests.

# How to execute on local
1. Install latest Google Chrome browser. For example 85.0.4183.121 version.
2. Install stable Node.js. For example 12.18.4 version.
3. Clone repository **XXX**.
4. Go to the root folder of cloned repository.
5. Open `package.json` and replace value "85.0.4183.83" by your Google Chrome version.
6. Run command `npm install` from command line.
7. Run command `protractor protractor.ci.conf.js --params --params.headlessBrowser=false` from command line to execute all tests.

You will see tests execution in command line with logs.

# How to build test report
1. After tests execution run command `npm run e2e-generate-allure-report` from command line.
2. Run command `npm run e2e-generate-allure-report` from command line.

Test report will be opened in default browser. 
