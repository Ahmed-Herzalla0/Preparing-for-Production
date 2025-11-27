import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        document: "readonly",
        window: "readonly",
        console: "readonly",
      },
    },
    rules: {
      // Disallow var, use let or const instead
      "no-var": "error",
      // Disallow unused variables
      "no-unused-vars": "error",
      // Require semicolons
      semi: ["error", "always"],
      // Require strict equality (=== and !==)
      eqeqeq: ["error", "always"],
      // Require curly braces for all control statements
      curly: "error",
      // Disallow console statements in production
      "no-console": "warn",
    },
  },
  // Test files configuration
  {
    files: ["test/**/*.js"],
    languageOptions: {
      globals: {
        describe: "readonly",
        it: "readonly",
        before: "readonly",
        after: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
      },
    },
  },
  // Cypress test files configuration
  {
    files: ["cypress/**/*.js"],
    languageOptions: {
      globals: {
        cy: "readonly",
        Cypress: "readonly",
        describe: "readonly",
        it: "readonly",
        before: "readonly",
        after: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        context: "readonly",
      },
    },
  },
];
