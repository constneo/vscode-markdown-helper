// 将 commonjs的 vscode 包装为 ESM
import { createRequire } from "node:module"

// 兼容 ESM
const require = createRequire(import.meta.url)

// 兼容vscode的codelen
const vscode = require("vscode")

export default vscode
