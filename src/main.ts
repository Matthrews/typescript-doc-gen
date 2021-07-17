import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { transformSync } from "@babel/core";

const projectRoot = resolve(__dirname, "../source");

const path = resolve(projectRoot, "sample.tsx");

const esNextCode = readFileSync(path).toString();

console.log("transform......");

const { code: es5Code } = transformSync(esNextCode, {
  filename: resolve(__dirname, "../error/error.ts"),
});

console.log("parse......");

const ast = parse(esNextCode, {
  sourceType: "module",
  plugins: ["jsx", "typescript"],
});

console.log("Starting writing to out directory......");

writeFileSync("./out/esNextCode.json", esNextCode);
writeFileSync("./out/es5Code.json", es5Code);
writeFileSync("./out/ast.json", JSON.stringify(ast, null, 2));

console.log("Traversing to collect interface......");

const interfaceCollection = [];

traverse(ast, {
  enter: (path) => {
    if (path.node.type === "TSInterfaceDeclaration") {
      interfaceCollection.push(path.node);
    }
  },
});

writeFileSync(
  "./out/interface.json",
  JSON.stringify(interfaceCollection, null, 2)
);

const mdTitle = "## API";

const mdTemplate = [
  "| 属性名 | 描述 | 类型 | 默认值",
  "| ----------- | ----------- |---------- |---------- |",
];

const copyRight = [
  "----Welcome to pull requests!----",
  "Github: https://github.com/Matthrews/typescript-doc-gen",
];

const bodyContent = [];

interfaceCollection.forEach((interfaceItem) => {
  const {
    id: { name = "" },
    body: { body: properties = [] },
  } = interfaceItem;
  const contents = [`### ${name}\r\n`].concat(mdTemplate);

  properties.forEach((property) => {
    const {
      leadingComments = [],
      optional,
      key: { name = "" },
      typeAnnotation: {
        typeAnnotation: {
          typeName: { name: tName = "", left = {}, right = {} } = {},
        },
      },
    } = property;
    contents.push(
      `| ${name} | ${leadingComments[0]?.value
        .replace(/\r\n/g, "")
        .replace(/\*/g, "")} | <code>${
        tName ?? left.name + right.name
      }</code> | <code>${optional ? "是" : "--"}</code> |`
    );
  });

  contents.push("\r\n");

  bodyContent.push(contents.join("\r\n"));
});

const result = [mdTitle].concat(bodyContent).concat(copyRight).join("\r\n");

writeFileSync("./markdown/API.md", result);

console.log("Finished!");
