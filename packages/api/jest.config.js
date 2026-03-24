module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.[jt]s$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@todo-app/shared$': '<rootDir>/../shared/src/index.js',
  },
};
