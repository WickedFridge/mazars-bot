module.exports = {
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [
        '**/*.js',
        '!**/node_modules/**',
        '!**/scripts/**',
        '!./config/*',
    ],
    coverageReporters: ['text-summary'],
    coverageThreshold: {
        global: {
            // lines: 20,
        },
    },
    reporters: [
        'default',
        ['./node_modules/jest-html-reporter', {
            pageTitle: 'Test Report',
            includeFailureMsg: true,
        }],
        'jest-junit',
    ],
    testMatch: [
        '**/tests/**/?(*.)+(unit|integ).(test).js?(x)',
    ],
};
