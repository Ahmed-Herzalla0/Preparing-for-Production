const js = require('@eslint/js');

module.exports = [
  // Ignore build and dependency folders so CLI linting focuses on source files
  { ignores: ["dist/**", "node_modules/**", ".parcel-cache/**", "images/**"] },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        document: 'readonly',
        window: 'readonly',
        console: 'readonly',
        // CommonJS globals for config files
        require: 'readonly',
        module: 'readonly',
        exports: 'readonly',
        process: 'readonly'
      }
    },
    rules: {
      'no-var': 'error',
      'no-unused-vars': 'error',
      semi: ['error', 'always'],
      eqeqeq: ['error', 'always'],
      curly: 'error',
      'no-console': 'warn'
    }
  },
  {
    files: ['test/**/*.js'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        before: 'readonly',
        after: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly'
      }
    }
  },
  {
    files: ['cypress/**/*.js'],
    languageOptions: {
      globals: {
        cy: 'readonly',
        Cypress: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        before: 'readonly',
        after: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        context: 'readonly'
      }
    }
  }
  ,
  {
    files: ['cypress.config.js'],
    rules: {
      'no-unused-vars': 'off'
    }
  }
];
