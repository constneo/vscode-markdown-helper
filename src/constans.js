// import  pkg from "../package.json" with  { type: "json" }

// 当前插件的唯一标识符,应该与 package.json中的 configuration.id相对应
export const PLUGIN_ID = "vscode-markdown-helper"
export const PLUGIN_NAME = "Markdown Helper"
export const ENV = {}
export const COMMANDS = {
  create: `${PLUGIN_ID}.create`,
  update: `${PLUGIN_ID}.update`,
  addDate: `${PLUGIN_ID}.addDate`
}

export const message = `Thank you for using ${PLUGIN_NAME}`

export const selector = [{ scheme: "file", language: "markdown", pattern: "**/*.md" }]
