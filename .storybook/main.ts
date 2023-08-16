import path from "path";

module.exports = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"], // Configure story loading patterns

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-styling',
      options: {},
    },
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#333333" },
      ],
    },
  },

  // Add framework configuration if applicable
  // framework: '@storybook/react',

  // Typescript configuration
  // typescript: {
  //   check: false, // Disable TypeScript type checking
  // },

  // Custom webpack configuration
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "../src"),
    };

    // Modify Webpack configuration further if needed

    return config;
  },

  // Custom managerWebpack configuration
  // managerWebpack: async (config) => {
  //   // Modify Webpack configuration for the Storybook UI
  //   return config;
  // },
};
