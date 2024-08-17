import type { Config } from 'stylelint';

const config: Config = {
  extends: ['stylelint-config-standard', 'stylelint-config-clean-order'],
  rules: {
    'selector-class-pattern': '^[a-z][a-zA-Z0-9]+$',
  },
};

export default config;
