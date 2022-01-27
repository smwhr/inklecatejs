module.exports = {
  collectCoverage: false,
  collectCoverageFrom: [
    "src/compiler/**/*.ts",
  ],
  coverageDirectory: "coverage",
  coverageReporters: [
    "json",
    "text-summary",
    "html"
  ],
  testEnvironment: "node",
  testMatch: [
    "**/tests/**/*.(spec|test).ts"
  ],
  testPathIgnorePatterns: [
    "<rootDir>/tests/"
  ],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
};
