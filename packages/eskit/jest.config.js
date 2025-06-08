module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '\\.[j]sx?$': 'babel-jest'
  },
  testRegex: '(/__test__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'jsdom'
  // collectCoverageFrom: ['src/**/!(*.d).{js,ts}'],
  // reporters: [
  //   'default',
  //   [
  //     '../../node_modules/jest-html-reporter',
  //     {
  //       pageTitle: 'Util Report',
  //       includeFailureMsg: true
  //     }
  //   ]
  // ]
}
