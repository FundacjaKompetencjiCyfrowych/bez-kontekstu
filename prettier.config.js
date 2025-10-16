/** @type {import('prettier').Config} */
const config = {
  // Basic formatting
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  tabWidth: 2,
  useTabs: false,
  printWidth: 140,

  // File-specific settings
  overrides: [
    {
      files: '*.{js,jsx,ts,tsx}',
      options: {
        parser: 'typescript',
      },
    },
    {
      files: '*.{json,md}',
      options: {
        tabWidth: 2,
      },
    },
  ],
};

module.exports = config;
