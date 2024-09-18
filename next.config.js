/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find(rule =>
      rule.test?.test?.('.svg')
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: { not: /url/ } // exclude if *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: /url/, // *.svg?url
        use: ['@svgr/webpack']
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en'
  },
  images: {
    domains: [
      'medusa.kgkit.net',
      'medusa-staging.kgkit.net',
      'api.kgk.live',
      'storageweweb.blob.core.windows.net',
      'csg1003200332b85b56.blob.core.windows.net',
      '1.gravatar.com',
      'primary-production-a190.up.railway.app'
    ] // Add 'api.kgk.live' to the list of allowed domains
  }
};

module.exports = nextConfig;
