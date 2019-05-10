module.exports = {
    testRegex: '(/integration-tests/.*test.*)',
    preset: 'jest-puppeteer',
    setupFilesAfterEnv: ['<rootDir>/configure-allure-reporter.js']
}
