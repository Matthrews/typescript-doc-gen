export const presets = [
  [
    "@babel/preset-env",
    {
      modules: false,
      useBuiltIns: "usage",
      corejs: "3",
    },
  ],
  "@babel/preset-react",
  [
    "@babel/preset-typescript",
    {
      isTSX: true, // 此处不配置不识别TSX
      allExtensions: true,
      allowDeclareFields: true,
    },
  ],
];
export const plugins = [
  [
    "@babel/plugin-proposal-decorators",
    { legacy: true, decoratorsBeforeExport: true },
  ],
  ["@babel/plugin-proposal-class-properties", { loose: true }],
  ["@babel/plugin-proposal-private-methods", { loose: true }],
  ["@babel/plugin-syntax-dynamic-import"],
  ["@babel/plugin-transform-runtime"],
  ["@babel/plugin-transform-modules-commonjs"],
];

export const parserPlugins = [
  "jsx",
  "typescript",
  "asyncGenerators",
  "bigInt",
  "classProperties",
  "classPrivateProperties",
  "classPrivateMethods",
  ["decorators", { decoratorsBeforeExport: false }],
  "doExpressions",
  "dynamicImport",
  "exportDefaultFrom",
  "exportNamespaceFrom",
  "functionBind",
  "functionSent",
  "importMeta",
  "logicalAssignment",
  "nullishCoalescingOperator",
  "numericSeparator",
  "objectRestSpread",
  "optionalCatchBinding",
  "optionalChaining",
  ["pipelineOperator", { proposal: "minimal" }],
  "throwExpressions",
  "topLevelAwait",
  "estree",
];

export const U_LINE_BREAK = "\r\n";

export const MD_LINE_BREAK = "<br />";
