module.exports = {
  printWidth: 128,
  trailingComma: 'none',
  bracketSpacing: true,
  useTabs: false,
  tabWidth: 2,
  singleQuote: true,
  semi: false,
  overrides: [
    // { files: 'contracts/v1/**/*.sol', options: { 'compiler': '0.6.3' } },
    {
      files: '*.sol',
      options: {
        // tabWidth: 4,
        // useTabs: false,
        explicitTypes: 'always'
      }
    }
  ]
}
