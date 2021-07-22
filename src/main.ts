import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { BabelFileResult, transformSync } from "@babel/core";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import chalk from "chalk";
import prettier from "prettier";
import { presets, plugins, parserPlugins } from "../utils/constant";
import { generateMarkdown } from "../utils/helper";

const showSample = () => {
  const projectRoot = resolve(__dirname, "../source");

  const path = resolve(projectRoot, "sample.jsx");

  const esNextCode: string = readFileSync(path).toString();

  console.log("babel transforms......");

  const babelParseResult: BabelFileResult | null = transformSync(esNextCode, {
    filename: resolve(__dirname, "../error/error"),
  });

  if (!babelParseResult) {
    console.log("transform failed");
    return;
  }

  const { code: es5Code } = babelParseResult!;

  console.log("babel parses......");

  const ast = parse(esNextCode, {
    sourceType: "module",
    plugins: parserPlugins as any,
  });

  console.log("Starting writing to out directory......");

  writeFileSync("./out/esNextCode.json", esNextCode);
  writeFileSync("./out/es5Code.json", es5Code ?? "");
  writeFileSync("./out/ast.json", JSON.stringify(ast, null, 2));

  console.log("Traversing to collect interface......");

  const interfaceCollection: any[] = [];

  traverse(ast, {
    enter: (path) => {
      if (path.node.type === "TSInterfaceDeclaration") {
        const operator = "extends" in path.node ? "unshift" : "push"; // 含extends放前面
        interfaceCollection[operator](path.node);
      }
    },
  });

  writeFileSync(
    "./out/interface.json",
    JSON.stringify(interfaceCollection, null, 2)
  );

  const result = generateMarkdown(interfaceCollection);

  writeFileSync("./markdown/API.md", result);

  console.log("Finished!");
};

/**
 * 生成文档，暂时仅支持转为Markdown
 * @param path 文件路径
 * @param outDir 输出文件位置
 * @returns
 */
const generateDoc = (path: string, outDir: string = "./out") => {
  console.log("generateDoc", path, outDir);
  const esNextCode: string = readFileSync(path).toString();

  console.log("transform......");

  const babelParseResult: BabelFileResult | null = transformSync(esNextCode, {
    filename: resolve(__dirname, "../error/error.ts"),
    configFile: false,
    presets,
    plugins,
  });

  if (!babelParseResult) {
    console.log("transform failed");
    return;
  }

  const { code: es5Code } = babelParseResult!;

  console.log("parse......");

  const ast = parse(esNextCode, {
    sourceType: "module",
    plugins: parserPlugins as any,
  });

  console.log("Starting writing to out directory......");

  if (!existsSync(outDir)) {
    mkdirSync(outDir);
  }

  writeFileSync(`${outDir}\\esNextCode.json`, esNextCode);
  writeFileSync(`${outDir}\\es5Code.json`, es5Code ?? "");
  writeFileSync(`${outDir}\\ast.json`, JSON.stringify(ast, null, 2));

  console.log("Traversing to collect interface......");

  const interfaceCollection: any[] = [];

  traverse(ast, {
    enter: (path) => {
      if (path.node.type === "TSInterfaceDeclaration") {
        const operator = "extends" in path.node ? "unshift" : "push"; // 含extends放前面
        interfaceCollection[operator](path.node);
      }
    },
  });

  writeFileSync(
    `${outDir}\\interface.json`,
    JSON.stringify(interfaceCollection, null, 2)
  );

  const result = prettier.format(generateMarkdown(interfaceCollection), {
    parser: "md",
  });

  writeFileSync(`${resolve(outDir)}/API.md`, result);

  console.log(chalk.green("Info: "), `${resolve(outDir)}`);
};

export { showSample, generateDoc };
