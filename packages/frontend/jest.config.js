module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
    '^@todo-app/shared$': '<rootDir>/../shared/src/index.js',
    '^@todo-app/ui$':     '<rootDir>/../ui/src/index.js',
    '^@todo-app/ui/(.*)$': '<rootDir>/../ui/src/$1',
  },
  setupFilesAfterFramework: [],
};
