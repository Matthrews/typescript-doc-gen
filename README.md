# typescript-doc-gen

一个快速将 TSX interface 转成 Markdown 的命令行工具

## 如何开始

```bash
npm install -g typescript-doc-gen
doc-gen
# 将`src\\Sample\\index.tsx`文件的interface提取出Markdown，默认保存到当前目录out下，注意在`.gitignore`文件里面添加out目录
doc-gen generate src\\Sample\\index.tsx

# or 将`src\\Sample\\index.tsx`文件的interface提取出Markdown 并保存到桌面
doc-gen generate src\\Sample\\index.tsx D:\\Users\\admin\\Desktop
```

## 功能

- 识别 interface
- 识别 extends，将其内容转化为子表格
- 识别自定义类型，将其转化为子表并内链

## TODO

- 识别框架属性

- 自动依赖分析

- 批量识别

- 支持 Markdown、HTML、PDF 等多种格式，可配置

- 插件化

## 来喷源码

```bash
git clone git@gitlab.zmaxis.com:rongfu.zhu/typescript-doc-gen.git
cd typescript-doc-gen
yarn
yarn gen
```

## 同类产品

[api-hose](https://github.com/HerbertHe/api-hose)

[react-docgen-typescript](https://www.npmjs.com/package/react-docgen-typescript)

[Documentation](http://documentation.js.org/)
