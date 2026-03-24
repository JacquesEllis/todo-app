import type { Config } from 'jest';

/**
 * Jest configuration for packages/frontend.
 * Uses ts-jest to transpile TypeScript and jsdom for browser APIs.
 */
const config: Config = {
  preset:          'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleNameMapper: {
    // Resolve workspace aliases the same way Vite does
    '^@todo-app/shared(.*)$': '<rootDir>/../shared/src$1',
    '^@todo-app/ui(.*)$':     '<rootDir>/../ui/src$1',
    // Stub CSS imports so Jest does not choke on them
    '\\.(css|less|scss|sass)$': '<rootDir>/src/__mocks__/fileMock.ts',
  },
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }],
  },
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
};

export default config;
