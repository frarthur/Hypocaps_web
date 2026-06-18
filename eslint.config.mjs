// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import next from "eslint-config-next";
import prettier from "eslint-config-prettier";

const eslintConfig = [
  { ignores: ["coverage/", ".next/", ".scannerwork/"] },
  ...next,
  prettier,
  {
    rules: {
      "@next/next/no-img-element": "off",
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
      "no-duplicate-imports": "error",
      "prefer-const": "error",
      "no-else-return": "warn",
    },
  },
  ...storybook.configs["flat/recommended"],
];

export default eslintConfig;
