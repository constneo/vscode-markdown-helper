# Markdown Helper

## Front Matter

```txt
{{title}}
{{date}}
```

## Options

```json
// .vscode/settings.json

{
  "vscode-markdown-helper.enable": true,
  "vscode-markdown-helper.showWelcome": true,
  "vscode-markdown-helper.templatePath": "./.templates/default.md",
  "vscode-markdown-helper.showUpdateMenu": true,
  "vscode-markdown-helper.showAddDateMenu": true
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
