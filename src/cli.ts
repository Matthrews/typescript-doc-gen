#!/usr/bin/env node
const { program } = require("commander");
const { prompt } = require("inquirer");
const { showSample, generateDoc } = require("./main");
// const pkg = require("./package");

program
  .version("1.0.0")
  .description(
    "A command tools for transforming TSX interface to Markdown easily!"
  )
  .name("doc-gen")
  .usage("[options] [command]");

program.option("-only, --onlyData", "just output raw data");

program
  .command("example")
  .description("show example")
  .action(() => {
    void showSample();
  });

program
  .command("generate <path> [outDir]") // <required> [optional]
  .description("generate tsx interface to Markdown")
  .action((path, outDir, ...args) => {
    // prompt({
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

program.parse(process.argv);
