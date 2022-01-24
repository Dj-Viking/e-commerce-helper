module.exports = async function() {
  return {
    testEnvironment: "node",
    // transform: {
    //   "^.+\\.tsx?$": "ts-jest",
    // },    
    collectCoverage: true,
    coverageReporters: ["json", "html"],
    moduleFileExtensions: ["ts", "js"],
    testMatch: ["**/?(*.)+(spec|test).js"],
    // need this module paths set to this to run tests in github actions workflow
    // otherwise some imports can't be resolved
    modulePaths: ["<rootDir>"],
    // testMatch: ["**/?(*.)+(spec|test).js"],
    // watchPathIgnorePatterns: [".+(spec|test).ts"]
  };
};