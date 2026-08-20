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
      // Rule "n/no-missing-import" needs the "n" plugin registered
      // explicitly - flat config does not auto-resolve rule prefixes
      // the way legacy .eslintrc did. eslint-plugin-n ships inside the
      // Super-Linter image, so this is safe to import directly.
      n: nodePlugin,
    },
    rules: {
      "no-undef": "warn",
      "n/no-missing-import": "warn",
    },
  },

  // JSON support via eslint-plugin-jsonc, which ships inside the
  // Super-Linter image (unlike @eslint/json, which is not bundled and
  // breaks ESM resolution for JAVASCRIPT_ES/JSON/TYPESCRIPT_ES alike,
  // since Super-Linter loads this single config file for all three).
  //
  // "flat/recommended-with-json" is scoped internally to *.json /
  // **/*.json only — .jsonc and .json5 are left untouched
  ...jsonc.configs["flat/recommended-with-json"],
];
