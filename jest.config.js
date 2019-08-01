// eslint-disable-next-line import/no-commonjs
module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.(j|t)sx?$': 'ts-jest',
  },
  testRegex: '\\.test\\.(t|j)sx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!**/__tests__/**', '!**/__fixtures__/**'],
  coverageReporters: ['text', 'text-summary'],
};
