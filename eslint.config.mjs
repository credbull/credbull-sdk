import { includeIgnoreFile } from '@eslint/compat';
import pluginJs from '@eslint/js';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';

// Resolve the path to .gitignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

// TODO - fix Warning: React version not specified in eslint-plugin-react settings.
// See https://github.com/jsx-eslint/eslint-plugin-react#configuration .

/** @type {import('eslint').Linter.Config[]} */
export default [
  includeIgnoreFile(gitignorePath), // Include .gitignore patterns
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettier, // Include Prettier to disable conflicting rules
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      'prettier/prettier': 'error', // Treat Prettier issues as ESLint errors
    },
  },
];
