module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    testMatch: ['**/*.spec.ts'], // Match test files with this pattern
    // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Optional setup file
    collectCoverage: true, // Enable code coverage reporting
  };
  