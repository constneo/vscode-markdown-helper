import { onCreater, onWatcher, onUpdater, onUpdateDate } from "./provider.js"
import { getConfig, welcome } from "./utils.js"
import vscode from "./vscode.js"

/**
 * @param {vscode.ExtensionContext} context
 */
export async function activate(context) {
  const { showWelcome, enable, showUpdateMenu, showUpdateDateMenu } = await getConfig()
  if (showWelcome) welcome()

  if (enable) {
    context.subscriptions.push(onCreater())
    context.subscriptions.push(onWatcher())
    context.subscriptions.push(onUpdater())
    context.subscriptions.push(onUpdateDate())
  }
}

export function deactivate() {}
