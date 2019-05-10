const Allure = require('allure-js-commons');
const path = require('path');
const mkdirp = require('mkdirp');
const stripAnsi = require('strip-ansi');
const Reporter = require('./allure-reporter').Reporter;

function registerAllureReporter () {
    /**
     * jasmine reporter does not support async.
     * So we store the screenshot promise and wait for it before each test
     */

    let screenshotPromise = Promise.resolve();

    const takeScreenshot = (screenshotName) => {
        mkdirp.sync('allure-results');
        const screenshotPath = path.join(__dirname, 'allure-results', `${screenshotName}.png`);
        return page.screenshot({ path: screenshotPath });
    }

    afterAll(() => screenshotPromise);
    beforeEach(() => screenshotPromise);

    /**
     * Take a screenshot on Failed test.
     * Jest standard reporters run in a separate process so they don't have
     * access to the page instance. Using jasmine reporter allows us to
     * have access to the test result, test name and page instance at the same time.
     */
    const allure = new Allure();
    global.reporter = new Reporter(allure);
    class AllureReporter {

        constructor(allure) {
            this.allure = allure;
            this.screenshotPromise = Promise.resolve();
        }

        suiteStarted(suite) {
            this.allure.startSuite(suite.fullName);
        }

        async suiteDone() {
            this.allure.endSuite();
        };

        specStarted(spec) {
            this.allure.startCase(spec.description);
        };

        specDone(spec) {
            let error;
            if (spec.status === "pending") {
                error = { message: spec.pendingReason };
            }
            if (spec.status === "disabled") {
                error = { message: "This test was disabled" };
            }
            const failure = spec.failedExpectations && spec.failedExpectations.length ? spec.failedExpectations[0] : undefined;
            if (failure) {
                error = {
                    message: stripAnsi(failure.message),
                    stack: stripAnsi(failure.stack)
                };
            }
            const attachment = new Attachment(spec.description, `${spec.description}.png`, 55000, 'png');
            this.allure.getCurrentTest().addAttachment(attachment);
            this.allure.endCase(spec.status, error);
            // screenshotPromise = takeScreenshot(spec.description);
            return screenshotPromise;
        }
    }
    jasmine.getEnv().addReporter(new AllureReporter(allure));
};

function Attachment(title, source, size, mime) {
    this.title = title;
    this.type = mime;
    this.size = size;
    this.source = source;
}

Attachment.prototype.toXML = function () {
    return {
        '@': {
            title: this.title,
            source: this.source,
            type: this.type,
            size: this.size
        }
    };
};

module.exports = { registerAllureReporter };
