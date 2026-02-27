export default [
  {
    files: ["**/*.js"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",

      // ✅ Tell ESLint this is a Node.js project
      globals: {
        process: "readonly",
        console: "readonly",
        __dirname: "readonly",
        module: "readonly",
        require: "readonly",
      },
    },

    rules: {
      /*
      ========== STYLE / FORMAT (like ruff format) ==========
      */
      quotes: ["error", "double"],
      semi: ["error", "always"],
      indent: ["error", 2],
      "comma-dangle": ["error", "always-multiline"],

      /*
      ========== BUG PREVENTION (ruff F + B rules) ==========
      */
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-undef": "error",
      "no-constant-condition": "warn",
      "no-empty": "warn",

      /*
      ========== MODERN JS (ruff UP rules) ==========
      */
      "prefer-const": "warn",
      "no-var": "error",
      "arrow-body-style": ["warn", "as-needed"],

      /*
      ========== IMPORT ORDERING (ruff isort equivalent) ==========
      */
      "sort-imports": [
        "warn",
        {
          ignoreDeclarationSort: false,
          ignoreCase: true,
        },
      ],

      /*
      ========== GENERAL CLEANLINESS ==========
      */
      "no-console": "off",
    },
  },
];
