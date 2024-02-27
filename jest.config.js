module.exports = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
    },
    moduleNameMapper: {
      '^@components/(.*)$': '<rootDir>/components/$1',
      '\\.module\\.scss$': 'identity-obj-proxy',
    },
    testEnvironment: 'jsdom',
  };
  