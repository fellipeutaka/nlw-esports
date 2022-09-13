module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:react/recommended", "standard", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier", "import-helpers"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    quotes: ["warn", "double"],
    semi: ["warn", "always"],
    "arrow-parens": ["warn", "always"],
    "no-unused-vars": "warn",
    "react/react-in-jsx-scope": "off",
    "import-helpers/order-imports": [
      "warn",
      {
        newlinesBetween: "always",
        groups: [
          "/^react/",
          "module",
          [
            "/^@components/",
            "/^@screens/",
            "/^@routes/",
            "/^@types/",
            "/^@contexts/",
            "/^@hooks/",
            "/^@theme/",
            "/^@utils/",
            "/^@lib/",
            "/^@assets/",
          ],
          ["parent", "sibling", "index"],
        ],
        alphabetize: { order: "asc", ignoreCase: true },
      },
    ],
  },
  globals: {
    JSX: "writable",
  },
};
