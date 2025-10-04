import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/preset-create-react-app",
    "@storybook/addon-docs"
  ],
  "framework": {
    "name": "@storybook/react-webpack5",
    "options": {}
  },
  "staticDirs": [
    "..\\public"
  ],
  webpackFinal: async (config) => {
    // Отключаем ESLint
    config.plugins = config.plugins?.filter(
      (plugin) => plugin && plugin.constructor.name !== 'ESLintWebpackPlugin'
    );
    return config;
  }
};
export default config;