# Markdown Helper

## TODO

- Gen dir tree
- Custom keyword

## Front Matter

```md
---
title: {{title}}
tags: {{tags}}
date: {{date}}
---

# {{title}}

## Command

```

```

## Ref

- [Example](https://example.com)
- [Demo](https://demo.com)

```

## Options

```json
// .vscode/settings.json

{
  "vscode-markdown-helper.enable": true,
  "vscode-markdown-helper.showWelcome": false,
  "vscode-markdown-helper.templatePath": "./.templates/default.md",
  "vscode-markdown-helper.showUpdateMenu": true,
  "vscode-markdown-helper.showAddDateMenu": false,
  "vscode-markdown-helper.tags": ["vscode", "js"]
}
```

## addDate

The selected text is replaced with the current date.

## Build

```shell
npm install

npm install -g @vscode/vsce

vsce package --no-dependencies

vsce package --dependencies
```
