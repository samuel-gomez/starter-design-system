/** @type {import('stylelint').Config} */
export default {
  plugins: ['stylelint-prettier'],
  extends: ['stylelint-config-standard', 'stylelint-config-recommended-scss', 'stylelint-config-pretty-order'],
  rules: {
    'import-notation': 'string',

    'prettier/prettier': true,
  },
  overrides: [
    {
      files: ['*.module.css', '*.module.scss'],
      rules: {
        'selector-pseudo-class-no-unknown': [
          true,
          {
            ignorePseudoClasses: ['global'],
          },
        ],
      },
    },
  ],
};
