module.exports = {
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
    '\\.[j]sx?$': 'babel-jest'
  },
  testRegex: '(/__test__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!src/**/index.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  testEnvironment: 'jsdom'
  // reporters: [
  //   'default',
  //   [
  //     '../../node_modules/jest-html-reporter',
  //     {
  //       pageTitle: 'Dom Util Report',
  //       includeFailureMsg: true
  //     }
  //   ]
  // ]
}
