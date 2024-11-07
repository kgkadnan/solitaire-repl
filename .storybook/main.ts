import path from 'path';

module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'], // Configure story loading patterns

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions'
    // {
    //   name: '@storybook/addon-styling',
    //   options: {},
    // },
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#333333' }
      ]
    }
  },
  webpackFinal: async config => {
    // Exclude SVGs from file-loader
    const fileLoaderRule = config.module.rules.find(rule =>
      rule.test?.test('.svg')
    );
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/;
    }

    // Handle SVGs with @svgr/webpack for components
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    // Optionally handle SVGs as static assets
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'static/media/public/v2/assets/icons/sidebar-icons',
            publicPath: 'static/media/public/v2/assets/icons/sidebar-icons'
          }
        }
      ],
      include: [
        path.resolve(__dirname, '../public/v2/assets/icons/sidebar-icons')
      ]
    });

    // Resolve aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src')
    };

    // Modify Webpack configuration further if needed

    return config;
  }

  // Custom managerWebpack configuration
  // managerWebpack: async (config) => {
  //   // Modify Webpack configuration for the Storybook UI
  //   return config;
  // },
};
