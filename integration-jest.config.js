module.exports = {
    testRegex: '(/integration-tests/.*test.*)',
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest'
    },
    preset: 'jest-puppeteer',
    setupFilesAfterEnv: ['<rootDir>/configure-allure-reporter.js']
}

// '^.+\\.(js|jsx|ts|tsx)$': isEjecting
//     ? '<rootDir>/node_modules/babel-jest'
//     : resolve('config/jest/babelTransform.js'),
//     '^.+\\.css$': resolve('config/jest/cssTransform.js'),
//     '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': resolve(
//     'config/jest/fileTransform.js'
