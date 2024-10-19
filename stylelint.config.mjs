/** @type {import('stylelint').Config} */
const config = {
  extends: ['stylelint-config-standard', 'stylelint-config-clean-order'],
  rules: {
    'selector-class-pattern': '^[a-z][a-zA-Z0-9]+$',
  },
};

export default config;
