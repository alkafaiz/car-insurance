module.exports = {
  roots: ["<rootDir>"],
  moduleNameMapper: {
    "\\.(css|scss|pcss)$": "<rootDir>/__mocks__/CSSStub.js"
  },
  setupFilesAfterEnv: ["<rootDir>/testSetup.js"],
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node",
    "css",
    "scss"
  ],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,tsx,js,jsx}",
    "!/node_modules/",
    "!src/serviceWorker.ts",
    "!src/index.js"
  ]
};
