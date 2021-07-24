#!/usr/bin/env node
const Commander = require("commander");
const Inquirer = require("inquirer");
const chalk = require("chalk");
const pkg = require("../package.json");
const { showExample, generateDoc } = require("./main");

const questions = [
  {
    type: "input",
    name: "words",
    message: "你想对我说什么",
    validate(text: string) { if (!text) { return "没爱了"; } return true; },
  },
];

Commander.version(pkg.version)
  .description( chalk.black.bgGreen.bold( [pkg.description, "-------------其实，你也很会写文档--------------"].join( "\r\n" ) ) )
  .name("doc-gen")
  .usage("[options] [command]");

Commander.command("sayHi")
  .description("随便向我说些什么")
  .action(() => {
    Inquirer.prompt(questions).then(({ words }) => {
      console.log("我的回答是：", words);
    });
  });

Commander.program
  .command("showExample")
  .description("先看看Demo")
  .action(() => {
    void showExample();
  });

Commander.program
  .command("generate <path> [outDir]") // <required> [optional]
  .description("将TSX接口转化为Markdown")
  .action((path, outDir, ...args) => {
    void generateDoc(path, outDir);
  });

Commander.program.addHelpText(
  "after",
  `
Examples:
  $ doc-gen showExample
  $ doc-gen generate src\\Sample\\index.tsx`
);

Commander.program
  .option("-c, --clean", "清净模式: 只输出结果")
  .option("-d, --data", "数据模式: 输出结果的同时也输出过程")
  .parse(process.argv);

const options = Commander.program.opts();

if ("clean" in options) {
  console.log("clean......");
}

if ("data" in options) {
  console.log("data......");
}
