module.exports = {
    clearMocks: true,
    moduleNameMapper: {
        '^react$': '@bluecateng/jest-helpers/mock-react',
        '^react-dom$': '@bluecateng/jest-helpers/mock-react',
        '^react/jsx-runtime$': '@bluecateng/jest-helpers/mock-react',
        '\\.(png|jpg|gif|svg|ttf|woff2)$':
            '@bluecateng/jest-helpers/file-mapper',
        '\\.(less)$': '@bluecateng/jest-helpers/style-mapper',
    },
    setupFiles: ['<rootDir>/jest-helpers/setup-globals'],
    setupFilesAfterEnv: ['@bluecateng/jest-helpers/setup-enzyme'],
    transform: {
        '\\.[jt]sx?$': 'babel-jest',
        '\\.po$': '@bluecateng/l10n-jest',
    },
    transformIgnorePatterns: [
        'node_modules/(?!(lodash-es|@bluecat|@bluecateng)/)',
    ],
    collectCoverage: true,
    coverageReporters: ['text', 'html'],
    coveragePathIgnorePatterns: ['/dist/', '/node_modules/', '/jest-helpers/'],
    coverageThreshold: {
        global: {
            branches: 50,
            functions: 29,
            lines: 46,
            statements: 45,
        },
    },
};
