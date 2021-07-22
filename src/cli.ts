#!/usr/bin/env node

import Console from "console";
import Commander from "commander";
import Inquirer from "inquirer";
import chalk from "chalk";
import { showSample, generateDoc } from "./main";
// const pkg = require("./package");

Commander.program
  .version("1.0.0")
  .description(
    chalk.bgGreen.bold(
      "A command tools for transforming TSX interface to Markdown easily!"
    )
  )
  .name("doc-gen")
  .usage("[options] [command]");

Commander.program
  .option("-c, --clean", "Clean mode: Only yeild result.")
  .option("-d, --debug", "Debug mode: Yeild result and display procedure.");

Commander.program
  .command("example")
  .description("show example")
  .action(() => {
    void showSample();
  });

Commander.program
  .command("generate <path> [outDir]") // <required> [optional]
  .description("generate tsx interface to Markdown")
  .action((path, outDir, ...args) => {
    // Inquirer.prompt({
    //   type: "input",
    //   name: "path",
    //   message: "Input your path of TSX file",
    // }).then(({ path }) => {
    //   console.log("title", path);
    // });
    // const params = args.slice(0, 1).concat(...args.slice(2));
    console.log("params", path, outDir);
    void generateDoc(path, outDir);
  });

Commander.program.parse(process.argv);

if ("clean" in Commander.program) {
  console.log("clean");
  // Console.prototype.log = () => {};
}
