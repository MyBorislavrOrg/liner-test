// eslint.config.mjs
import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import nodePlugin from "eslint-plugin-n";
import jsonc from "eslint-plugin-jsonc";

export default [
  {
    ignores: [
      "dist/**",
    ]
  },

  js.configs.recommended,

  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      "@typescript-eslint": tseslint,
      n: nodePlugin,
    },
    rules: {
      "no-undef": "warn",
      "n/no-missing-import": "warn",
    },
  },

  ...jsonc.configs["flat/recommended-with-json"].map((config) => ({
    ...config,
    files: ["**/*.json"],
  })),

  ...jsonc.configs["flat/recommended-with-jsonc"].map((config) => ({
    ...config,
    files: ["**/*.jsonc"],
  })),

  ...jsonc.configs["flat/recommended-with-json5"].map((config) => ({
    ...config,
    files: ["**/*.json5"],
  })),

  {
    files: ["**/*.jsonc", "**/*.json5"],
    rules: {
      "jsonc/no-comments": "off",
      "jsonc/quote-props": "off",
      "jsonc/comma-dangle": "off",
    },
  },

];
