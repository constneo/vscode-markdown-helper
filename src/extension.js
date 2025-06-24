/*
 * @Author: constneo
 * @Date: 2025-04-10 02:23:50
 * @Description: master
 */

import { EXNTENSION_ID } from "./const.js"
import { onCreater, onWatcher, onUpdater, onAddDate } from "./provider.js"
import { getConfig, welcome } from "./utils.js"
import vscode from "./vscode.js"

const creater = onCreater()
const watcher = onWatcher()
const updater = onUpdater()
const addDate = onAddDate()

const list = [creater, watcher, updater, addDate]

/**
 * 初始化扩展
 * @param {vscode.ExtensionContext} context
 * @returns {void}
 */
function init(context) {
  const { welcome: show, enable } = getConfig()

  if (enable) {
    if (show) welcome()
    list.forEach(i => context.subscriptions.push(i))
  } else {
    list.forEach(i => i.dispose())
  }

  // when => 是否开启扩展
  vscode.commands.executeCommand("setContext", "constneo.enable", enable)
}

/**
 * 激活扩展
 * @param {vscode.ExtensionContext} context
 */
export function activate(context) {
  init(context)

  // 监听配置文件的修改,使条件立即生效
  const disposable = vscode.workspace.onDidChangeConfiguration(async e => {
    if (e.affectsConfiguration(EXNTENSION_ID)) init(context)
  })

  context.subscriptions.push(disposable)

  return () => {
    list.forEach(i => i.dispose())
  }
}

/**
 * 释放资源
 * @returns {void}
 */
export function deactivate() {
  list.forEach(i => i.dispose())
}
