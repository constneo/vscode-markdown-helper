# Markdown Helper

## Front Matter

```txt
{{title}}
{{tags}}
{{date}}
```

## Options

```json
// .vscode/settings.json

{
  "vscode-markdown-helper.isNotify": false,
  "vscode-markdown-helper.templatePath": "./.templates/default.md",
  "vscode-markdown-helper.useTemplate": true
}
```

## Build

```shell
npm install

npm install -g @vscode/vsce

vsce package --no-dependencies

vsce package --dependencies
```
