// For a detailed explanation regarding each configuration property, visit:
// * https://jestjs.io/docs/en/configuration.html
// * https://kulshekhar.github.io/ts-jest/user/config/

export default {
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  roots: ['src'],
  collectCoverageFrom: ['src/**/{!(index|testUtils),}.{ts,tsx}']
};
