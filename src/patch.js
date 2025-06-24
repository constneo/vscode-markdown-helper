import path from "node:path"
import fs from "node:fs"
import vscode from "./vscode.js"
import { getConfig, getRootDir } from "./utils.js"
import dayjs from "dayjs"
/**
 * @param {vscode.Uri} uri
 * @returns {Promise<void>}
 */
export default async function patch(uri) {
  console.log("[ 正在创建的文件 ]->", uri)
  console.log("[ __dirname  ]->", import.meta.dirname)
  console.log("[ __filename  ]->", import.meta.filename)

  try {
    const { templates, tags } = getConfig()

    // 获取文件扩展
    // const ext = path.extname(uri.path)
    // console.log("[ ext ]->", ext)

    // 不是 md 文件
    // if (ext !== ".md") return

    const editor = vscode.window.activeTextEditor

    if (!editor) return

    const root = getRootDir(uri)
    const tpl = path.join(root.uri.fsPath, templates)
    const hasTpl = fs.existsSync(tpl)

    // 不存在模板文件
    if (!hasTpl) {
      vscode.window.showWarningMessage("Not found template.")
      return
    }

    // const ext = path.extname(uri.path)
    const filename = path.basename(uri.path, ".md")
    // console.log("[ filename ]->", filename)
    // const date = new Date().toLocaleString().replaceAll("/", "-")
    const date = dayjs().format("YYYY-MM-DD HH:mm:ss")
    const tag = JSON.stringify(tags)
    let content = fs.readFileSync(tpl, "utf8")

    // console.log("[ content ]->", content)
    // const fileName = editor.document.fileName
    // console.log("[ document ]->", editor.document)
    // console.log("[ filename ]->", fileName)

    content = content
      .replaceAll("{{title}}", filename)
      .replaceAll("{{tags}}", tag)
      .replaceAll("{{date}}", date)

    const text = editor.document.getText()

    if (text == "") {
      await vscode.workspace.fs.writeFile(uri, Buffer.from(content))
      await vscode.window.showTextDocument(uri)
    }
  } catch (err) {
    vscode.window.showErrorMessage(`${err}`)
  }
}
