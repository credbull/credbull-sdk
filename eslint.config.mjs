import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

// TODO - fix Warning: React version not specified in eslint-plugin-react settings.
// See https://github.com/jsx-eslint/eslint-plugin-react#configuration .

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  prettier, // Add Prettier to disable conflicting rules
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      "prettier/prettier": "error", // Treat Prettier issues as ESLint errors
    },
  },
];
