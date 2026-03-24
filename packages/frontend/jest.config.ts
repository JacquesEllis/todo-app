import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['./src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg|css)$': '<rootDir>/src/__mocks__/fileMock.ts',
    '^@todo-app/ui(.*)$': '<rootDir>/../ui/src$1',
    '^@todo-app/shared(.*)$': '<rootDir>/../shared/src$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: { jsx: 'react-jsx' } }],
    '^.+\\.(js|jsx)$': [
      'babel-jest',
      { presets: ['@babel/preset-react', '@babel/preset-env'] },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!(@todo-app)/)'],
  testMatch: [
    '**/__tests__/**/*.(ts|tsx|js|jsx)',
    '**/?(*.)+(test|spec).(ts|tsx|js|jsx)',
  ],
};

export default config;
