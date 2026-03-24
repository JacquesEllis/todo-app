import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: [],
  setupFilesAfterFramework: undefined,
  setupFiles: ['./src/setupTests.ts'],
  moduleNameMapper: {
    // Static assets
    '\\.(jpg|jpeg|png|gif|svg|css)$': '<rootDir>/src/__mocks__/fileMock.ts',
    // Workspace package aliases
    '^@todo-app/ui(.*)$': '<rootDir>/../ui/src$1',
    '^@todo-app/shared(.*)$': '<rootDir>/../shared/src$1',
    // Firebase mocks
    '^../../firebase$': '<rootDir>/src/__mocks__/firebase.ts',
    '^../firebase$': '<rootDir>/src/__mocks__/firebase.ts',
    '^./firebase$': '<rootDir>/src/__mocks__/firebase.ts',
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: { jsx: 'react-jsx' } }],
    '^.+\\.(js|jsx)$': ['babel-jest', { presets: ['@babel/preset-react', '@babel/preset-env'] }],
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@todo-app)/)',
  ],
  testMatch: ['**/__tests__/**/*.(test|spec).(ts|tsx|js|jsx)', '**/?(*.)+(test|spec).(ts|tsx|js|jsx)'],
};

export default config;
