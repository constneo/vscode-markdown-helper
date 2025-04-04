import vscode from "./vscode.js"
import { PLUGIN_ID } from "./constans.js"
import { message } from "./constans.js"
// import add from "@constneo/add"

/**
 * 检查环境变量以及配置
 * @returns {Promise<{enable:boolean,showUpdateDateMenu:boolean,showWelcome:boolean, showUpdateMenu:boolean,templatePath:string,tags:Array<string>}>}
 */
export function getConfig() {
  return new Promise(resolve => {
    const config = vscode.workspace.getConfiguration(PLUGIN_ID)

    const showWelcome = config.get("showWelcome")
    const templatePath = config.get("templatePath")
    const tags = config.get("tags")
    const showUpdateMenu = config.get("showUpdateMenu")
    const enable = config.get("enable")
    const showUpdateDateMenu = config.get("showUpdateDateMenu")

    resolve({
      enable,
      showWelcome,
      templatePath,
      tags,
      showUpdateMenu,
      showUpdateDateMenu
    })
  })
}

/**
 * @param {vscode.Uri} uri
 * @returns {vscode.WorkspaceFolder}
 */
export function getRootDir(uri) {
  return vscode.workspace.getWorkspaceFolder(uri)
}

export async function welcome() {
  vscode.window.showInformationMessage(message)
}

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
