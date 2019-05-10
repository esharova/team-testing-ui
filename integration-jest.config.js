module.exports = {
    testRegex: '(/integration-tests/.*test.*)',
    transform: 'babel-jest',
    preset: 'jest-puppeteer',
    setupFilesAfterEnv: ['<rootDir>/configure-allure-reporter.js']
}
