import path from "node:path"
import vscode from "./vscode.js"
import { getRootDir } from "./utils.js"
import { COMMANDS } from "./constans.js"
import patch from "./patch.js"
import dayjs from "dayjs"

/**
 * 监听文件创建
 * @returns {vscode.FileSystemWatcher}
 */
export function onWatcher() {
  const watcher = vscode.workspace.createFileSystemWatcher("**/*.{md,json}")
  watcher.onDidCreate(patch)
  return watcher
}

/**
 * 根据模板创建 markdown file
 * @returns {vscode.Disposable}
 */
export function onCreater() {
  const disposable = vscode.commands.registerCommand(COMMANDS.create, async () => {
    try {
      const editor = vscode.window.activeTextEditor
      const fileName = await vscode.window.showInputBox({
        prompt: "Enter file name (with extension)"
      })
      if (!fileName) return

      const root = getRootDir(editor.document.uri)
      const filePath = path.join(root.uri.fsPath, fileName)
      const uri = vscode.Uri.file(filePath)

      await patch(uri)
    } catch (err) {
      vscode.window.showErrorMessage(`${err}`)
    }
  })

  return disposable
}

/**
 * 根据模板更新当前的 markdown file
 * @returns {vscode.Disposable}
 */
export function onUpdater() {
  const disposable = vscode.commands.registerCommand(COMMANDS.update, async uri => {
    try {
      const editor = vscode.window.activeTextEditor
      if (!editor) return
      await patch(editor.document.uri)
    } catch (err) {
      vscode.window.showErrorMessage(`${err}`)
    }
  })

  return disposable
}

/**
 * 更新 Front Matter date
 * @returns {vscode.Disposable}
 */
export function onUpdateDate() {
  const disposable = vscode.commands.registerCommand(COMMANDS.updatedate, async uri => {
    try {
      // const editor = vscode.window.activeTextEditor
      // const content = editor.document.getText()
      const { selection, edit, document } = vscode.window.activeTextEditor

      const sel = document.getText(selection)
      console.log("[ sel ]->", sel)
      const date = dayjs(sel).format()
      console.log("[ date ]->", date)

      edit(e => {
        // e.replace(location, value)
      })
    } catch (err) {
      vscode.window.showErrorMessage(`${err}`)
    }
  })

  return disposable
}
