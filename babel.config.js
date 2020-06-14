const presets = [
  [
    '@babel/env',
    {
      targets: {
        browsers: '> 0.25%, not dead',
      },
      useBuiltIns: 'usage',
      corejs: 3,
    },
  ],
];

const plugins = [
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-transform-arrow-functions',
  '@babel/plugin-proposal-optional-chaining',
];

module.exports = { presets, plugins };
