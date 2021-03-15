module.exports = {
  roots: ["<rootDir>"],
  moduleNameMapper: {
    "\\.(css|scss|pcss)$": "<rootDir>/__mocks__/CSSStub.js"
  },
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node",
    "css",
    "scss"
  ]
};
