const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

/** @type {import("jest").Config} */
const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(css|less|scss|sass)$": "<rootDir>/__tests__/styleMock.js"
  },
  testMatch: ["<rootDir>/__tests__/**/*.(test|spec).(ts|tsx)"],
  collectCoverageFrom: [
    "<rootDir>/app/**/*.{ts,tsx}",
    "<rootDir>/components/**/*.{ts,tsx}",
    "<rootDir>/context/**/*.{ts,tsx}",
    "<rootDir>/lib/**/*.{ts,tsx}",
    "!<rootDir>/**/node_modules/**"
  ],
  coverageReporters: ["text", "lcov"]
};

module.exports = createJestConfig(customJestConfig);
