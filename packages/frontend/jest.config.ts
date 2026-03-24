import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // Run @testing-library/jest-dom matchers
  setupFilesAfterFramework: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    // Static assets
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/__mocks__/fileMock.ts',
    '\\.css$': '<rootDir>/src/__mocks__/fileMock.ts',
    // Monorepo workspace aliases → source files
    '^@todo-app/ui$': '<rootDir>/../ui/src/index.js',
    '^@todo-app/ui/(.*)$': '<rootDir>/../ui/src/$1',
    '^@todo-app/shared$': '<rootDir>/../shared/src/index.js',
    '^@todo-app/shared/(.*)$': '<rootDir>/../shared/src/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: { jsx: 'react-jsx' } }],
    '^.+\\.(js|jsx)$': [
      'babel-jest',
      { presets: ['@babel/preset-react', '@babel/preset-env'] },
    ],
  },
  // Allow transformation of monorepo packages
  transformIgnorePatterns: ['node_modules/(?!(@todo-app)/)'],
  testMatch: [
    '**/__tests__/**/*.(ts|tsx|js|jsx)',
    '**/?(*.)+(test|spec).(ts|tsx|js|jsx)',
  ],
};

export default config;
