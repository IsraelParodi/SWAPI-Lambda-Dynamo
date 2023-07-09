module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest",
    "^.+\\.tsx?$": "babel-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  moduleDirectories: ["node_modules", "<rootDir>/src", "src"],
  moduleNameMapper: {
    "#(.*)": "<rootDir>/node_modules/$1",
    "@libs/(.*)": "<rootDir>",
    "@functions/(.*)": "<rootDir>",
  },
  modulePaths: ["<rootDir>/src", "<rootDir>/node_modules"],
};
