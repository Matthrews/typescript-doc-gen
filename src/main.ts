import { resolve, join } from "path";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";

import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import { BabelFileResult, transformSync } from "@babel/core";
import { format } from "prettier";
import chalk from "chalk";

import { presets, plugins, parserPlugins } from "../utils/constant";
import { generateMarkdown } from "../utils/helper";

const cwd = resolve("./out");

const showExample = () => {
  const path = resolve(__dirname, "../sample.tsx");
  generateDoc(path);
};

const generateDoc = (path: string, outDir: string = cwd) => {
  const esNextCode: string = readFileSync(path).toString();

  const babelTransformResult: BabelFileResult | null = transformSync(
    esNextCode,
    {
      configFile: false,
      presets,
      plugins,
      filename: resolve(__dirname, "../error/error.ts"),
    }
  );
  if (!babelTransformResult) {
    console.log("transform failed");
    return;
  }
  const { code: es5Code } = babelTransformResult!;

  console.log("babel transforms......");

  const ast = parse(esNextCode, {
    sourceType: "module",
    plugins: parserPlugins as any[],
  });

  console.log("babel parses......");
  console.log("Starting writing to out directory......");

  if (!existsSync(outDir)) mkdirSync(outDir);

  writeFileSync(join(outDir, "esNextCode.json"), esNextCode);
  writeFileSync(join(outDir, "es5Code.json"), es5Code ?? "");
  writeFileSync(join(outDir, "ast.json"), JSON.stringify(ast, null, 2));
  console.log("Traversing to collect interface......");

  const interfaceCollection: Array<any> = [];

  traverse(ast, {
    enter: (path) => {
      if (path.node.type === "TSInterfaceDeclaration") {
        const operator = "extends" in path.node ? "unshift" : "push"; // 含extends放前面
        interfaceCollection[operator](path.node);
      }
    },
  });

  writeFileSync(
    join(outDir, "interface.json"),
    JSON.stringify(interfaceCollection, null, 2)
  );
  const result = format(generateMarkdown(interfaceCollection), {
    parser: "markdown",
  }); // defalut format options

  writeFileSync(join(outDir, "API.md"), result);

  console.log("File saved in ", chalk.red(outDir));
};

export { showExample, generateDoc };
