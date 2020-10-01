const setupUtilities = require("./setup-utilities");
const maxBrowserInstances = process.env.MAX_INSTANCES || setupUtilities.getParam(1, "--params.maxInstances", false);
const useHeadlessBrowser = process.env.HEADLESS_BROWSER || setupUtilities.toBoolean(setupUtilities.getParam(true, "--params.headlessBrowser", false));
const chromeArgs =
    ["--start-maximized"];
const chromeHeadlessArgs =
    ["--headless",
    "--start-maximized",
    "--disable-gpu",
    "--window-size=1280,900",
    "--disable-dev-shm-usage",
    "--no-sandbox",
    "--acceptInsecureCerts",
    "--ignore-certificate-errors",
    "--remote-debugging-port=9222",
    "--disable-blink-features=BlockCredentialedSubresources",
    "--disable-web-security"];

const chromeOptions = {
    args: useHeadlessBrowser ? chromeHeadlessArgs : chromeArgs,
    // Set download path and avoid prompting for download even though
    // this is already the default on Chrome but for completeness
    prefs: {
        "download": {
            "prompt_for_download": false,
            "directory_upgrade": true,
            "default_directory": "Downloads"
        }
    }
};
const configSetup = {
    restartBrowserBetweenTests: false,
    SELENIUM_PROMISE_MANAGER: false,
    multiCapabilities: [{
        browserName: "chrome",
        "chromeOptions": chromeOptions,
        shardTestFiles: "true",
        maxInstances: maxBrowserInstances,
        acceptInsecureCerts: true
    }],
    allScriptsTimeout: 900000,
    suites: {
        smoke_tests: "./e2e/test-suites/smoke-suite/**/*.e2e-spec.ts"
    },
    capabilities: {
        browserName: "chrome",
        recordVideo: false,
        chromeOptions: chromeOptions
    },
    params: {
        maxInstances: 5,
        maxSessions: 5,
        propertyId: process.env.PROPERTY_ID || "62787",
        propertyMinimumStayDays: process.env.PROPERTY_MINIMUM_STAY_DAYS || "3"
    },
    baseUrl: process.env.BASE_URL || "https://demodemo.holidayfuture.com/",
    framework: "jasmine2",
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 300000,
        print: function () {
        }
    }
};

module.exports = configSetup;
