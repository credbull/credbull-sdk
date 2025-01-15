/* eslint-disable */
// TODO - put cjs back in.  but currently failing at module.exports
export default {
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 120,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrder: ['<THIRD_PARTY_MODULES>', '^@/', '^../(.*)$', '^[./]'],
  importOrderParserPlugins: ['typescript', 'decorators-legacy'],
};
