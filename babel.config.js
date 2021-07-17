module.exports = function (api) {
  api.cache(true);
  const presets = [
    [
      "@babel/preset-env",
      {
        modules: false,
      },
    ],
    "@babel/preset-react",
    [
      "@babel/preset-typescript",
      {
        isTSX: true,
        allExtensions: true,
        allowDeclareFields: true,
      },
    ],
  ];
  const plugins = [
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    ["@babel/plugin-proposal-private-methods", { loose: true }],
    ["@babel/plugin-syntax-dynamic-import"],
    ["@babel/plugin-transform-runtime"],
    ["@babel/plugin-transform-modules-commonjs"],
  ];

  return {
    presets,
    plugins,
  };
};
