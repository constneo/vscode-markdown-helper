import path from "node:path"
import vscode from "./vscode.js"
import { getConfig, getRootDir, welcome } from "./utils.js"
import { Commands } from "./const.js"
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
  const disposable = vscode.commands.registerCommand(Commands.create, async () => {
    try {
      const editor = vscode.window.activeTextEditor
      if (!editor) return

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
  const disposable = vscode.commands.registerCommand(Commands.update, async uri => {
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
export function onAddDate() {
  const disposable = vscode.commands.registerCommand(Commands.addDate, async uri => {
    try {
      const editor = vscode.window.activeTextEditor
      if (!editor) return

      // const content = editor.document.getText()
      // const { selection, edit, document } = vscode.window.activeTextEditor

      // const sel = document.getText(selection)
      // console.log("[ sel ]->", sel)
      const date = dayjs().format("YYYY-MM-DD HH:mm::ss")
      console.log("[ date ]->", date)

      editor.edit(e => {
        // e.replace(location, value)
        // e.insert(editor.selection.active, date)
        e.replace(editor.selection, date)
      })
    } catch (err) {
      vscode.window.showErrorMessage(`${err}`)
    }
  })

  return disposable
}
