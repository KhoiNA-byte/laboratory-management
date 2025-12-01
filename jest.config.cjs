// jest.config.cjs
/** Jest config for a TypeScript + React project using ts-jest (CommonJS) */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom", // package name
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/__mocks__/fileMock.js"
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.cjs"],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.(ts|tsx|js|jsx)",
    "<rootDir>/src/**/*.(spec|test).(ts|tsx|js|jsx)"
  ],
  transformIgnorePatterns: ["/node_modules/"],
  testTimeout: 10000,
  verbose: true
};
