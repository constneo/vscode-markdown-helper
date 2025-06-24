import { exec } from "child_process"
import vscode from "./vscode.js"
import { Config, EXNTENSION_ID, message } from "./const.js"

/**
 * @typedef {import("../types/global")}
 */

/**
 * 执行命令
 * @param {string} command
 * @returns {Promise<string>}
 */
export function execCommand(command) {
  return new Promise((resolve, reject) => {
    exec(`${command}`, (error, stdout, stderr) => {
      if (error) reject(`${stderr || error.message}`)
      else resolve(stdout)
    })
  })
}

/**
 * 获取插件的配置
 * returns {Configuration}
 */
export function getConfig() {
  const config = vscode.workspace.getConfiguration(EXNTENSION_ID)

  for (const key in Config) {
    Config[key] = config.get(key)
  }

  return Config
}

/**
 * 获取插件的 package.json
 *
 * See {@link https://code.visualstudio.com/api/references/extension-manifest}
 * @example
 * context.extension.packageJSON
 * vscode.extensions.getExtension(id).packageJSON
 * @param {vscode.ExtensionContext} context
 * @returns {any}
 */
export function getExtensionJson(context) {
  return context.extension.packageJSON
}

/**
 * 根据id获取获取插件.
 *
 * 如果是在扩展管理的右键上下文中,命令的参数,就是插件的id.
 * @example
 * vscode.commands.registerCommand(Commands.hello,(id) => { id === "publisher.name"})
 * @param {string} id
 * @returns {vscode.Extension<any>}
 */
export function getExtension(id) {
  return vscode.extensions.getExtension(id)
}

/**
 * 获取当前环境
 *
 * The mode the extension is running in. See {@link ExtensionMode}
 * @param {vscode.ExtensionContext} context
 * @returns {vscode.ExtensionMode}
 */
export function getMode(context) {
  return context.extensionMode
}

/**
 * @param {vscode.Uri} uri
 * @returns {vscode.WorkspaceFolder}
 */
export function getRootDir(uri) {
  return vscode.workspace.getWorkspaceFolder(uri)
}

/**
 * 右下角的欢迎语
 * @return {void}
 */
export function welcome() {
  console.log(`Register ${EXNTENSION_ID} extension .`)

  vscode.window.showInformationMessage(message)
}

/**
 * 获取当前日期
 * @returns {string}
 */
export function getCurrentDate() {
  let date = new Date()
  // console.log(date.getFullYear()) //当前日期的年 2022
  // console.log(date.getMonth() + 1) //月份+1 由于月份是0-11计算 所以需要 +1
  // console.log(date.getDate()) // 日
  // console.log(date.getDay()) // 星期几  注意：星期日返回的是0
  // console.log(date.getHours()) // 时
  // console.log(date.getMinutes()) // 分
  // console.log(date.getSeconds()) // 秒

  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  const hh = date.getHours()
  const mm = date.getMinutes()
  const ss = date.getSeconds()

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}
