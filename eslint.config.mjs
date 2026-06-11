// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import next from "eslint-config-next";
import prettier from "eslint-config-prettier";

const eslintConfig = [...next, prettier, {
  rules: {
    "@next/next/no-img-element": "off",
  },
}, ...storybook.configs["flat/recommended"]];

export default eslintConfig;
