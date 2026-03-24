import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: [],
  setupFilesAfterFramework: undefined,
  setupFilesAfterFramework: undefined,
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': ['babel-jest', { presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'] }],
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/fileMock.ts',
    '@todo-app/ui': '<rootDir>/../ui/src/index.js',
    '@todo-app/shared': '<rootDir>/../shared/src/index.js',
  },
  setupFilesAfterFramework: ['@testing-library/jest-dom'],
};

export default config;